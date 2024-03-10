// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import {UsersController} from './users/users.controller'
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'SEU USER NAME', 
      password: 'SUA SENHA', 
      database: 'SEU DATA BASE', 
      entities: [User, Task],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User, Task]),
    AuthModule,
  ],
  controllers: [AuthController, TasksController, UsersController],
  providers: [UsersService, TasksService, AuthService],
})
export class AppModule {}

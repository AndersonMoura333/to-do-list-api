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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'postgres', 
      password: 'root', 
      database: 'teste2024', 
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

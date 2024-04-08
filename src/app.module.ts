// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/entities/task.entity';
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
      host: process.env.DATABASE_HOST,
      port: 5432, 
      username: process.env.DATABASE_USER, 
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE_DATABASE, 
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

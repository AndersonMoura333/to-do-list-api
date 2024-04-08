// tasks.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  createTask(@Body() taskData: Task): Promise<Task> {
    return this.tasksService.addTaskToUser(taskData);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() taskData: Task): Promise<Task> {
    return this.tasksService.update(id, taskData);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }
}

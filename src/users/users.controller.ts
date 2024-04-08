
// tasks.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//   @Get()
//   getAllTasks(): Promise<Task[]> {
//     return this.tasksService.findAll();
//   }

//   @Get(':id')
//   getTaskById(@Param('id') id: string): Promise<Task> {
//     return this.tasksService.findOne(id);
//   }

//   @Post()
//   createTask(@Body() taskData: Task): Promise<Task> {
//     return this.tasksService.create(taskData);
//   }

//   @Put(':id')
//   updateTask(@Param('id') id: string, @Body() taskData: Task): Promise<Task> {
//     return this.tasksService.update(id, taskData);
//   }

//   @Delete(':id')
//   deleteTask(@Param('id') id: string): Promise<void> {
//     return this.tasksService.delete(id);
//   }
// }

// @Public()
  @Get("/:id")
  async getUserById(@Param("id") id: string){
    return this.usersService.getAllTasksByUserId(id)
  }
}
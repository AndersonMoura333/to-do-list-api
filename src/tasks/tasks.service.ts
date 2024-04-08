import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) // Injete o repositório de usuários
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async addTaskToUser(taskData: Partial<Task>): Promise<Task> {
    const user = await this.userRepository.findOne({where: {id: taskData.userId},
      relations: ['tasks']
    
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${taskData.userId} not found.`);
    }
  
    const newTask = this.taskRepository.create({ ...taskData, user });
    const savedTask = await this.taskRepository.save(newTask);
  
    user.tasks.push(savedTask); // Adiciona a nova tarefa ao array de tarefas do usuário
    await this.userRepository.save(user); // Salva o usuário com a nova tarefa adicionada
  
    return savedTask;
  }
  async update(id: string, taskData: Task): Promise<Task> {
    await this.taskRepository.update(id, taskData);
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from 'typeorm';
import { User } from "./entities/user.entity";
import { Task } from "../tasks/entities/task.entity";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
) { }
  async findOneBy(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where: {username: username}});
  }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date()
    });
  }
  async getAllTasksByUserId(id: string): Promise<Task[]> {
    const user = await this.userRepository.findOne({where: {id: id},
      relations: ['tasks']
    
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user.tasks;
  }
}
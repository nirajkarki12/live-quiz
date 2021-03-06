import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// DTO
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateSocketUserDto } from '../../users/dto/create-socket-user.dto';
// Entities
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  async findOneByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  async findOneByUserId(userId: number): Promise<User> {
    return await this.userRepository.findOne({ userId: userId });
  }

  async create(createUserDto: CreateUserDto) {
    let user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async createWsUser(createUserDto: CreateSocketUserDto) {
    let createdUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(createdUser);
  }
}
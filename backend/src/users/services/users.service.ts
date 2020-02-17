import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../users/interfaces/user.interface';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateSocketUserDto } from '../../users/dto/create-socket-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {

    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async createWsUser(createUserDto: CreateSocketUserDto) {

    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email): Model<User> {

    return await this.userModel.findOne({email: email});

  }

}
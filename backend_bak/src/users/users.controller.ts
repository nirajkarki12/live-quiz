import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './services/users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }
}

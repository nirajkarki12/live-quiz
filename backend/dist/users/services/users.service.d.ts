import { Repository } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateSocketUserDto } from '../../users/dto/create-socket-user.dto';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: number): Promise<User>;
    findOneByEmail(userEmail: string): Promise<User>;
    findOneByUserId(userId: number): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    createWsUser(createUserDto: CreateSocketUserDto): Promise<User>;
}

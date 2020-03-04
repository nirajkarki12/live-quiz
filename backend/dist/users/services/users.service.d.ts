import { Model } from 'mongoose';
import { User } from '../../users/interfaces/user.interface';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateSocketUserDto } from '../../users/dto/create-socket-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    createWsUser(createUserDto: CreateSocketUserDto): Promise<any>;
    findOneByEmail(email: any): Model<User>;
}

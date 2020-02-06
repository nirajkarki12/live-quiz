import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findOneByEmail(email: any): Model<User>;
}

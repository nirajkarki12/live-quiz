import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './services/users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
}

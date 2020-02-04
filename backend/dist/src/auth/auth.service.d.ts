import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginUserDto): Promise<{}>;
    validateUserByJwt(payload: JwtPayload): Promise<{
        expiresIn: number;
        token: string;
        data: JwtPayload;
    }>;
    createJwtPayload(user: any): {
        expiresIn: number;
        token: string;
        data: JwtPayload;
    };
}

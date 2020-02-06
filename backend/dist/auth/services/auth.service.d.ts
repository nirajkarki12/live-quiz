import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/services/users.service';
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

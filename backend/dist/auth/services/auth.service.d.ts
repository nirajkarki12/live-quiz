import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { LoginUserDto } from '../../users/dto/login-user.dto';
import { UsersService } from '../../users/services/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginUserDto): Promise<unknown>;
    validateUserByJwt(payload: JwtPayload): Promise<{
        expiresIn: string;
        token: string;
        data: JwtPayload;
    }>;
    createJwtPayload(user: any): {
        expiresIn: string;
        token: string;
        data: JwtPayload;
    };
}

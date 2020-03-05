import { AuthService } from './services/auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
export declare class AuthController {
    private authService;
    payload: any;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto, res: any): Promise<void>;
    getUser(req: any): any;
}

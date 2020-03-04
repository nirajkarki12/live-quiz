import { AuthService } from '../../auth/services/auth.service';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        expiresIn: string;
        token: string;
        data: JwtPayload;
    }>;
}
export {};

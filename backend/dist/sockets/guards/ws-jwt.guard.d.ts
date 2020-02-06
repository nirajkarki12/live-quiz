import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class WsJwtGuard implements CanActivate {
    private readonly authService;
    constructor(authService: any);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

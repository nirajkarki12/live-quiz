import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class WsJwtGuard implements CanActivate {
    private readonly usersService;
    constructor(usersService: any);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

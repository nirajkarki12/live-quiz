import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(@Inject('UsersService') private readonly usersService) {}

  async canActivate(
    context: ExecutionContext,
  ) : Promise<boolean>
  {
      const client = context.switchToWs().getClient();
      const token = client.handshake.query.token;
      const jwtPayload: JwtPayload = <JwtPayload> jwt.decode(token);
      console.log('client', jwtPayload);
      
      if(!jwtPayload) return false;
      
      if(jwtPayload.isAdmin) return true;

      if (!await this.usersService.findOneByEmail(jwtPayload.email)) {
        return await this.usersService.createWsUser(jwtPayload);
      }

      return true;
  }
}

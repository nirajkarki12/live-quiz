import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(@Inject('AuthService') private readonly authService) {}

  async canActivate(
    context: ExecutionContext,
  ) : Promise<boolean> {
      const client = context.switchToWs().getClient();
      const token = client.handshake.query.token;
      const jwtPayload: any = <any> jwt.verify(token, `{process.env.JWT_SECRET}`);
      console.log('client', jwtPayload);
      
      if(!jwtPayload) return false;

      // const user = await this.authService.validateUserByJwt(jwtPayload);
      // if(!user) return false;
      
      return true;
  }
}

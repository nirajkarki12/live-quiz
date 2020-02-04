import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

   constructor(private authService: AuthService) {

      super({
         jwtFromRequest: ExtractJwt.fromHeader('x-authorization'),
         secretOrKey: `{process.env.JWT_SECRET}`,
      });

   }

   async validate(payload: JwtPayload) {

      const user = await this.authService.validateUserByJwt(payload);

      if (!user) {
         throw new UnauthorizedException();
      }

      return user;

   }

}
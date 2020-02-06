import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
   constructor(private usersService: UsersService, private jwtService: JwtService) {}

   async validateUserByPassword(loginAttempt: LoginUserDto) {
      // This will be used for the initial login
      if (!loginAttempt.email || !loginAttempt.password) throw new UnauthorizedException('Username/Password is Required');

      const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);

      if (!userToAttempt) throw new UnauthorizedException('Username/Password Mismatched');

      return new Promise((resolve, reject) => {
         // Check the supplied password against the hash stored for this email address
         userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
            if (err || !isMatch) reject(new UnauthorizedException('Username/Password Mismatched'));
            // If there is a successful match, generate a JWT for the user
            resolve(this.createJwtPayload(userToAttempt));
         });

      });
   }

   async validateUserByJwt(payload: JwtPayload) {
      // This will be used when the user has already logged in and has a JWT
      const user = await this.usersService.findOneByEmail(payload.email);

      if (user) {
         return this.createJwtPayload(user);
      } else {
         throw new UnauthorizedException('Token Not Found');
      }
   }

   createJwtPayload(user) {
      const jwtData: JwtPayload = {
         id: user.id,
         name: user.name,
         email: user.email,
         image: user.image,
         isAdmin: user.isAdmin,
         userId: user.userId,
      };

      return {
         expiresIn: 3600,
         token: this.jwtService.sign(jwtData),
         data: jwtData,
      };

   }

}

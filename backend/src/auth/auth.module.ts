import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';
// Services
import { AuthService } from './services/auth.service';
// Modules
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: `{process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '365d',
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}

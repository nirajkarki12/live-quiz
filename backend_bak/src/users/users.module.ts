import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

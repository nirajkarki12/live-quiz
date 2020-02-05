import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://' + (process.env.DB_HOST || '127.0.0.1') + ':' + (process.env.DB_PORT || '27017') + '/' + (process.env.DB || 'live_quiz'), 
      { useFindAndModify: false }
    ),
    AuthModule, 
    UsersModule,
    SocketsModule,
  ],
})
export class AppModule {}

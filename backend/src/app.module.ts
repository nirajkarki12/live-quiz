import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketsModule } from './sockets/sockets.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizModule } from './quiz/quiz.module';

import { AnyExceptionFilter } from './common/exception-filter/any-exception.filter';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://' + (process.env.DB_HOST || '127.0.0.1') + ':27017' + '/' + (process.env.DB || 'live_quiz'), 
      { useFindAndModify: false, setFeatureCompatibilityVersion: "3.4" }
    ),
    TypeOrmModule.forRoot(),
    AuthModule, 
    UsersModule,
    SocketsModule,
    QuestionsModule,
    QuizModule
  ],
  // providers: [AnyExceptionFilter]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

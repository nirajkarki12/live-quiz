import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
require('dotenv').config({ path: '.env' });
// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketsModule } from './sockets/sockets.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://' + (process.env.DB_HOST || '127.0.0.1') + ':27017' + '/' + (process.env.DB || 'live_quiz'), 
      { useFindAndModify: false }
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule, 
    UsersModule,
    SocketsModule,
    QuestionsModule,
    QuizModule
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

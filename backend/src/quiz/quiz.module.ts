import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { QuizSchema } from './schemas/quiz.schema';
import { QuizService } from './services/quiz.service';
import { QuizController } from './controller/quiz.controller';
import { QuestionsModule } from '../questions/questions.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
@Module({
   imports : [
      MongooseModule.forFeature([{name: 'Quiz', schema: QuizSchema}]),
      PassportModule.register({defaultStrategy: 'jwt', session: false}),
      QuestionsModule,
      TypeOrmModule.forFeature([Quiz])
   ],
   providers: [QuizService],
   exports: [TypeOrmModule, QuizService],
   controllers: [QuizController]

})

export class QuizModule { }
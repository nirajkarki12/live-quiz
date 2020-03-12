import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// Controllers
import { QuizController } from './controller/quiz.controller';
// Modules
import { QuestionsModule } from '../questions/questions.module';
// Services
import { QuizService } from './services/quiz.service';
import { UsersModule } from '../users/users.module';
// Entities
import { Quiz } from './entities/quiz.entity';

@Module({
   imports : [
      PassportModule.register({defaultStrategy: 'jwt', session: false}),
      QuestionsModule,
      UsersModule,
      TypeOrmModule.forFeature([Quiz])
   ],
   providers: [QuizService],
   exports: [TypeOrmModule, QuizService],
   controllers: [QuizController]

})

export class QuizModule { }
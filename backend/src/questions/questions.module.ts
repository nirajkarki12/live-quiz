import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// Controllers
import { QuestionController } from './controller/question/question.controller';
import { QuestionsetController } from './controller/questionset/questionset.controller';
// Entities
import { QuestionSet } from './entities/question-set.entity';
import { Question } from './entities/question.entity';
// Services
import { QuestionsetService } from './services/questionset/questionset.service';
import { QuestionService } from './services/question/question.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TypeOrmModule.forFeature([QuestionSet, Question])
  ],
  providers: [QuestionService, QuestionsetService],
  exports: [TypeOrmModule, QuestionsetService,QuestionService],
  controllers: [QuestionController, QuestionsetController]
})
export class QuestionsModule {}

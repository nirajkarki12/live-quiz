import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './services/question/question.service';
import { QuestionsetService } from './services/questionset/questionset.service';
import { QuestionController } from './controller/question/question.controller';
import { QuestionsetController } from './controller/questionset/questionset.controller';
import { QuestionSetSchema } from './schemas/questionset.schema';
import { QuestionSchema } from './schemas/question.schema';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'QuestionSet', schema: QuestionSetSchema},{name: 'Question', schema: QuestionSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  providers: [QuestionService, QuestionsetService],
  exports: [QuestionsetService,QuestionService],
  controllers: [QuestionController, QuestionsetController]
})
export class QuestionsModule {}

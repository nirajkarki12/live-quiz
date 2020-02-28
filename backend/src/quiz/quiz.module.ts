import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { QuizSchema } from './schemas/quiz.schema';
import { QuizService } from './services/quiz.service';
import { QuizController } from './controller/quiz.controller';
import { QuestionsModule } from '../questions/questions.module';


@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Quiz', schema: QuizSchema}]),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        QuestionsModule
    ],
    exports: [QuizService],
    providers: [QuizService],
    controllers: [QuizController]

})

export class QuizModule { }
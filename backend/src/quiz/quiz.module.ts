import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { QuizSchema } from './schemas/quiz.schema';


@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Quiz', schema: QuizSchema}]),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
    ],
    exports: [],
    providers: [],
    controllers: []

})

export class QuizModule { }
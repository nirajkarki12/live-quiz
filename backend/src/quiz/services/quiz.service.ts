import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from '../../quiz/interfaces/quiz.interface';
import { CreateQuizDto } from '../../quiz/dto/quiz.dto';
import { QuestionsModule } from 'src/questions/questions.module';

@Injectable()
export class QuizService {

    constructor(@InjectModel('Quiz') private quizModel: Model<Quiz>) {}

    async create(createQuizDto: CreateQuizDto) {
        let createdQuiz = new this.quizModel(createQuizDto);
        return await createdQuiz.save();
    }

    async count(question)
    {
        
        const option1 = await this.quizModel.count({ question: question.id, answer: question.option1});
        const option2 = await this.quizModel.count({ question: question.id, answer: question.option2});
        const option3 = await this.quizModel.count({ question: question.id, answer: question.option3});
        const option4 = await this.quizModel.count({ question: question.id, answer: question.option4});
        const answer = question.answer
        return {option1,option2,option3,option4,answer};
       
    }

}

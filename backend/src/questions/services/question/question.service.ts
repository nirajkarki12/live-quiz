import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from 'src/questions/interfaces/question.interface';
import { CreateQuestionDto } from 'src/questions/dto/question/create-question.dto';

@Injectable()
export class QuestionService {

    constructor(@InjectModel('Question') private questionModel: Model<Question>) {}

    async create(createQuestionDto: CreateQuestionDto) {
        let createdQuestion = new this.questionModel(createQuestionDto);
        return await createdQuestion.save();
    }

    async fetchQuestions(): Model<Question> {
        return await this.questionModel.find();
    }
}

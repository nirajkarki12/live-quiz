import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from '../../../questions/interfaces/question.interface';
import { CreateQuestionDto } from '../../../questions/dto/question/create-question.dto';

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

    async delete(id) {
        return await this.questionModel.remove({_id: id});
    }

    async findOneById(id) {
        return await this.questionModel.findOne({_id: id});
    }

    async findAndUpdate(id, data: CreateQuestionDto) {
        return await this.questionModel.findOneAndUpdate(id,data,{new: true});
    }

    async getQuestionSet(id) {
        return await this.questionModel.find({questionSetId:id}).sort({level: 1});
    }

    async getQuestionForClient(id) {
        return await this.questionModel.find({questionSetId:id}).sort({level: 1}).select("_id name option1 option2 option3 option4 level questionSetId");
    }
}

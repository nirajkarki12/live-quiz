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

    async delete(id) {
        return await this.questionModel.remove({_id: id});
    }

    async findOneById(id) {
        return await this.questionModel.findOne({_id: id});
    }

    async findAndUpdate(id, data: CreateQuestionDto) {
        return await this.questionModel.finOneAndUpdate(id,data,{new: true});
    }

    async getQuestionSet() {
        return await this.questionModel.aggregate([
            {
                $lookup:{
                    from:'questionsets',
                    localField:'id',
                    foreignField:'questionSetId',
                    as:'questionset'
                }
            }
        ]);
    }
}

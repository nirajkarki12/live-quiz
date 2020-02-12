import { Model} from 'mongoose';
import { Mongoose } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionSet } from 'src/questions/interfaces/questionset.interface';
import { CreateQuestionSetDto } from 'src/questions/dto/questionset/create-questionset.dto';

@Injectable()
export class QuestionsetService {

    constructor(@InjectModel('QuestionSet') private questionSetModel: Model<QuestionSet>) {}


    async create(createQuestionSetDto: CreateQuestionSetDto) {

        let createdQuestionSet = new this.questionSetModel(createQuestionSetDto);
        return await createdQuestionSet.save();
      }
    
      async fetchQuestionSets():Model<QuestionSet> {
          return await this.questionSetModel.find();
      }

      async delete(id) {
        return await this.questionSetModel.remove({_id:id});
      }

      async findOneById(id) {
        let mon = new Mongoose();
        return await this.questionSetModel.find(mon.Types.ObjectId(id));
      }

      async update()
      {

      }
}
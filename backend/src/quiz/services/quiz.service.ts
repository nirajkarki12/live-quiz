import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from '../../quiz/interfaces/quiz.interface';
import { CreateQuizDto } from '../../quiz/dto/quiz.dto';
import { Question } from '../../questions/interfaces/question.interface';

@Injectable()
export class QuizService {

   constructor(
      @InjectModel('Quiz') private quizModel: Model<Quiz>,
      @InjectModel('Question') private questionModel: Model<Question>,
   ) {}

   async create(createQuizDto: CreateQuizDto) {
      let createdQuiz = new this.quizModel(createQuizDto);
      return await createdQuiz.save();
   }

   async getQuizResults(question) {
      let dbQuestion = await this.questionModel.findOne({_id: question._id});
      let res = await this.quizModel.find({question: question._id});
     
      let results = {
         option1: 0,
         option2: 0,
         option3: 0,
         option4: 0,
         answer: dbQuestion.answer
      };

      res.forEach((x) => {
         if(x.answer === dbQuestion.option1) {
            results.option1++;
         }else if (x.answer === dbQuestion.option2) {
            results.option2++;
         }else if (x.answer === dbQuestion.option3) {
            results.option3++;
         }else if (x.answer === dbQuestion.option4) {
            results.option4++;
         }
      });
      question.results = results;

      return question;
   }

   async getFinalResults(set) {
      
      return set;
   }

}

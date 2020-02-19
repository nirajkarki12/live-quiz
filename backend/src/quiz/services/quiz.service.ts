import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from '../../quiz/interfaces/quiz.interface';
import { CreateQuizDto } from '../../quiz/dto/quiz.dto';
import { QuestionsModule } from '../../questions/questions.module';
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

   async count(question) {
      
      let res = await this.quizModel.aggregate([
         {
           $lookup:{
             from:'questions',
             localField:'id',
             foreignField:'question',
             as:'questions'
           }
         },
       ]).exec((err, data) => {
          if(err) console.log(err);
          console.log('data', data);
       });

      let results = {
         option1: 0,
         option2: 0,
         option3: 0,
         option4: 0,
         answer: null
      };

      res.forEach((x) => {
         if(x.answer === "1") {
            results.option1++;
         }else if (x.answer === "2") {
            results.option2++;
         }else if (x.answer === "3") {
            results.option3++;
         }else if (x.answer === "4") {
            results.option4++;
         }
      });
      question.results = results;

      return question;
   }

}

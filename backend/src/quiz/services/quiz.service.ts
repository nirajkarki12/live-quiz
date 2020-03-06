import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from '../../quiz/dto/quiz.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Quiz } from '../entities/quiz.entity';
import { Question } from '../../questions/entities/question.entity';

@Injectable()
export class QuizService {

   constructor(
      @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
      @InjectRepository(Question) private questionRepository: Repository<Question>,
   ) {}

   async create(createQuizDto: CreateQuizDto) {
      return await this.quizRepository.save(createQuizDto);
   }

   async findQuestionById(id: number) {
    // return await this.questionSetRepository.findOne(setId, { relations: ['questions'] });

      return await this.quizRepository
            .createQueryBuilder('quiz')
            .innerJoinAndSelect('quiz.question', 'question')
            .addSelect('question.answer')
            .where('question.id = :questionId', { questionId: id})
            .getOne();
   }

   async getQuizResults(question) {
      let res = await this.questionRepository
            .query("SELECT qz.input, q.answer, COUNT(qz.input) AS total FROM questions AS q LEFT JOIN quiz AS qz ON qz.questionId = q.id WHERE q.id = ? GROUP BY qz.input", [question.id]);
      
      question.answer = res[0].answer;

      question.results = [
         {
            input: question.option1,
            total: (res.filter(x => x.input === question.option1).map(obj => obj.total)[0]) || '0'
         },
         {
            input: question.option2,
            total: res.filter(x => x.input === question.option2).map(obj => obj.total)[0] || '0'
         },
         {
            input: question.option3,
            total: res.filter(x => x.input === question.option3).map(obj => obj.total)[0] || '0'
         },
         {
            input: question.option4,
            total: res.filter(x => x.input === question.option4).map(obj => obj.total)[0] || '0'
         },
      ];

      return question;
   }

   async getFinalResults(set) {
      let res = await this.questionRepository
            .query("SELECT qz.input, q.answer, COUNT(qz.input) AS total FROM questions AS q LEFT JOIN quiz AS qz ON qz.questionId = q.id WHERE q.id = ? GROUP BY qz.input", [set.id]);
      
      return res;
   }
}

// totalQuestion: ,
// amount: ,
// winner : [
//   { name:  image:  email: },
//   { name:  image:  email: }
// ]


import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from '../../quiz/dto/quiz.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Quiz } from '../entities/quiz.entity';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class QuizService {

   constructor(
      @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
      @InjectRepository(Question) private questionRepository: Repository<Question>,
      @InjectRepository(User) private userRepository: Repository<User>,
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

   async getFinalResults(setId: number) {
      let setQuestions = await this.questionRepository
            .createQueryBuilder('question')
            .select('question.id')
            .innerJoin('question.questionSet', 'set')
            .where('set.id = :setId', { setId: setId})
            .getMany();

      let questionIds = setQuestions.map((obj) => obj.id);
      let totalQuestion = questionIds.length;
      let totalAmount = 100000;

      let winners = await this.questionRepository.query("SELECT name, image, email FROM (SELECT * FROM (SELECT `user`.`name`, `user`.`image`, `user`.`email`, SUM(`quiz`.`inputTime`) AS timeTaken, COUNT(`quiz`.`id`) AS correctAnswerGiven FROM `user` `user` INNER JOIN `quiz` `quiz` ON `quiz`.`userId`=`user`.`id` WHERE `quiz`.`isCorrect` = 1 and `quiz`.`isTimeout` = 0 and quiz.questionId in (?) GROUP BY `user`.`id` ORDER BY timeTaken ASC) data HAVING data.correctAnswerGiven = ?) winners", [questionIds, totalQuestion]);

      // winners = (winners[0].name === null || winners[0].totalWon === null) ? [] : winners;
      let totalWinners = winners.length;
      let distributedAmount = await this.convertAmount(totalAmount/totalWinners);

      var finalWinners = winners.map((obj) => {
         let newData = Object.assign({}, obj);
         newData.totalWon = 'रू ' + distributedAmount;
         return newData;
      });
      return {
         totalQuestion: totalQuestion,
         totalAmount: 'रू ' + await this.convertAmount(totalAmount),
         winners: finalWinners
      }
      
   }

   async convertAmount(value) {
      let Amount: any = 0;
      value = parseInt(value);

      Amount = value.toString().replace(/^(\d*[\d.]*?)\.?0*$/,'$1');

      return await Amount.toString().replace(/\B(?=(\d{2})+(\d{1})(?!\d))/g, ",");
   }
}

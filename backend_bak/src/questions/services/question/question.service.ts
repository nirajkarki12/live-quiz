import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// DTO
import { CreateQuestionDto } from '../../../questions/dto/create-question.dto';
// Services
import { QuestionsetService } from '../questionset/questionset.service';
// Entities
import { Question } from '../../entities/question.entity';

@Injectable()
export class QuestionService {

   constructor(
      @InjectRepository(Question) private questionRepository: Repository<Question>
   ) {}

   async create(createQuestionDto: CreateQuestionDto) {
      return await this.questionRepository.save(createQuestionDto);
   }

   async fetchQuestions(): Promise<any> {
      return await this.questionRepository
         .createQueryBuilder('questions')
         .addSelect('questions.answer')
         .getMany();
   }

   async delete(id: number) {
      return await this.questionRepository.delete(id);
   }

   async findOneById(id: number): Promise<any> {
      return await this.questionRepository
         .createQueryBuilder('questions')
         .addSelect('questions.answer')
         .where('id = :questionId', { questionId: id})
         .getOne();
   }

   async findAndUpdate(id: number, data: CreateQuestionDto) {
      return await this.questionRepository.update(id, data);
   }

   async findOneByIdWithSet(id: number): Promise<any> {
      return await this.questionRepository
            .createQueryBuilder('question')
            .innerJoinAndSelect('question.questionSet', 'questionSet')
            .addSelect('question.answer')
            .where('question.id = :questionId', { questionId: id})
            .getOne();
   }
}

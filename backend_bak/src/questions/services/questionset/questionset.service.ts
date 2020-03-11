import { Injectable } from '@nestjs/common';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionSetDto } from '../../../questions/dto/create-questionset.dto';
import * as moment from 'moment';

import { QuestionSet } from '../../entities/question-set.entity';

@Injectable()
export class QuestionsetService {

  constructor(
    @InjectRepository(QuestionSet) private questionSetRepository: Repository<QuestionSet>
  ) {}

  async create(createQuestionSetDto: CreateQuestionSetDto) {
    return await this.questionSetRepository.save(createQuestionSetDto);
  }
  
  async fetchQuestionSets() {
    return await this.questionSetRepository.find();
  }

  async delete(id: number) {
    return await this.questionSetRepository.delete(id);
  }

  async findOneById(id: number) {
    return await this.questionSetRepository.findOne(id);
  }

  async findAndUpdate(id: number, data: CreateQuestionSetDto)
  {
    return await this.questionSetRepository.update(id, data);
  }

  async getQuestionsBySet(setId: number) {
    return await this.questionSetRepository
          .createQueryBuilder('set')
          .innerJoinAndSelect('set.questions', 'questions')
          .addSelect('questions.answer')
          .orderBy('questions.level', 'ASC')
          .getOne();
    // return await this.questionSetRepository.findOne(setId, { relations: ['questions'] });
  }

  async getQuestionsBySetForClient(setId: number) {
    return await this.questionSetRepository
          .createQueryBuilder('set')
          .innerJoinAndSelect('set.questions', 'questions')
          .orderBy('questions.level', 'ASC')
          .getOne();
  }

  async getActiveSets()
  {
    return await this.questionSetRepository.find({
      where: {
        isCompleted: false,
        scheduleDate: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD'))
      },
      order: {
        scheduleDate: 'ASC'
      }
    });
  }

}

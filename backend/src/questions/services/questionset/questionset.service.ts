import { Injectable } from '@nestjs/common';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
// DTO
import { CreateQuestionSetDto } from '../../../questions/dto/create-questionset.dto';
// Entities
import { QuestionSet } from '../../entities/question-set.entity';
import { Sponsor } from '../../entities/sponsor.entity';

@Injectable()
export class QuestionsetService {

  constructor(
    @InjectRepository(QuestionSet) private questionSetRepository: Repository<QuestionSet>,
    @InjectRepository(Sponsor) private sponsorRepository: Repository<Sponsor>
  ) {}

  async create(createQuestionSetDto: CreateQuestionSetDto) {
    let sponsorIds = await createQuestionSetDto.sponsors;
    let sponsors;
    let set = new QuestionSet();
    set.name = createQuestionSetDto.name;
    set.prize = createQuestionSetDto.prize;
    set.scheduleDate = createQuestionSetDto.scheduleDate;

      for ( let i = 0; i < sponsorIds.length ; i++) {
        let data = await this.sponsorRepository.findOne(sponsorIds[i]);
        if(!sponsors){
          sponsors = [data];
        }else{
          sponsors.push(data);
        }
      }

    set.sponsors = sponsors;
    return await this.questionSetRepository.save(set);
  }
  
  async fetchQuestionSets() {
    return await this.questionSetRepository.find({
      relations: ['sponsors']
    });
  }

  async delete(id: number) {
    return await this.questionSetRepository.delete(id);
  }

  async findOneById(id: number) {
    return await this.questionSetRepository.findOne(id, {
      relations: ['sponsors']
    });
  }

  async findInProgress() {
    return await this.questionSetRepository
          .createQueryBuilder()
          .where('status = 2')
          .getOne();
  }

  async findInFinished(id: number) {
    return await this.questionSetRepository
          .createQueryBuilder()
          .where('id = :id and status = 3 and isCompleted = 1', { id: id})
          .getOne();
  }

  async findAndUpdate(id: number, data: CreateQuestionSetDto)
  {
    let sponsorIds = await data.sponsors;
    let sponsors;
    let set = await this.questionSetRepository.findOne(id);
    set.name = data.name;
    set.prize = data.prize;
    set.scheduleDate = data.scheduleDate;

    for ( let i = 0; i < sponsorIds.length ; i++) {
        let data = await this.sponsorRepository.findOne(sponsorIds[i]);
        if(!sponsors){
          sponsors = [data];
        }else{
          sponsors.push(data);
        }
      }

    set.sponsors = sponsors;
    return await this.questionSetRepository.save(set);
  }

  async updateStatus(id: number, data)
  {
    return await this.questionSetRepository.update(id, data);
  }

  async getQuestionsBySet(setId: number) {
    return await this.questionSetRepository
          .createQueryBuilder('set')
          .leftJoinAndSelect('set.questions', 'questions')
          .addSelect('questions.answer')
          .orderBy('questions.level', 'ASC')
          .where('set.id = :id', { id: setId})
          .getOne();
    // return await this.questionSetRepository.findOne(setId, { relations: ['questions'] });
  }

  async getQuestionsBySetForClient(setId: number) {
    return await this.questionSetRepository
          .createQueryBuilder('set')
          .innerJoinAndSelect('set.questions', 'questions')
          .orderBy('questions.level', 'ASC')
          .where('set.id = :id', { id: setId})
          .getOne();
  }

  async getActiveSets()
  {
    return await this.questionSetRepository.find({
      where: {
        isCompleted: false,
        scheduleDate: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD HH:mm'))
      },
      order: {
        scheduleDate: 'ASC'
      }
    });
  }

  async getActivesetsForMobile()
  {
    let questionsets = await this.questionSetRepository.find({
      relations: ['sponsors'],
      where: {
        isCompleted: false,
        scheduleDate: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD HH:mm'))
      },
      order: {
        scheduleDate: 'ASC'
      }
    });
    return questionsets;
  }

  async getInactivesetsForMobile()
  {
    let questionsets = await this.questionSetRepository.find({
      relations: ['sponsors'],
      where: {
        isCompleted: true,
      },
      order: {
        scheduleDate: 'DESC'
      }
    });
    return questionsets;
  }

}

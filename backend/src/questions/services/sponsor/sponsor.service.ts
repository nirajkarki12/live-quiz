import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from 'src/questions/entities/sponsor.entity';
import { Repository } from 'typeorm';
import { CreateSponsorDTO } from 'src/questions/dto/create-sponsor.dto';

@Injectable()
export class SponsorService {

    constructor( @InjectRepository(Sponsor) private sponsorRepository: Repository<Sponsor>) {}

    async create(createSponsorDto: CreateSponsorDTO) {
        return await this.sponsorRepository.save(createSponsorDto)
    }


    async fetchSponsors() {
        return await this.sponsorRepository.find();
      }
    
    async delete(id: number) {
      return await this.sponsorRepository.delete(id);
    }
  
    async findOneById(id: number) {
      return await this.sponsorRepository.findOne(id);
    }
  

  
    async findAndUpdate(id: number, data: CreateSponsorDTO)
    {
      return await this.sponsorRepository.update(id, data);
    }
  
    async updateStatus(id: number, data)
    {
      return await this.sponsorRepository.update(id, data);
    }


}

import { Controller, Get, Res, HttpStatus, HttpException, Post, UseInterceptors, FileInterceptor, UploadedFile, Body, Delete, Param } from '@nestjs/common';
import { SponsorService } from 'src/questions/services/sponsor/sponsor.service';
import { QuestionsetService } from 'src/questions/services/questionset/questionset.service';
import { diskStorage } from 'multer';
import { CreateSponsorDTO } from 'src/questions/dto/create-sponsor.dto';
import { extname } from 'path';
require('dotenv').config({ path: '.env' });

@Controller('sponsor')
export class SponsorController {
    dest = './src/uploads';
    constructor(private sponsorService: SponsorService, private questionSetService: QuestionsetService) {}

    @Get()
    async all(@Res() res) {
        try {
            let sponsors = await this.sponsorService.fetchSponsors();

            res.status(HttpStatus.OK)
                .send({
                    success: true,
                    statusCode: HttpStatus.OK,
                    data: sponsors
                })
            return res;
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Post('create')
    @UseInterceptors(FileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: './src/uploads',
                filename: (req, file, cb) => {
                    const randomName = new Date().valueOf()
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async create(@UploadedFile() file, @Body() body, @Res() res) {
        try {
            let createSponsorDto = new CreateSponsorDTO();
            createSponsorDto.name = body.name;
            createSponsorDto.logo = file.filename;
            createSponsorDto.prize = body.prize;
            createSponsorDto.logo_url = process.env.BASE_URL + 'uploads/' + file.filename;
    
            let sponsor = await this.sponsorService.create(createSponsorDto);
            res.status(HttpStatus.OK)
                .send({
                    success: true,
                    data: sponsor,
                    statusCode: HttpStatus.OK
                })
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        let fs = require('fs');

        let sponsor = await this.sponsorService.findOneById(id);

        let res = await this.sponsorService.delete(id);

        console.log(sponsor)

        fs.unlink(this.dest + '/' + sponsor.logo, (res) => {
            console.log(res)
        });
        
        return res;
        try {
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
}

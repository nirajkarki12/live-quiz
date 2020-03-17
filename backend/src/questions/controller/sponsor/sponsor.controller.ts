import { Controller, Get, Res, HttpStatus, HttpException, Post, UseInterceptors, FileInterceptor, UploadedFile, Body } from '@nestjs/common';
import { SponsorService } from 'src/questions/services/sponsor/sponsor.service';
import { QuestionsetService } from 'src/questions/services/questionset/questionset.service';
import { diskStorage } from 'multer';
import { fileURLToPath } from 'url';
import { CreateSponsorDTO } from 'src/questions/dto/create-sponsor.dto';

@Controller('sponsor')
export class SponsorController {
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
            storage: diskStorage({destination: './uploads'})
        }
    ))
    async create(@UploadedFile() file, @Body() body, @Res() res) {
        try {
            return file;
            let createSponsorDto = new CreateSponsorDTO();

            createSponsorDto.name = body.name;
            createSponsorDto.logo = file.name;
            createSponsorDto.prize = body.prize;

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
}

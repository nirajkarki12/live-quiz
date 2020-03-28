import { Controller, UseGuards, Get, Res, HttpStatus, HttpException, Post, UseInterceptors, UploadedFile, Body, Param, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { SponsorService } from 'src/questions/services/sponsor/sponsor.service';
import { QuestionsetService } from 'src/questions/services/questionset/questionset.service';
import { diskStorage } from 'multer';
import { CreateSponsorDTO } from 'src/questions/dto/create-sponsor.dto';
import { extname } from 'path';
require('dotenv').config({ path: '.env' });

@Controller('sponsor')
@UseGuards(AuthGuard())
export class SponsorController {
    dest = './public';
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

    @Get('detail/:id')
    async findOneById(@Param('id') id: number, @Res() res)
    {
        try {
            let sponsor = await this.sponsorService.findOneById(id);
            res.status(HttpStatus.OK)
                .send({
                    success: true,
                    data: sponsor,
                    statusCode: HttpStatus.OK
                });
        } catch (error) {
            throw new HttpException(error,HttpStatus.AMBIGUOUS);
        }
    }

    @Post('create')
    @UseInterceptors(FileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: './public',
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
            createSponsorDto.logo_url = process.env.BASE_URL + 'api/public/' + file.filename;

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

    @Patch('update/:id')
    @UseInterceptors(FileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const randomName = new Date().valueOf()
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async updateOne(@UploadedFile() file, @Body() body, @Res() res, @Param('id') id: number)
    {
        try {
            let updateSponsorDto = new CreateSponsorDTO();
            updateSponsorDto.name = body.name;

            if(file)
            {
                let fs = require('fs');

                let data = await this.sponsorService.findOneById(id);
                fs.unlink(this.dest + '/' + data.logo, (res) => {
                    // console.log(res)
                });
                
                updateSponsorDto.logo = file.filename;
                updateSponsorDto.logo_url = process.env.BASE_URL + 'api/public/' + file.filename;
            }

            let sponsor = await this.sponsorService.findAndUpdate(id, updateSponsorDto);
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

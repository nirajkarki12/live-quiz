import { Controller, Get, Post, Body, UseGuards, HttpException, HttpStatus, Res, Delete, Req, Query, Param, Patch, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuestionSetDto } from '../../dto/questionset/create-questionset.dto';
import { QuestionsetService } from '../../services/questionset/questionset.service';

@Controller('questionsets')
// @UseGuards(AuthGuard())
export class QuestionsetController {
    
    constructor(private questionSetService: QuestionsetService) {}
    
    @Post('getquestion')
    async getQuestions(@Res() res, @Param() id) {
        try {
            let questions = await this.questionSetService.getQuestions(id);
            res.status(HttpStatus.OK)
            .send({
                success: true,
                data:questions,
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Post('create')
    async create(@Body() createQuestionSetDto: CreateQuestionSetDto) {
        try {
            return await this.questionSetService.create(createQuestionSetDto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }


    @Get()
    async all(@Res() res) {
        try {
            let questionsSets = await this.questionSetService.fetchQuestionSets();
            res.status(HttpStatus.OK)
            .send({
                success: true,
                data:questionsSets,
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Delete()
    async delete(@Param('id') id) {
        try {
            return await this.questionSetService.delete(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Get(':id')
    async findOneById(@Param('id') id, @Res() res)
    {
        try {
            let questionSet = await this.questionSetService.findOneById(id);
            res.status(HttpStatus.OK)
                .send({
                    success:true,
                    data:questionSet,
                    statusCode:HttpStatus.OK
                });
        } catch (error) {
            throw new HttpException(error,HttpStatus.AMBIGUOUS);
        }
    }

    @Patch(':id')
    async updateOne(@Body() body: CreateQuestionSetDto,@Param('id') id)
    {
        try {
            return await this.questionSetService.findAndUpdate(id, body);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Get('active')
    async getActiveSet()
    {
        try {
            return await this.questionSetService.getActiveSets();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }
    
    
}
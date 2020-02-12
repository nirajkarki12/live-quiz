import { Controller, Get, Post, Body, UseGuards, HttpException, HttpStatus, Res, Delete, Req, Query, Param, Patch, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuestionSetDto } from '../../dto/questionset/create-questionset.dto';
import { QuestionsetService } from '../../services/questionset/questionset.service';

@Controller('questionsets')
export class QuestionsetController {
    
    constructor(private questionSetService: QuestionsetService) {}
    
    @Post('create')
    // @UseGuards(AuthGuard())
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
            return res;
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Delete(':id')
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
            let questionSet = this.questionSetService.findOneById(id);
            res.status(HttpStatus.OK)
                .send({
                    success:true,
                    data:questionSet,
                    statusCode:HttpStatus.OK
                });
            console.log(questionSet);
            return res;
        } catch (error) {
            throw new HttpException(error,HttpStatus.AMBIGUOUS);
        }
    }
    
    
}
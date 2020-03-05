import { Controller, Get, Post, Body, UseGuards, HttpException, HttpStatus, Res, Delete, Req, Query, Param, Patch, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuestionSetDto } from '../../dto/create-questionset.dto';
import { QuestionsetService } from '../../services/questionset/questionset.service';

@Controller('questionsets')
// @UseGuards(AuthGuard())
export class QuestionsetController {
    
    constructor(private questionSetService: QuestionsetService) {}
    
    @Get('active')
    async getActiveSet()
    {
        try {
            return await this.questionSetService.getActiveSets();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
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

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await this.questionSetService.delete(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Get(':id')
    async findOneById(@Param('id') id: number, @Res() res)
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
    async updateOne(@Body() body: CreateQuestionSetDto,@Param('id') id: number)
    {
        try {
            return await this.questionSetService.findAndUpdate(id, body);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
    
}
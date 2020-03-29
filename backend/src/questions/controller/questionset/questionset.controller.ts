import { Controller, UseGuards, Get, Post, Body, HttpException, HttpStatus, Res, Delete, Req, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Services
import { QuestionsetService } from '../../services/questionset/questionset.service';
// DTO
import { CreateQuestionSetDto } from '../../dto/create-questionset.dto';

@Controller('questionsets')
export class QuestionsetController {
    
    constructor(private questionSetService: QuestionsetService) {}
    
    @Get('active')
    @UseGuards(AuthGuard())
    async getActiveSet()
    {
        try {
            return await this.questionSetService.getActiveSets();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    @Get('inactive/mobile')
    async getInactiveSetMobile()
    {
        try {
            return await this.questionSetService.getInactivesetsForMobile();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    @Get('active/mobile')
    async getActiveSetMobile()
    {
        try {
            return await this.questionSetService.getActivesetsForMobile();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    @Post('create')
    @UseGuards(AuthGuard())
    async create(@Body() createQuestionSetDto: CreateQuestionSetDto) {
        try {
            return await this.questionSetService.create(createQuestionSetDto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }


    @Get()
    @UseGuards(AuthGuard())
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
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: number) {
        try {
            return await this.questionSetService.delete(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard())
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
    @UseGuards(AuthGuard())
    async updateOne(@Body() body: CreateQuestionSetDto,@Param('id') id: number)
    {
        try {
            return await this.questionSetService.findAndUpdate(id, body);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
    
}
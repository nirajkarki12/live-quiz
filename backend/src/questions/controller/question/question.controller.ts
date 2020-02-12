import { Controller, Get, HttpException, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { QuestionService } from 'src/questions/services/question/question.service';
import { CreateQuestionDto } from 'src/questions/dto/question/create-question.dto';

@Controller('question')
export class QuestionController {

    constructor(private questionService:QuestionService) {}

    @Get('/')
    async all(@Res() res)
    {
        try {
            let questions = await this.questionService.fetchQuestions();
            res.status(HttpStatus.OK)
            .send({
                success: true,
                data:questions,
                statusCode: HttpStatus.OK,
            });
            return res;
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Post('create')
    async create(@Body() CreateQuestionDto:CreateQuestionDto)
    {
        try {
            return await this.questionService.create(CreateQuestionDto)
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
}

import { Controller, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// Services
import { QuizService } from '../services/quiz.service';
import { QuestionService } from '../../questions/services/question/question.service';

@Controller('quiz')
@UseGuards(AuthGuard())
export class QuizController {

    constructor(private quizService:QuizService, private questionService: QuestionService) {}
    @Get()
    async count(@Body() body)
    {
        const question = await this.questionService.findOneById(body.id);
        return await this.quizService.getQuizResults(question);
    }

    @Get('test')
    async test(@Body() body)
    {
        const question = await this.questionService.findOneById(3);
        const res = await this.quizService.getQuizResults(question);

        return res;
    }

}
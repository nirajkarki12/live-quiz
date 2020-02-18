import { Controller, Get, HttpException, HttpStatus, Post, Body, Res, Param, Delete, Patch, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';
import { QuizService } from 'src/quiz/services/quiz.service';
import { QuestionService } from 'src/questions/services/question/question.service';

@Controller('quiz')
export class QuizController {

    constructor(private quizService:QuizService, private questionService: QuestionService) {}
    @Get()
    async count(@Body() body)
    {
        const question = await this.questionService.findOneById(body.id);
        return await this.quizService.count(question);
    }
    
    @Post()
    async create(@Res() res, @Body() body)
    {
        // user,question,answer,iscorrect

        let quiz = await this.quizService.create(body);
        res.status(HttpStatus.OK)
            .send({
                success:true,
                data:quiz,
                statusCode:HttpStatus.OK
            })
            
        try {
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
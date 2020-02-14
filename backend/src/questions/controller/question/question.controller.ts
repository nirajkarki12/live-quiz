import { Controller, Get, HttpException, HttpStatus, Post, Body, Res, Param, Delete, Patch, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';
import { QuestionService } from 'src/questions/services/question/question.service';
import { CreateQuestionDto } from 'src/questions/dto/question/create-question.dto';
import readXlsxFile from 'read-excel-file/node'

@Controller('question')
export class QuestionController {

    constructor(private questionService:QuestionService) {}

    @Get('set')
    async eachQuestionSet(@Res() res)
    {
        try {
            let questions = await this.questionService.getQuestionSet();
            res.status(HttpStatus.OK)
                .send({
                    data:questions
                })
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Get()
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

    @Get(':id')
    async findOneById(@Param('id') id, @Res() res) {
        try {
            let question = await this.questionService.findOneById(id);
            res.status(HttpStatus.OK)
                .send({
                    success: true,
                    data: question,
                    statusCode: HttpStatus.OK
                })
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            return await this.questionService.delete(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Patch()
    async updateOne(@Body() body: CreateQuestionDto, @Param('id') id) {
        try {
            return await this.questionService.findAndUpdate(id, body);
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        try {
            readXlsxFile(file).then((row) =>{
                console.log(row);
            });
        } catch (error) {
            console.log(error.errmsg);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
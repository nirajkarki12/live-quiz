import { Controller, Get, HttpException, HttpStatus, Post, Body, Res, Param, Delete, Patch, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';
import { QuestionService } from '../../../questions/services/question/question.service';
import { CreateQuestionDto } from '../../../questions/dto/question/create-question.dto';
import { QuestionsetService } from '../../services/questionset/questionset.service';
import { diskStorage } from 'multer';

@Controller('question')
export class QuestionController {

    constructor(private questionService:QuestionService,private questionsetService:QuestionsetService) {}

    @Get('set/:id')
    async eachQuestionSet(@Res() res, @Param('id') id)
    {
        try {
            let questions = await this.questionService.getQuestionSet(id);
            let set = await this.questionsetService.findOneById(id);
            res.status(HttpStatus.OK)
                .send({
                    success:true,
                    data:{questions:questions,set:set},
                    statusCode:HttpStatus.OK
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
                statusCode: HttpStatus.OK,
                data:questions
            });
            return res;
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
    
    @Patch(':id')
    async updateOne(@Body() body: CreateQuestionDto, @Param('id') id) {
        try {
            return await this.questionService.findAndUpdate(id, body);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor(
        'file',
        {
            storage: diskStorage({destination: './uploads'})
        }
    ))
    async uploadFile(@UploadedFile() file,@Param('id') id, @Res() res) {
        try {

            let self = this;
            
            let Excel = require('exceljs');
            let workbook = new Excel.Workbook();

            workbook.xlsx.readFile(file.path).then(async function(){

                let worksheet = workbook.getWorksheet('Sheet1');

                worksheet.eachRow( async function(row, rowNumber) {
                    var questionObj  = {
                        name:row.values[1],
                        option1:row.values[2],
                        option2:row.values[3],
                        option3:row.values[4],
                        option4:row.values[5],
                        answer:row.values[6],
                        level:row.values[7],
                        questionSetId:id,
                    }

                    await self.questionService.create(questionObj);

                });

            });

            res.status(HttpStatus.OK)
                .send({
                    success: true,
                    message:'Questions imported',
                    data: [],
                    statusCode: HttpStatus.OK
                })

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
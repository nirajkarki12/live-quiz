import { QuestionSet } from '../entities/question-set.entity';

export class CreateQuestionDto {
    readonly name: string;
    readonly option1: string;
    readonly option2: string;
    readonly option3: string;
    readonly option4: string;
    readonly answer: string;
    readonly level: number;
    readonly questionSet: QuestionSet;
 }
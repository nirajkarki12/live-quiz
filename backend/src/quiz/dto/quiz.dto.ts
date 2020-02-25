export class CreateQuizDto {
    readonly user: number;
    readonly question: any;
    readonly answer?: string;
    readonly isCorrect?: boolean;
    readonly isTimeOut?: boolean;
 }
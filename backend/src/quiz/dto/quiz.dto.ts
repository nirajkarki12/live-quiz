import { Question } from "../../questions/entities/question.entity";
import { User } from "../../users/entities/user.entity";

export class CreateQuizDto {
    readonly question: Question;
    readonly user: User;
    readonly input?: string;
    readonly inputTime?: number;
    readonly isCorrect?: boolean;
    readonly isTimeout?: boolean;
}
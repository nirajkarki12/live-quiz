import { Sets } from './sets.model';

export class Question {
   id: number;
   questionSet?: Sets;
   name: string;
   option1: string;
   option2: string;
   option3: string;
   option4: string;
   answer: string;
   level: number = 1;
   questionSent?: Boolean;
   waitingAnswer?: Boolean;
   disabled: Boolean = false;
   results?: any;

}

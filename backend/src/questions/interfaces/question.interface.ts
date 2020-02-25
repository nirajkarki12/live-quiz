export interface Question {
    id: string;
    name: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
    level: number;
    questionSetId: string;
    results?: any;
}
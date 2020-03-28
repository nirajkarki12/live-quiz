import { Sponsor } from '../entities/sponsor.entity';

export class CreateQuestionSetDto {
    readonly name: string;
    readonly prize: number;
    readonly scheduleDate: Date;
    readonly isCompleted: boolean;
    readonly sponsors: Promise<Sponsor[]>;
 }
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Question } from "../../questions/entities/question.entity";
import { QuestionSet } from "../../questions/entities/question-set.entity";
import { QuizInput } from "./quiz-input.entity";

@Entity('quiz')
@Index(['question', 'questionSet'], { unique: true })
export class Quiz {
   @PrimaryGeneratedColumn()
   id: number;

   @OneToOne(type => Question)
   @JoinColumn({
      name: "questionId",
      referencedColumnName: "id"
   })
   question: Question;

   @ManyToOne(type => QuestionSet)
   @JoinColumn({
      name: "questionSetId",
      referencedColumnName: "id"
   })
   questionSet: QuestionSet;

   @OneToMany(type => QuizInput, quizInput => quizInput.quiz)
   quizInputs: QuizInput[];

   @CreateDateColumn({ select: false})
   createdAt: Date;

   @UpdateDateColumn({ select: false})
   updatedAt: Date;

}
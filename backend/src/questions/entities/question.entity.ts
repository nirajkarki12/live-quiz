import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { QuestionSet } from "./question-set.entity";

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  option1: string;

  @Column({ nullable: false })
  option2: string;

  @Column({ nullable: false })
  option3: string;

  @Column({ nullable: false })
  option4: string;

  @Column({ nullable: false, select: false })
  answer: string;

  @Column({ nullable: false })
  level: number;

  @ManyToOne(type => QuestionSet, questionSet => questionSet.questions, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  questionSet: QuestionSet;

  @CreateDateColumn({ select: false})
  createdAt: Date;

  @UpdateDateColumn({ select: false})
  updatedAt: Date;

}
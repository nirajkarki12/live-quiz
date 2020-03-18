import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { QuestionSet } from "./question-set.entity";
import { Quiz } from "../../quiz/entities/quiz.entity";

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

  @OneToMany(type => Quiz, quiz => quiz.question)
  quiz: Quiz[];

  @CreateDateColumn({ select: false})
  createdAt: Date;

  @UpdateDateColumn({ select: false})
  updatedAt: Date;

}
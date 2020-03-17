import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Question } from "./question.entity";
import { Sponsor } from "./sponsor.entity";


@Entity('question_sets')
@Unique(["name"])
export class QuestionSet {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column({ nullable: false })
   scheduleDate: Date;

   @Column({ default: false })
   isCompleted: boolean;

   @Column({ default: 1 })
   status: number;

   @OneToMany(type => Question, question => question.questionSet)
   questions: Question[];

   @ManyToOne(type => Sponsor, sponsor => sponsor.questionSet, { onUpdate: "CASCADE", onDelete: "CASCADE" })
   sponsor: Sponsor;


   @CreateDateColumn({ select: false})
   createdAt: Date;

   @UpdateDateColumn({ select: false})
   updatedAt: Date;

}
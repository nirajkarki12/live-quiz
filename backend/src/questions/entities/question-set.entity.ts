import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Question } from "./question.entity";
import { Sponsor } from "./sponsor.entity";

@Entity('question_sets')
@Unique(["name"])
export class QuestionSet {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column({ nullable: false, default: 0 })
   prize: number;

   @Column({ nullable: false })
   scheduleDate: Date;

   @Column({ default: false })
   isCompleted: boolean;

   @Column({ default: 1 })
   status: number;

   @Column({ default: 1 })
   isRoomOpen: boolean;

   @OneToMany(type => Question, question => question.questionSet)
   questions: Question[];

   @ManyToMany(type => Sponsor, sponsor => sponsor.questionSets)
   @JoinTable({
      name: 'sponsors_question_sets',
      joinColumns: [
         { name: 'questionSetsId'}
      ],
      inverseJoinColumns: [
         { name: 'sponsorsId' }
      ]
   })
   sponsors: Promise<Sponsor[]>;

   @CreateDateColumn({ select: false})
   createdAt: Date;

   @UpdateDateColumn({ select: false})
   updatedAt: Date;

}
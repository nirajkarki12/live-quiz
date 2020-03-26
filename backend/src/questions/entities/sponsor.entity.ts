import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { QuestionSet } from "./question-set.entity";
require('dotenv').config({ path: '.env' });

@Entity('sponsors')
export class Sponsor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  logo: string;

  @Column({ default: null })
  logo_url: string;

  @ManyToMany(type => QuestionSet, questionSet => questionSet.sponsors)
  questionSets: Promise<QuestionSet[]>;

  @CreateDateColumn({ select: false})
  createdAt: Date;

  @UpdateDateColumn({ select: false})
  updatedAt: Date;

}
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
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

  @Column({ default: null })
  prize: string;

  @ManyToMany(type => QuestionSet, questionSet => questionSet.sponsors)
  questionSets: Promise<QuestionSet[]>;

  @CreateDateColumn({ select: false})
  createdAt: Date;

  @UpdateDateColumn({ select: false})
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  logoUrl() {
    if(this.logo) this.logo_url = process.env.BASE_URL + 'public/' + this.logo;
  }

}
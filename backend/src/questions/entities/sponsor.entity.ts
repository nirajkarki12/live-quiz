import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
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

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  prize: string;

  @OneToMany(type => QuestionSet, questionSet => questionSet.sponsor)
  questionSet: QuestionSet[];

  @CreateDateColumn({ select: false})
  createdAt: Date;

  @UpdateDateColumn({ select: false})
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.logo) this.logo_url = await process.env.BASE_URL + 'uploads/' + this.logo;
  }

}
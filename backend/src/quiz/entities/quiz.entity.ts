import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from "../../users/entities/user.entity";
import { Question } from "../../questions/entities/question.entity";

@Entity('quiz')
@Index(['user', 'question'], { unique: true })
export class Quiz {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(type => User)
   @JoinColumn({
      name: "userId",
      referencedColumnName: "id"
   })
   user: User;

   @ManyToOne(type => Question, { onUpdate: "CASCADE" })
   @JoinColumn({
      name: "questionId",
      referencedColumnName: "id"
   })
   question: Question;

   @Column({ nullable: true })
   input: string;

   @Column({ default: false })
   isCorrect: boolean;

   @Column({ default: false })
   isTimeout: boolean;

   @CreateDateColumn({ select: false})
   createdAt: Date;

   @UpdateDateColumn({ select: false})
   updatedAt: Date;

}
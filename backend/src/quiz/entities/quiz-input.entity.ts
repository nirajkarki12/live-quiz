import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from "../../users/entities/user.entity";
import { Quiz } from "./quiz.entity";

@Entity('quiz_input')
@Index(['user', 'quiz'], { unique: true })
export class QuizInput {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(type => User)
   @JoinColumn({
      name: "userId",
      referencedColumnName: "id"
   })
   user: User;

   @ManyToOne(type => Quiz, quiz => quiz.quizInputs)
   quiz: Quiz;

   @Column()
   input: string;

   @Column()
   isCorrect: boolean;

   @Column()
   isTimeout: boolean;

   @CreateDateColumn({ select: false})
   createdAt: Date;

   @UpdateDateColumn({ select: false})
   updatedAt: Date;

}
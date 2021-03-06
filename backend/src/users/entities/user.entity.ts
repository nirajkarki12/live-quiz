import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Quiz } from "../../quiz/entities/quiz.entity";

@Entity()
@Unique(["email"])
@Index(["userId"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: null })
  userId: number;

  @OneToMany(type => Quiz, quiz => quiz.user)
  quiz: Quiz[];

  @CreateDateColumn({ select: false})
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(attempt: string, callback) {
    bcrypt.compare(attempt, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
   });
  }

}
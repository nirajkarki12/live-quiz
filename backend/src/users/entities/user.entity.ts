import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRO } from '../ro/user.ro';

@Entity()
@Unique(["email"])
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
  userId: string;

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

  toResponseObject(): UserRO {
    const { name, email, image} = this;
    const responseObject: UserRO = {
      name,
      email,
      image,
    };

    return responseObject;
  }
}
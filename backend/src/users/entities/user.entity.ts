import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookEntity } from './BookEntity';
import IEntity from './IEntity';

@Entity({ name: "Users" })
export class UserEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @OneToMany(() => BookEntity, (book: BookEntity) => book.user)
  books: BookEntity[];
}

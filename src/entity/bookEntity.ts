import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import IEntity from './IEntity';
import { UserEntity } from './UserEntity';

@Entity({ name: 'Books' })
export class BookEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publisher: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.books)
  user: UserEntity;
}
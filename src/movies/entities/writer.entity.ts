import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Movie } from './movie.entity';

@Entity({ name: 'writers' })
export class Writer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updateAt: Date;

  @ManyToMany(() => Movie, (movie) => movie.writers)
  @JoinTable({
    name: 'writers_movies',
    joinColumn: {
      name: 'writer_id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
    },
  })
  movies: Movie[];
}

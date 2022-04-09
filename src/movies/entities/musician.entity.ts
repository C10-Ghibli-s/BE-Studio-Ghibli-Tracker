import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Movie } from './movie.entity';
@Entity({ name: 'musicians' })
export class Musician {
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
  creaAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updateAt: Date;

  @ManyToMany(() => Movie, (movie) => movie.musicians)
  @JoinTable({
    name: 'musicians_movies',
    joinColumn: {
      name: 'musician_id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
    },
  })
  movies: Movie[];
}

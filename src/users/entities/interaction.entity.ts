import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'interactions' })
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'seen_mark',
    type: 'boolean',
  })
  seenMark: boolean;

  @Column({ name: 'score_by_emoji', type: 'varchar' })
  scoreByEmoji: string;

  @Column({ name: 'score_by_star', type: 'decimal' })
  scoreByStar: number;

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

  @OneToOne(() => User, (user) => user.interaction)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.interactions)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}

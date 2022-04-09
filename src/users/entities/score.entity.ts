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
import { Movie } from './../../movies/entities/movie.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'scores' })
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'score_by_emoji', type: 'varchar' })
  scoreByEmoji: string;

  @Column({ name: 'score_by_star', type: 'decimal' })
  scoreByStar: number;

  @Column({ name: 'audience_score', type: 'decimal' })
  audienceScore: number;

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

  @OneToOne(() => User, (user) => user.score)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.scores)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}

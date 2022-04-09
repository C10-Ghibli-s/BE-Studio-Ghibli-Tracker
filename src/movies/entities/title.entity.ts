import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

import { Movie } from './movie.entity';
@Entity({ name: 'titles' })
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ name: 'original_title', type: 'varchar', unique: true })
  originalTitle: string;

  @Column({ name: 'romaji_title', type: 'varchar', unique: true })
  romajiTitle: string;

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

  @OneToOne(() => Movie, (movie) => movie.title)
  movie: Movie;
}

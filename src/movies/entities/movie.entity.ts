import { title } from 'process';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Title } from './title.entity';
import { Score } from './../../users/entities/score.entity';
import { Director } from './director.entity';
import { Musician } from './musician.entity';
import { Writer } from './writer.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'seen_mark',
    type: 'varchar',
  })
  seenMark: string;

  @Column({
    name: 'link_wiki',
    type: 'varchar',
    unique: true,
  })
  linkWiki: string;

  @Column({ type: 'varchar', unsigned: true })
  duration: number;

  @Column({ name: 'release_date', type: 'date' })
  releaseDate: string;

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

  @OneToOne(() => Title, (title) => title.movie)
  @JoinColumn({ name: 'title_id' })
  title: Title;

  @OneToMany(() => User, (user) => user.movie)
  users: User[];

  @OneToMany(() => Score, (score) => score.movie)
  scores: Score[];

  @ManyToMany(() => Director, (director) => director.movies)
  @JoinTable({
    name: 'movies_directors',
    joinColumn: {
      name: 'movie_id',
    },
    inverseJoinColumn: {
      name: 'director_id',
    },
  })
  directors: Director[];

  @ManyToMany(() => Musician, (musician) => musician.movies)
  musicians: Musician[];

  @ManyToMany(() => Writer, (writer) => writer.movies)
  writers: Writer[];
}

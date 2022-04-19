import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Interaction } from './interaction.entity';
import { Movie } from './../../movies/entities/movie.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', unique: true })
  nickname: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  twitter?: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  facebook?: string;

  @Column({ name: 'movie_watched', type: 'integer', default: 0 })
  movieWatched: number;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({
    name: 'profile_picture',
    type: 'varchar',
    default: '',
    nullable: true,
  })
  profilePicture?: string;

  @Column({
    type: 'uuid',
    unique: true,
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken: string;

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

  @OneToOne(() => Interaction, (interaction) => interaction.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'interaction_id' })
  interaction: Interaction;

  @ManyToOne(() => Movie, (movie) => movie.users)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}

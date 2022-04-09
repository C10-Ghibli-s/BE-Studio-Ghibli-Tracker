import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  seenMark: string;

  @Column({ type: 'varchar', unique: true })
  linkWiki: string;

  @Column({ type: 'varchar', unsigned: true })
  duration: number;

  @Column({ type: 'date' })
  releaseDate: string;
}

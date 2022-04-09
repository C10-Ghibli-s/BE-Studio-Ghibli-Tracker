import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  scoreByEmoji: string;

  @Column({ type: 'decimal' })
  scoreByStar: number;

  @Column({ type: 'decimal' })
  audienceScore: number;
}

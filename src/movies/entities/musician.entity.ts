import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Musician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}

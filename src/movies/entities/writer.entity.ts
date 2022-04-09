import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Writer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}

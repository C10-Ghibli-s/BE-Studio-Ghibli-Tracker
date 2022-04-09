import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'varchar', unique: true })
  originalTitle: string;

  @Column({ type: 'varchar', unique: true })
  romajiTitle: string;
}

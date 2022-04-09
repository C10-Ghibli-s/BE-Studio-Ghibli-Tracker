import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '', nullable: true })
  profilePicture?: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', unique: true })
  nickname: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  twitter?: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  facebook?: string;

  @Column({ type: 'integer', default: 0 })
  movieWatched: number;
}

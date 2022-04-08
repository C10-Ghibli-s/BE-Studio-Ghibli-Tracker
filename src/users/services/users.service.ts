import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('PG') private clientPg: Client) {}
  private counterId = 3;
  private users: User[] = [
    {
      id: 1,
      nickname: 'lol',
      password: 'dhfals',
      profilePicture: 'dkjfaldf',
      movieWatched: 2,
      email: 'dhalsl@mail.com',
    },
    {
      id: 2,
      nickname: 'justin',
      password: 'dhdss',
      profilePicture: 'ejero',
      movieWatched: 23,
      facebook: 'juanpepito',
    },
    {
      id: 3,
      nickname: 'shanikua',
      password: '1234key',
      profilePicture: 'jeje',
      movieWatched: 0,
      email: 'shanijeje@mail.com',
      twitter: '@larazon',
      facebook: 'shanikuiphone',
    },
  ];

  findAll() {
    return this.users;
  }

  create(data: CreateUserDto) {
    this.counterId += 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  getProfile(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User with #${id} id not found`);
    }
    return user;
  }

  update(id: number, data: UpdateUserDto) {
    const user = this.getProfile(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...data,
    };
    return this.users[index];
  }

  allTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}

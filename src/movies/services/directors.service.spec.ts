import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from '../entities/director.entity';
import { DirectorsService } from './directors.service';

describe('DirectorsService', () => {
  let service: DirectorsService;
  let directorsRepository: Repository<Director>;

  const DIRECTOR_REPOSITORY_TOKEN = getRepositoryToken(Director);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorsService,
        {
          provide: DIRECTOR_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DirectorsService>(DirectorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('directorsRepository should be defined', () => {
    expect(directorsRepository).toBeDefined();
  });
});

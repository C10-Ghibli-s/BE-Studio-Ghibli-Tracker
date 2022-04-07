import { Test, TestingModule } from '@nestjs/testing';
import { TitlesService } from './titles.service';

describe('TitlesService', () => {
  let service: TitlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TitlesService],
    }).compile();

    service = module.get<TitlesService>(TitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

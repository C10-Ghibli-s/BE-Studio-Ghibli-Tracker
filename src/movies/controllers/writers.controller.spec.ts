import { Test, TestingModule } from '@nestjs/testing';
import { WritersController } from './writers.controller';

describe('WritersController', () => {
  let controller: WritersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WritersController],
    }).compile();

    controller = module.get<WritersController>(WritersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CalenderCodeController } from './calender-code.controller';

describe('CalenderCodeController', () => {
  let controller: CalenderCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalenderCodeController],
    }).compile();

    controller = module.get<CalenderCodeController>(CalenderCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

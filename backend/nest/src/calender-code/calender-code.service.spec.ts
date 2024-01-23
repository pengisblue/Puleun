import { Test, TestingModule } from '@nestjs/testing';
import { CalenderCodeService } from './calender-code.service';

describe('CalenderCodeService', () => {
  let service: CalenderCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalenderCodeService],
    }).compile();

    service = module.get<CalenderCodeService>(CalenderCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

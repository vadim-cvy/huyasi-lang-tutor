import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppTypeConfigService } from './config.service';

describe('AppTypeConfigService', () => {
  let service: AppTypeConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTypeConfigService],
    }).compile();

    service = module.get<AppTypeConfigService>(AppTypeConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

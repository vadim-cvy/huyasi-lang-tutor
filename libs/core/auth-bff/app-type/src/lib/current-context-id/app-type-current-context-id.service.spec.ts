import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppTypeCurrentContextIdService } from './app-type-current-context-id.service';

describe('AppTypeCurrentContextIdService', () => {
  let service: AppTypeCurrentContextIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTypeCurrentContextIdService],
    }).compile();

    service = module.get<AppTypeCurrentContextIdService>(AppTypeCurrentContextIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

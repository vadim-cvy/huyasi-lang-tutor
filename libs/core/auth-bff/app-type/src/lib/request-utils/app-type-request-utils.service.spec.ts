import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppTypeRequestUtilsService } from './app-type-request-utils.service';

describe('AppTypeRequestUtilsService', () => {
  let service: AppTypeRequestUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTypeRequestUtilsService],
    }).compile();

    service = module.get<AppTypeRequestUtilsService>(AppTypeRequestUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppTypeCurrentContextIdPayloadService } from './app-type-current-context-id-payload.service';

describe('AppTypeCurrentContextIdPayloadService', () => {
  let service: AppTypeCurrentContextIdPayloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTypeCurrentContextIdPayloadService],
    }).compile();

    service = module.get<AppTypeCurrentContextIdPayloadService>(
      AppTypeCurrentContextIdPayloadService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

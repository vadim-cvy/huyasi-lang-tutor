import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { SessionConfigService } from './config.service';

describe('SessionConfigService', () => {
  let service: SessionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionConfigService],
    }).compile();

    service = module.get<SessionConfigService>(SessionConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

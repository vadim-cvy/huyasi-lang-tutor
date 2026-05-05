import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { OpenidClientService } from './openid-client.service';

describe('OpenidClientService', () => {
  let service: OpenidClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenidClientService],
    }).compile();

    service = module.get<OpenidClientService>(OpenidClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

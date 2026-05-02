import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { RedisStoreFactoryService } from './redis-store-factory.service';

describe('RedisStoreService', () => {
  let service: RedisStoreFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisStoreFactoryService],
    }).compile();

    service = module.get<RedisStoreFactoryService>(RedisStoreFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

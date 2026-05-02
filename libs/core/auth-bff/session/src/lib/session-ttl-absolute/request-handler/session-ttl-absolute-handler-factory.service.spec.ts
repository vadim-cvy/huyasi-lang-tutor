import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { SessionTtlAbsoluteHandlerFactoryService } from './session-ttl-absolute-handler-factory.service';

describe('SessionTtlAbsoluteHandlerFactoryService', () => {
  let service: SessionTtlAbsoluteHandlerFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionTtlAbsoluteHandlerFactoryService],
    }).compile();

    service = module.get<SessionTtlAbsoluteHandlerFactoryService>(
      SessionTtlAbsoluteHandlerFactoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

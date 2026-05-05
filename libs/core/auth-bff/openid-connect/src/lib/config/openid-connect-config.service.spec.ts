import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { OpenidConnectConfigService } from './openid-connect-config.service';

describe('OpenidConnectConfigService', () => {
  let service: OpenidConnectConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenidConnectConfigService],
    }).compile();

    service = module.get<OpenidConnectConfigService>(OpenidConnectConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

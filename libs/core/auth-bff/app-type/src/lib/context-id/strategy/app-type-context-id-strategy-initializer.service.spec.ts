import { Test, TestingModule } from '@nestjs/testing';
import { AppTypeContextIdStrategyInitializerService } from './app-type-context-id-strategy-initializer.service';

describe('AppTypeContextIdStrategyInitializerService', () => {
  let service: AppTypeContextIdStrategyInitializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTypeContextIdStrategyInitializerService],
    }).compile();

    service = module.get<AppTypeContextIdStrategyInitializerService>(
      AppTypeContextIdStrategyInitializerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

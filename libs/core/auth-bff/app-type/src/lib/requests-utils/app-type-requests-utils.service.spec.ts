import { Test, TestingModule } from '@nestjs/testing';
import { AppTypeRequestsUtilsService } from './app-type-requests-utils.service';

describe('AppTypeRequestsUtilsService', () => {
  let service: AppTypeRequestsUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTypeRequestsUtilsService],
    }).compile();

    service = module.get<AppTypeRequestsUtilsService>(AppTypeRequestsUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

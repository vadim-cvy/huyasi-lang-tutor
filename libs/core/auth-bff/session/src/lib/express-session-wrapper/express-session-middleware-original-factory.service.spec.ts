import { Test, TestingModule } from '@nestjs/testing';
import { ExpressSessionMiddlewareOriginalFactoryService } from './express-session-middleware-original-factory.service';

describe('ExpressSessionOriginalMiddlewareFactoryService', () => {
  let service: ExpressSessionMiddlewareOriginalFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpressSessionMiddlewareOriginalFactoryService],
    }).compile();

    service = module.get<ExpressSessionMiddlewareOriginalFactoryService>(
      ExpressSessionMiddlewareOriginalFactoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

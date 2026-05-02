import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';

import { SessionConfigService } from '../../../config/session-config.service';

type RedisClient = ReturnType<typeof createClient>;

@Injectable()
export class RedisClientService {
  private readonly logger = new Logger(RedisClientService.name);

  public readonly redisClientPromise: Promise<RedisClient> = this.createRedisClient();

  public constructor(private readonly sessionConfigService: SessionConfigService) {}

  private async createRedisClient(): Promise<RedisClient> {
    const client = createClient({
      url: this.sessionConfigService.get('storage').redisUrl,
    });

    client.on('error', (err) => {
      this.logger.error(err);
      throw new Error('Redis client error!');
    });

    return client.connect();
  }
}

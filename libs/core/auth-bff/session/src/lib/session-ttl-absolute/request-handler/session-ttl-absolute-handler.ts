import { Logger } from '@nestjs/common';

import type { RequestSession } from './request-session.type';

export class SessionTtlAbsoluteHandler {
  private readonly logger = new Logger(SessionTtlAbsoluteHandler.name);

  private readonly absoluteExpireAtMsDefaulted =
    this.session.absoluteExpireAtMs ?? Date.now() + this.ttlAbsoluteMs;

  public readonly isAbsoluteExpired = Date.now() >= this.absoluteExpireAtMsDefaulted;

  public constructor(
    private readonly session: RequestSession,
    private readonly ttlAbsoluteMs: number,
  ) {}

  public handle(): void {
    this.setAbsoluteExpireAtMsIfMissing();

    this.destroyIfAbsoluteExpired();
  }

  private setAbsoluteExpireAtMsIfMissing(): void {
    if (!this.session.absoluteExpireAtMs) {
      this.session.absoluteExpireAtMs = this.absoluteExpireAtMsDefaulted;
      this.session.save();
    }
  }

  private destroyIfAbsoluteExpired(): void {
    if (this.isAbsoluteExpired) {
      this.destroy();
    }
  }

  private destroy(): void {
    // FIXME: does this destroy cookie too?
    // FIXME: does this destroy session in store (e.g. Redis) too?
    this.session.destroy((err: unknown) => {
      if (err) {
        this.logger.error(err);
      }
    });
  }
}

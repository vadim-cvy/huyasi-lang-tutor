import { SessionTTLAbsoluteMiddleware } from './session-ttl-absolute.middleware';

describe('SessionTTLAbsoluteMiddleware', () => {
  it('should be defined', () => {
    expect(new SessionTTLAbsoluteMiddleware()).toBeDefined();
  });
});

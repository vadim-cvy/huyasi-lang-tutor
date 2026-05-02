import { ExpressSessionWrapperMiddleware } from './express-session-wrapper.middleware';

describe('ExpressSessionWrapperMiddleware', () => {
  it('should be defined', () => {
    expect(new ExpressSessionWrapperMiddleware()).toBeDefined();
  });
});

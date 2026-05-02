import type { Request } from 'express';

import type { AppContext } from './app-context.type';

export const getRequestAppContext = (req: Request): AppContext => {
  const host = req.get('x-forwarded-host') ?? req.get('host') ?? '';

  switch (host) {
    case 'huyasi-tutor.com':
      return 'public';
    case 'admin.huyasi-tutor.com':
      return 'admin';
    default:
      throw new Error(`Unknown host: ${host}`);
  }
};

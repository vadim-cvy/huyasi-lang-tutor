import type { Request } from 'express';

export type RequestSession = Request['session'] &
  Partial<{
    oidc: Partial<{
      state: string;
      tokens: { access: string; refresh: string; id: string };
    }>;
  }>;

import type { Request } from 'express';

export type RequestSession = Request['session'] & Partial<{ oidcState: string }>;

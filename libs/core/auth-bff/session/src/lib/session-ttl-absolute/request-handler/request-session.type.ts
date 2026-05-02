import type { Request } from 'express';

export type RequestSession = Request['session'] & Partial<{ absoluteExpireAtMs: number }>;

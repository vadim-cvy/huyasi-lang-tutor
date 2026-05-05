import type z from 'zod';

import type { appTypeContextIdPayloadSchema } from './app-type-context-id-payload.schema';

export type AppTypeContextIdPayload = z.infer<typeof appTypeContextIdPayloadSchema>;

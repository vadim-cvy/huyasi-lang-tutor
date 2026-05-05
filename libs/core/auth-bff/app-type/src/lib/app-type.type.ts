import type z from 'zod';

import type { appTypeSchema } from './app-type.schema';

export type AppType = z.infer<typeof appTypeSchema>;

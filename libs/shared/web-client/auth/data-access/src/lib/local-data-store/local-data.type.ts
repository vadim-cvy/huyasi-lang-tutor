import type z from 'zod';

import type { sharedAuthLocalDataSchema } from './local-data.schema';

export type SharedAuthLocalData = z.infer<typeof sharedAuthLocalDataSchema>;

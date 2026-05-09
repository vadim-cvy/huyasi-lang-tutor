import z from 'zod';

import { appTypeSchema } from '../../app-type.schema';

export const appTypeContextIdPayloadSchema = z.object({
  appType: appTypeSchema,
});

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { appTypeConfigSchema } from '@huyasi/core-auth-bff-app-type';
import { sessionConfigSchema } from '@huyasi/core-auth-bff-session';
import * as yaml from 'js-yaml';
import z from 'zod';

export const loadConfig = (): z.infer<typeof configSchema> => {
  const configPath = join(__dirname, 'config', 'config.yaml');

  const configRaw = yaml.load(readFileSync(configPath, 'utf8'));

  // Merge libs config schemas into one schema
  const configSchema = z.strictObject({
    ...appTypeConfigSchema.shape,
    ...sessionConfigSchema.shape,
  });

  return configSchema.parse(configRaw);
};

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { sessionConfigSchema } from '@huyasi/core-auth-bff-session';
import * as yaml from 'js-yaml';
import type z from 'zod';

export const loadConfig = (): z.infer<typeof configSchema> => {
  const configPath = join(__dirname, 'config', 'config.yaml');

  const configRaw = yaml.load(readFileSync(configPath, 'utf8'));

  // FIXME: merge with other config schemas
  const configSchema = sessionConfigSchema;

  return configSchema.parse(configRaw);
};

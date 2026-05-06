import z from 'zod';

const cookieSignIdSecretMinLength = 64;
const cookieSignIdSecretSchema = z.string().min(cookieSignIdSecretMinLength);

const ttlSchema = z.number().int().positive();

const ttlForAppTypesSchema = z.strictObject({
  public: ttlSchema,
  admin: ttlSchema,
});

export const sessionConfigSchema = z.strictObject({
  session: z.strictObject({
    storage: z.strictObject({
      redisUrl: z.url(),
    }),
    cookie: z.strictObject({
      signIdSecrets: z.array(cookieSignIdSecretSchema).min(1),
    }),
    ttl: z.strictObject({
      idleMs: ttlForAppTypesSchema,
      absoluteMs: ttlForAppTypesSchema,
    }),
  }),
});

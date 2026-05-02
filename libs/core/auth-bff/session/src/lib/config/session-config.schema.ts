import z from 'zod';

const cookieSignIdSecretMinLength = 64;
const cookieSignIdSecretSchema = z.string().min(cookieSignIdSecretMinLength);

const ttlItemSchema = z.strictObject({
  public: z.number().int().positive(),
  admin: z.number().int().positive(),
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
      idleMs: ttlItemSchema,
      absoluteMs: ttlItemSchema,
    }),
  }),
});

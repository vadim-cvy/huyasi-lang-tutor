import z, { type ZodType } from 'zod';

// FIXME: move it to app type lib and use it everywhere
const createAppTypesObjectSchema = <T extends ZodType>(valSchema: T) =>
  z.strictObject({
    public: valSchema,
    admin: valSchema,
  });

export const openidConnectConfigSchema = z.strictObject({
  openidConnect: z.strictObject({
    authServer: z.strictObject({
      url: z.url({ protocol: /^https$/ }).transform((val) => new URL(val)),
      clientId: createAppTypesObjectSchema(z.string()),
      clientSecret: createAppTypesObjectSchema(z.string()),
    }),
  }),
});

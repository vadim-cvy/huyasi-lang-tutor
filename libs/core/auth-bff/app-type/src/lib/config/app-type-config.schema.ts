import z from 'zod';

const urlSchema = z.url().transform((val) => new URL(val));

export const appTypeConfigSchema = z.strictObject({
  appType: z.strictObject({
    // FIXME: convert to appBaseUrl: forEachAppType(urlSchema)
    appBaseUrl: z.strictObject({
      public: urlSchema,
      admin: urlSchema,
    }),
  }),
});

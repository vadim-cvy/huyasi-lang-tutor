import z from 'zod';

export const sharedAuthLocalDataSchema = z.object({
  isLoggedIn: z.boolean(),
});

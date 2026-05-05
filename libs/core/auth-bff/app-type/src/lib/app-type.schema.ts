import z from 'zod';

export const appTypeSchema = z.enum(['public', 'admin']);

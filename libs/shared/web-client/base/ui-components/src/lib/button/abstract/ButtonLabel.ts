import type { RequireAtLeastOne } from 'type-fest';

export type ButtonLabel = RequireAtLeastOne<
  {
    aria?: string;
    content?: string;
  },
  'aria' | 'content'
>;

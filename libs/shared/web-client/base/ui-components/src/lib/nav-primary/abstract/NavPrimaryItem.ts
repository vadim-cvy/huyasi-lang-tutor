import type { IconDefinition } from '@fortawesome/angular-fontawesome';
import type { ReadonlyDeep } from 'type-fest';

export type NavPrimaryItem = ReadonlyDeep<{
  label: string;
  route: string;
  iconDefinition: IconDefinition;
}>;

import type { IconDefinition } from '@fortawesome/angular-fontawesome';
import type { ReadonlyDeep } from 'type-fest';

export type ButtonIcon = ReadonlyDeep<{
  definition: IconDefinition;
  position: 'left' | 'right' | 'top';
}>;

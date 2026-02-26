import type { ReadonlyDeep } from 'type-fest';

export type LogoTitleContent = ReadonlyDeep<{
  logoSrc: string;
  text: {
    line1: string;
    line2: string;
  };
}>;

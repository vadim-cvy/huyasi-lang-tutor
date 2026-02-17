import { Component, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonContentAlign } from './abstract/ButtonContentAlign';
import { ButtonWidth } from './abstract/ButtonWidth';
import { ButtonIconPosition } from './abstract/ButtonIconPosition';
import {
  FontSize,
  WhitespaceSize,
  WhitespaceSizeEnum,
  WhitespaceStability,
} from '@huyasi/shared-web-client-base-ui-design';
import { ButtonBg } from './abstract/ButtonBg';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'shared-base-button',
  imports: [RouterLink, RouterLinkActive, Icon, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public readonly link = input<{
    url: string;
    isRouterLinkActiveSync?: boolean;
  }>();

  public readonly icon = input<
    Readonly<{
      name: string;
      position: ButtonIconPosition;
    }>
  >();

  public readonly bg = input<ButtonBg>('transparent');

  public readonly width = input<ButtonWidth>('fitContent');

  public readonly contentAlign = input<ButtonContentAlign>('center');

  public readonly paddingStability = input<WhitespaceStability>('responsive');

  public readonly paddingX = input<WhitespaceSize | undefined>();
  public readonly paddingY = input<WhitespaceSize | undefined>();

  public readonly paddingXFinal = computed<WhitespaceSize>(
    (): WhitespaceSize => {
      const paddingXCustom = this.paddingX();

      if (paddingXCustom) {
        return paddingXCustom;
      }

      const paddingYCustom = this.paddingY();

      if (paddingYCustom) {
        const whitespace1LvlHigherThanPaddingYCustom: WhitespaceSize | undefined =
          WhitespaceSizeEnum[WhitespaceSizeEnum[paddingYCustom] + 1] as
            | WhitespaceSize
            | undefined;

        return whitespace1LvlHigherThanPaddingYCustom
          ? whitespace1LvlHigherThanPaddingYCustom
          : paddingYCustom;
      }

      return 'lg';
    },
  );

  public readonly paddingYFinal = computed<WhitespaceSize>(
    (): WhitespaceSize => {
      const paddingYCustom = this.paddingY();

      if (paddingYCustom) {
        return paddingYCustom;
      }

      const paddingXFinal = this.paddingXFinal();

      const whitespace1LvlLowerThanPaddingXFinal: WhitespaceSize | undefined =
        WhitespaceSizeEnum[WhitespaceSizeEnum[paddingXFinal] - 1] as
          | WhitespaceSize
          | undefined;

      return whitespace1LvlLowerThanPaddingXFinal
        ? whitespace1LvlLowerThanPaddingXFinal
        : paddingXFinal;
    },
  );

  public readonly fontSize = input<FontSize>();

  public readonly fontSizeFinal = computed<FontSize>((): FontSize => {
    const fontSizeCustom = this.fontSize();

    return fontSizeCustom || this.paddingYFinal();
  });

  public readonly marginY = computed<WhitespaceSize>(() => {
    const whitespace3LvlHigherThanPaddingY: WhitespaceSize | undefined =
      WhitespaceSizeEnum[WhitespaceSizeEnum[this.paddingYFinal()] + 3] as
        | WhitespaceSize
        | undefined;

    return whitespace3LvlHigherThanPaddingY
      ? whitespace3LvlHigherThanPaddingY
      : '2xl';
  })

  public readonly cssClasses = computed<string[]>(() => {
    const
      bg = this.bg(),
      width = this.width(),
      contentAlign = this.contentAlign(),
      icon = this.icon(),
      marginY = this.marginY(),
      paddingXFinal = this.paddingXFinal(),
      paddingYFinal = this.paddingYFinal(),
      fontSizeFinal = this.fontSizeFinal();

    return [
      'button',
      `--bg-${bg}`,
      `--has-overlay-before`,
      `--width-${width}`,
      `--content-align-${contentAlign}`,
      (icon ? `--icon-position-${icon?.position}` : ''),
      `--g-${icon?.position === 'top' ? 'xs' : 'md'}-responsive`,
      `--my-${marginY}-responsive`,
      `--px-${paddingXFinal}-responsive`,
      `--py-${paddingYFinal}-responsive`,
      `--text-size-${fontSizeFinal}-responsive`,
    ];
  });
}

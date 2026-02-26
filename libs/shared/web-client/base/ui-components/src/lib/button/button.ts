import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { IconDefinition } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import type { FontSize, WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';
import { whitespaceUtils } from '@huyasi/shared-web-client-base-ui-design';

import type { ButtonBg } from './abstract/ButtonBg';
import type { ButtonContentAlign } from './abstract/ButtonContentAlign';
import type { ButtonIconPosition } from './abstract/ButtonIconPosition';
import type { ButtonWidth } from './abstract/ButtonWidth';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-button',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, NgTemplateOutlet],
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
      definition: IconDefinition;
      position: ButtonIconPosition;
    }>
  >();

  public readonly bg = input<ButtonBg>('transparent');

  public readonly width = input<ButtonWidth>('fitContent');

  public readonly contentAlign = input<ButtonContentAlign>('center');

  public readonly paddingX = input<WhitespaceSize | undefined>();
  public readonly paddingY = input<WhitespaceSize | undefined>();

  private readonly paddingXFinal = computed<WhitespaceSize>((): WhitespaceSize => {
    const paddingXCustom = this.paddingX();

    if (paddingXCustom) {
      return paddingXCustom;
    }

    const paddingYCustom = this.paddingY();

    if (paddingYCustom) {
      return whitespaceUtils.getSizeGreaterOrMax(paddingYCustom, 1);
    }

    return 'lg';
  });

  private readonly paddingYFinal = computed<WhitespaceSize>((): WhitespaceSize => {
    const paddingYCustom = this.paddingY();

    if (paddingYCustom) {
      return paddingYCustom;
    }

    const paddingXFinal = this.paddingXFinal();

    return whitespaceUtils.getSizeLessOrMin(paddingXFinal, 1);
  });

  public readonly fontSize = input<FontSize>();

  private readonly fontSizeFinal = computed<FontSize>((): FontSize => {
    const fontSizeCustom = this.fontSize();

    return fontSizeCustom || this.paddingYFinal();
  });

  private readonly marginY = computed<WhitespaceSize>(() => {
    const stepsBack = 3;

    return whitespaceUtils.getSizeLessOrMin(this.paddingYFinal(), stepsBack);
  });

  public readonly cssClasses = computed<string[]>(() => {
    const bg = this.bg(),
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
      icon ? `--icon-position-${icon.position}` : '',
      `--g-${icon?.position === 'top' ? 'xs' : 'md'}-responsive`,
      `--my-${marginY}-responsive`,
      `--px-${paddingXFinal}-responsive`,
      `--py-${paddingYFinal}-responsive`,
      `--text-size-${fontSizeFinal}-responsive`,
    ];
  });
}

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { IconDefinition } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import type { FontSize, WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';
import { whitespaceUtils } from '@huyasi/shared-web-client-base-ui-design';
import type { ReadonlyDeep } from 'type-fest';

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
    ReadonlyDeep<{
      definition: IconDefinition;
      position: ButtonIconPosition;
    }>
  >();

  public readonly bg = input<ButtonBg>('transparent');

  public readonly width = input<ButtonWidth>('fitContent');

  public readonly contentAlign = input<ButtonContentAlign>('center');

  public readonly paddingX = input<WhitespaceSize | undefined>();
  public readonly paddingY = input<WhitespaceSize | undefined>();

  private readonly paddingXDefault = computed<WhitespaceSize>((): WhitespaceSize => {
    const paddingYInput = this.paddingY();
    if (paddingYInput) {
      return whitespaceUtils.getSizeGreaterOrMax(paddingYInput, 1);
    }

    return 'lg';
  });

  private readonly paddingXFinal = computed<WhitespaceSize>(
    () => this.paddingX() || this.paddingXDefault(),
  );

  private readonly paddingYDefault = computed<WhitespaceSize>((): WhitespaceSize => {
    const paddingXFinal = this.paddingXFinal();

    return whitespaceUtils.getSizeLessOrMin(paddingXFinal, 1);
  });

  private readonly paddingYFinal = computed<WhitespaceSize>(
    () => this.paddingY() || this.paddingYDefault(),
  );

  public readonly fontSize = input<FontSize>();

  private readonly fontSizeDefault = computed<FontSize>(() => this.paddingYFinal());

  private readonly fontSizeFinal = computed<FontSize>(
    () => this.fontSize() || this.fontSizeDefault(),
  );

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
      `--gap-${icon?.position === 'top' ? 'xs' : 'md'}-responsive`,
      `--margin-y-${marginY}-responsive`,
      `--padding-x-${paddingXFinal}-responsive`,
      `--padding-y-${paddingYFinal}-responsive`,
      `--text-size-${fontSizeFinal}-responsive`,
    ];
  });
}

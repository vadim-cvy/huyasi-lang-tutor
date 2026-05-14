import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import type { FontSize, WhitespaceSize } from '@huyasi/shared-web-client-base-ui-design';
import {
  fontSizesNavigator,
  whitespaceSizesNavigator,
} from '@huyasi/shared-web-client-base-ui-design';

import type { ButtonBg } from './abstract/ButtonBg';
import type { ButtonContentAlign } from './abstract/ButtonContentAlign';
import type { ButtonIcon } from './abstract/ButtonIcon';
import type { ButtonLabel } from './abstract/ButtonLabel';
import type { ButtonLink } from './abstract/ButtonLink';
import type { ButtonPaddingStrategy } from './abstract/ButtonPaddingStrategy';
import type { ButtonSize } from './abstract/ButtonSize';
import type { ButtonState } from './abstract/ButtonState';
import type { ButtonWidth } from './abstract/ButtonWidth';

// FIXME: if button has no content, but only aria label - we should show arialabel content as a tooltip so user can see button functionality description on hover
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-base-button',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public readonly link = input<ButtonLink>();

  public readonly linkNormalized = computed<ButtonLink | undefined>(() => {
    const link = this.link();

    if (!link) {
      return undefined;
    }

    const urlAbsolute = link.url.startsWith('/') ? link.url : `/${link.url}`;

    return { ...link, url: urlAbsolute };
  });

  public readonly icon = input<ButtonIcon>();

  public readonly iconFinal = computed<ButtonIcon | undefined>(() => {
    const commonStateIcon = this.icon();

    if (this.isLoading()) {
      return {
        definition: faCircleNotch,
        position: commonStateIcon?.position ?? 'right',
      };
    }

    return commonStateIcon;
  });

  public readonly label = input.required<ButtonLabel>();

  public readonly ariaLabel = computed<string | undefined>(() => this.label().aria);

  public readonly contentLabel = computed<string | undefined>(() => this.label().content);

  public readonly contentAlign = input<ButtonContentAlign>('center');

  public readonly bg = input<ButtonBg>('transparent');

  public readonly width = input<ButtonWidth>('fitContent');

  /**
   * Makes button more compact.
   */
  public readonly isDense = input<boolean>(false);

  /**
   * Controls button size by affecting font size, padding, etc.
   */
  public readonly size = input<ButtonSize>('md');

  public readonly isRounded = input<boolean>(false);

  /**
   * Base font size for button elements which don't have their own font sizes defined.
   */
  public readonly baseFontSize = computed<FontSize>(() => this.size());

  public readonly iconFontSize = computed<FontSize>((): FontSize => {
    const labelFontSize = this.baseFontSize();

    const stepsForward = 2;

    return fontSizesNavigator.getSizeGreaterOrMax(labelFontSize, stepsForward);
  });

  /**
   * Controls how paddingX and paddingY relate to each other.
   *
   * Rectangle: paddingY is smaller than paddingX.
   * Square: paddingY is equal to paddingX.
   */
  public readonly paddingStrategy = input<ButtonPaddingStrategy>('rectangle');

  private readonly paddingX = computed<WhitespaceSize>((): WhitespaceSize => {
    const defaultNonDense: WhitespaceSize = 'lg';

    if (this.isDense()) {
      const stepsBack = 2;

      return whitespaceSizesNavigator.getSizeLessOrMin(defaultNonDense, stepsBack);
    }

    return defaultNonDense;
  });

  private readonly paddingY = computed<WhitespaceSize>((): WhitespaceSize => {
    const paddingX = this.paddingX();

    switch (this.paddingStrategy()) {
      case 'rectangle':
        return whitespaceSizesNavigator.getSizeLessOrMin(paddingX, 1);
      case 'square':
        return paddingX;
      default:
        // Shutup eslint
        throw new Error('Must never happen.');
    }
  });

  private readonly marginY = computed<WhitespaceSize>(() => this.size());

  public readonly isLoading = input(false);

  public readonly isDisabled = input(false);

  public readonly state = computed<ButtonState>(() => {
    if (this.isDisabled()) {
      return 'disabled';
    }

    if (this.isLoading()) {
      return 'loading';
    }

    return 'active';
  });

  public readonly buttonClick = output();

  public readonly cssClasses = computed<string[]>(() => {
    const bg = this.bg(),
      width = this.width(),
      contentAlign = this.contentAlign(),
      iconFinal = this.iconFinal(),
      paddingX = this.paddingX(),
      paddingY = this.paddingY(),
      marginY = this.marginY(),
      baseFontSize = this.baseFontSize(),
      isRounded = this.isRounded(),
      state = this.state();

    return [
      'button',
      `--bg-${bg}`,
      `--width-${width}`,
      `--content-align-${contentAlign}`,
      iconFinal ? `--icon-position-${iconFinal.position}` : '',
      `--gap-${iconFinal?.position === 'top' ? 'xs' : 'md'}-responsive`,
      `--padding-x-${paddingX}-responsive`,
      `--padding-y-${paddingY}-responsive`,
      `--margin-y-${marginY}-responsive`,
      `--text-size-${baseFontSize}-responsive`,
      isRounded ? '--border-radius' : '',
      `--state-${state}`,
      state === 'active' ? `--has-overlay-before` : '',
    ];
  });

  public onButtonClick(): void {
    if (this.isDisabled() || this.isLoading()) {
      return;
    }

    this.buttonClick.emit();
  }
}

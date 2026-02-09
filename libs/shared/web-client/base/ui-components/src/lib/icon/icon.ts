import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-base-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  public readonly name = input.required<string>();
}

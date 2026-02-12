import { Component, OnInit, signal } from '@angular/core';
import { Button } from "../button";

@Component({
  selector: 'shared-base-content-404',
  imports: [Button],
  templateUrl: './content-404.html',
  styleUrl: './content-404.scss',
})
export class Content404 implements OnInit {
  public readonly buttonData = signal<{
    url: string;
    label: string
  }|null>(null)

  public ngOnInit(): void {
    this.setupButton();
  }

  private setupButton(): void {
    // TODO: change url to prev page (if user has some other pages in the history) + change label to "back"
    this.buttonData.set({url: '/', label: 'Back to Home'})
  }
}

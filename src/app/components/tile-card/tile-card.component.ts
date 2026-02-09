import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

export type Accent = 'mint' | 'peach' | 'sky';

@Component({
  selector: 'app-tile-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tile-card.component.html'
})
export class TileCardComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
  @Input() img?: string;
  @Input() accent: Accent = 'sky';
  @Input() badge?: number | string;

  @Output() cardClick = new EventEmitter<void>();

  accentClass() {
    if (this.accent === 'mint') return 'bg-mint-100 text-mint-500';
    if (this.accent === 'peach') return 'bg-peach-100 text-peach-500';
    return 'bg-sky-100 text-sky-500';
  }

  click() {
    this.cardClick.emit();
  }
}

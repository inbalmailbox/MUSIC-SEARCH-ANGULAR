import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SearchStore } from '../../store/search.store';
import { TileCardComponent } from '../tile-card/tile-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgIf, NgFor, TileCardComponent],
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent {
  constructor(public store: SearchStore) {}

  accent(i: number) {
    return i % 3 === 0 ? 'sky' : i % 3 === 1 ? 'peach' : 'mint';
  }

  select(i: number) {
    const t = this.store.results()[i];
    if (t) {
      this.store.setSelected(t);
      setTimeout(() => {
          if (window.matchMedia('(max-width: 768px)').matches) {
            document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 0);

  }
}

  next() {
    this.store.nextPage();
  }
}

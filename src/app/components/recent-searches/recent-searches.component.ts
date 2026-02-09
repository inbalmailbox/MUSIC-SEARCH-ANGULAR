import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SearchStore } from '../../store/search.store';

@Component({
  selector: 'app-recent-searches',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './recent-searches.component.html'
})
export class RecentSearchesComponent {
  constructor(public store: SearchStore) {}

  run(term: string) {
    const q = term.trim();
    if (!q) return;
    this.store.setQuery(q);
    this.store.clearResults();
    this.store.search(q, 0);
  }
}

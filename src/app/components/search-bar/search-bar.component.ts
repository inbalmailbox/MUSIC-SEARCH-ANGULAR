import { Component, computed } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchStore } from '../../store/search.store';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form (submit)="submit($event)" class="flex items-center gap-3">
      <div class="relative flex-1">
        <input
          [formControl]="control"
          placeholder="Search Mixcloud…"
          class="app-input h-10 w-full px-4"
          aria-label="Search query"
        />
      </div>

      <button
        type="submit"
        class="btn-brand h-10"
        [disabled]="isLoading()"
      >
        Search
      </button>
    </form>
  `
})
export class SearchBarComponent {
  readonly control = new FormControl<string>('', { nonNullable: true });
  readonly isLoading = computed(() => this.store.status() === 'loading');

  constructor(private store: SearchStore) {}

  submit(e: Event) {
    e.preventDefault(); // חשוב כדי שלא יעשה refresh לדף
    const q = this.control.value.trim();
    if (!q) return;

    this.store.search(q, 0);
    this.store.addRecent(q);
  }
}

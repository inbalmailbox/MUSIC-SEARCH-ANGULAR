import { Injectable, computed, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { MixcloudApiService, Track } from '../core/mixcloud-api.service';

type Status = 'idle' | 'loading' | 'failed';

@Injectable({ providedIn: 'root' })
export class SearchStore {
  private readonly _query = signal('');
  private readonly _offset = signal(0);
  private readonly _results = signal<Track[]>([]);
  private readonly _status = signal<Status>('idle');
  private readonly _error = signal<string | null>(null);
  private readonly _recent = signal<string[]>([]);
  private readonly _selected = signal<Track | null>(null);

  private active?: Subscription;

  readonly query = this._query.asReadonly();
  readonly offset = this._offset.asReadonly();
  readonly results = this._results.asReadonly();
  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();
  readonly recent = this._recent.asReadonly();
  readonly selected = this._selected.asReadonly();

  readonly canPage = computed(() => {
    return !!this.query().trim() && this.results().length > 0 && this.status() !== 'loading';
  });

  constructor(private api: MixcloudApiService) {}

  init() {
    this.loadRecent();
  }

  setQuery(q: string) {
    this._query.set(q);
  }

  clearResults() {
    this._results.set([]);
    this._offset.set(0);
    this._selected.set(null);
    this._error.set(null);
  }

  setSelected(t: Track | null) {
    this._selected.set(t);
  }

  addRecent(term: string) {
    const q = term.trim();
    if (!q) return;
    const next = [q, ...this._recent().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 5);
    this._recent.set(next);
    localStorage.setItem('recentSearches', JSON.stringify(next));
  }

  loadRecent() {
    const saved = localStorage.getItem('recentSearches');
    if (!saved) return;
    try {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr)) this._recent.set(arr.filter((x) => typeof x === 'string').slice(0, 5));
    } catch {}
  }

  search(query: string, offset = 0) {
    const q = query.trim();
    if (!q) return;

    this.active?.unsubscribe();
    this._status.set('loading');
    this._error.set(null);

    this.active = this.api.searchCloudcasts(q, offset, 6).subscribe({
      next: (items) => {
        this._query.set(q);
        this._offset.set(offset);
        this._results.set(items);
        this._status.set('idle');
      },
      error: (err) => {
        this._status.set('failed');
        const msg =
          typeof err?.message === 'string'
            ? err.message
            : 'Request failed. Check Network tab for details.';
        this._error.set(msg);
      }
    });
  }

  nextPage() {
    const q = this._query().trim();
    if (!q) return;
    const nextOffset = this._offset() + 6;
    this.search(q, nextOffset);
  }
}

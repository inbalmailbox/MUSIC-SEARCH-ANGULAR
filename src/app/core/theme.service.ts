import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark());
  root.classList.toggle('dark', isDark);
  document.body.classList.toggle('bg-slate-50', !isDark);
  document.body.classList.toggle('bg-slate-900', isDark);
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>('system');
  private media?: MediaQueryList;
  private handler?: () => void;

  init() {
    const t = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';
    this.theme.set(t);
    applyTheme(t);

    this.media = window.matchMedia('(prefers-color-scheme: dark)');
    this.handler = () => applyTheme(this.theme());
    this.media.addEventListener('change', this.handler);
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  toggleLightDark() {
    const current = this.theme();
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  destroy() {
    if (this.media && this.handler) this.media.removeEventListener('change', this.handler);
  }
}

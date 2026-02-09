import { Component, computed } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html'
})
export class ThemeToggleComponent {
  readonly isDark = computed(() => this.theme.theme() === 'dark');
  readonly label = computed(() => (this.isDark() ? 'Dark' : 'Light'));

  constructor(public theme: ThemeService) {}

  toggle() {
    this.theme.toggleLightDark();
  }
}

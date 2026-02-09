import { Component } from '@angular/core';
import { TopStatusComponent } from '../top-status/top-status.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { PlayerComponent } from '../player/player.component';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
import { RecentSearchesComponent } from '../recent-searches/recent-searches.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    TopStatusComponent,
    ThemeToggleComponent,
    PlayerComponent,
    SearchPanelComponent,
    RecentSearchesComponent
  ],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}

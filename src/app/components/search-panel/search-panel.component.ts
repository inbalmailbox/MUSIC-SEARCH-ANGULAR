import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [SearchBarComponent, SearchResultsComponent],
  templateUrl: './search-panel.component.html'
})
export class SearchPanelComponent {}

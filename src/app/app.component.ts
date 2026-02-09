import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ThemeService } from './core/theme.service';
import { SearchStore } from './store/search.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: '<app-layout />'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private theme: ThemeService, private store: SearchStore) {}

  ngOnInit() {
    this.theme.init();
    this.store.init();
  }

  ngOnDestroy() {
    this.theme.destroy();
  }
}

import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SearchStore } from '../../store/search.store';

@Component({
  selector: 'app-top-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './top-status.component.html'
})
export class TopStatusComponent {
  readonly repoUrl = '';

  constructor(public store: SearchStore) {}
}

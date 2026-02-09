import { Component, computed, effect, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SearchStore } from '../../store/search.store';
import { Track } from '../../core/mixcloud-api.service';

function makeMixcloudFeed(t?: Track | null) {
  if (!t) return '';
  const href =
    (t.url && (t.url.startsWith('http') ? t.url : `https://www.mixcloud.com${t.url}`)) ||
    (t.key ? `https://www.mixcloud.com${t.key}` : '');
  return href
    ? `https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(href)}&hide_cover=1&light=1`
    : '';
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [NgIf],
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  readonly isLoading = signal(false);

  readonly selected = computed(() => this.store.selected());
  private readonly rawFeed = computed(() => makeMixcloudFeed(this.selected()));
  readonly feedSrc = computed<SafeResourceUrl | null>(() => {
    const src = this.rawFeed();
    return src ? this.sanitizer.bypassSecurityTrustResourceUrl(src) : null;
  });
  
constructor(public store: SearchStore, private sanitizer: DomSanitizer) {
  effect(
    () => {
      this.isLoading.set(!!this.rawFeed());
    },
    { allowSignalWrites: true }
  );
}


  iframeLoaded() {
    this.isLoading.set(false);
  }
}

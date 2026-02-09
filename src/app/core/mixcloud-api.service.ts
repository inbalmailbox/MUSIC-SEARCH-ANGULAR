import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface Track {
  name: string;
  url?: string;
  key?: string;
  pictures?: {
    medium?: string;
    large?: string;
    extra_large?: string;
  };
  user: {
    name: string;
    url: string;
  };
}

type MixcloudResponse = {
  data?: any[];
};

@Injectable({ providedIn: 'root' })
export class MixcloudApiService {
  private readonly baseUrl = 'https://api.mixcloud.com/search/';

  constructor(private http: HttpClient) {}

  searchCloudcasts(query: string, offset = 0, limit = 6): Observable<Track[]> {
    const q = query.trim();
    if (!q) return of([] as Track[]);

    const url = `${this.baseUrl}?q=${encodeURIComponent(q)}&type=cloudcast&limit=${limit}&offset=${offset}`;
    return this.http.get<MixcloudResponse>(url).pipe(
      map((res) => {
        const items = Array.isArray(res?.data) ? res.data : [];
        return items.map((item: any) => {
          const pics = item?.pictures ?? {};
          return {
            name: item?.name ?? 'Untitled',
            url: item?.url || undefined,
            key: item?.key || undefined,
            pictures: {
              medium: pics?.medium,
              large: pics?.large,
              extra_large: pics?.extra_large
            },
            user: {
              name: item?.user?.name ?? 'Unknown',
              url: item?.user?.url ?? ''
            }
          } as Track;
        });
      })
    );
  }
}

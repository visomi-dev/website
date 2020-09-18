import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../environments/environment';

const MIN_SIZE = 1;
const MAX_SIZE = 2;

const MIN_ITEMS = 0.0001;
const MAX_ITEMS = 0.00025;

const DEFAULT_WIDTH = 1360;
const DEFAULT_HEIGHT = 768;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isBrowser: boolean;
  width = DEFAULT_WIDTH;
  height = DEFAULT_HEIGHT;

  get size(): number {
    return this.width * this.height;
  }

  get query(): string[] {
    return [
    `width=${this.width}`,
    `height=${this.height}`,

    `minItemSize=${MIN_SIZE}`,
    `maxItemSize=${MAX_SIZE}`,

    `minItems=${Math.round(this.size * MIN_ITEMS)}`,
    `maxItems=${Math.round(this.size * MAX_ITEMS)}`,

    'colors=white',
    ];
  }

  public get background(): string {
    return `url(${environment.apiUrl}/api/background?${this.query.join('&')})`;
  }

  onResize(event: Event): void {
    this.width = (event.target as Window).innerWidth;
    this.height = (event.target as Window).innerHeight;
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      window.addEventListener('resize', this.onResize);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.onResize);
    }
  }
}

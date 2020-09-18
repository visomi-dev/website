import { Component } from '@angular/core';

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
export class AppComponent {
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
}

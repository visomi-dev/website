import {
  ref,
  computed,
} from 'vue';

import environment from '../environment';

const MIN_ITEM_SIZE = 1;
const MAX_ITEM_SIZE = 2;

const MIN_ITEMS = 0.0001;
const MAX_ITEMS = 0.00025;

const backgroundWidth = ref(import.meta.env.SSR ? 0 : window.innerWidth);
const backgroundHeight = ref(import.meta.env.SSR ? 0 : window.innerHeight);

const backgroundSize = computed(() => backgroundWidth.value * backgroundHeight.value);

const backgroundQueryParams = computed(() => ([
  `width=${backgroundWidth.value}`,
  `height=${backgroundHeight.value}`,
  `minItemSize=${MIN_ITEM_SIZE}`,
  `maxItemSize=${MAX_ITEM_SIZE}`,
  `minItems=${Math.round(backgroundSize.value * MIN_ITEMS)}`,
  `maxItems=${Math.round(backgroundSize.value * MAX_ITEMS)}`,
  'colors=white',
].join('&')));

export const backgroundStyle = computed(() => (
  `background: url(${environment.serverUrl}/background.svg?${backgroundQueryParams.value})`
));

export function onResize(event: Event): void {
  backgroundWidth.value = (event.target as Window).innerWidth;
  backgroundHeight.value = (event.target as Window).innerHeight;
}

<template>
  <app-navbar/>
  <router-view/>
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeUnmount, ref, watchEffect,
} from 'vue';

import environment from './environment';
import AppNavbar from './components/AppNavbar.vue';

const MIN_SIZE = 1;
const MAX_SIZE = 2;

const MIN_ITEMS = 0.0001;
const MAX_ITEMS = 0.00025;

const DEFAULT_WIDTH = 1360;
const DEFAULT_HEIGHT = 768;

export default defineComponent({
  name: 'App',
  components: {
    AppNavbar,
  },
  setup() {
    const backgroundWidth = ref(DEFAULT_WIDTH);
    const backgroundHeight = ref(DEFAULT_HEIGHT);

    const backgroundSize = computed(() => backgroundWidth.value * backgroundHeight.value);

    const backgroundQueryParams = computed(() => ([
      `width=${backgroundWidth.value}`,
      `height=${backgroundHeight.value}`,
      `minItemSize=${MIN_SIZE}`,
      `maxItemSize=${MAX_SIZE}`,
      `minItems=${Math.round(backgroundSize.value * MIN_ITEMS)}`,
      `maxItems=${Math.round(backgroundSize.value * MAX_ITEMS)}`,
      'colors=white',
    ]));

    const backgroundStyle = computed(() => (
      `background: url(${environment.apiUrl}/background?${backgroundQueryParams.value.join('&')})`
    ));

    function onResize(event: Event): void {
      backgroundWidth.value = (event.target as Window).innerWidth;
      backgroundHeight.value = (event.target as Window).innerHeight;
    }

    window.addEventListener('resize', onResize);

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    watchEffect(() => {
      document.getElementById('app')?.setAttribute('style', backgroundStyle.value);
    });
  },
});
</script>

<style lang="scss">
:root {
  --color-midnight-express: #010018;

  --body-background: var(--color-midnight-express);
  --body-overflow-y: auto;
  --body-margin: 0;

  --navbar-height: 5rem;
  --navbar-z: 25;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;

  background: var(--body-background);
  overflow-y: var(--body-overflow-y);
  margin: var(--body-margin);
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>

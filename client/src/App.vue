<script name="App" lang="ts" setup>
import { onBeforeUnmount, watchEffect } from 'vue';

import AppNavbar from './components/AppNavbar.vue';
import { onResize, backgroundStyle } from './utils/background';

// @ts-ignore
if (!import.meta.env.SSR) {
  window.addEventListener('resize', onResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
  });

  watchEffect(() => {
    document.getElementById('app')?.setAttribute('style', backgroundStyle.value);
  });
}
</script>

<template>
  <app-navbar />
  <router-view />
</template>

<style lang="scss">
:root {
  --color-midnight-express: #010018;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;

  background: var(--color-midnight-express);
  overflow-y: auto;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;

  main {
    height: calc(100% - 6.5rem);
    width: 100%;
    padding-top: 6.5rem;
  }
}

.is-sr-only {
  border: none!important;
  clip: rect(0,0,0,0)!important;
  height: .01em!important;
  overflow: hidden!important;
  padding: 0!important;
  position: absolute!important;
  white-space: nowrap!important;
  width: .01em!important;
}
</style>

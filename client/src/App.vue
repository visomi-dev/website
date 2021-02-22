<script setup lang="ts">
import { onBeforeUnmount, watchEffect } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppNavbar from './components/AppNavbar.vue';
import { onResize, backgroundStyle } from './utils/background';

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
    height: calc(100% - 5.5rem);
    width: 100%;
    padding-top: 5.5rem;
  }
}
</style>

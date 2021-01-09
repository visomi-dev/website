<template>
  <app-navbar/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppNavbar from './components/AppNavbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppNavbar,
  },
});
</script>

<style lang="scss">
:root {
  --color-midnight-express: #010018;

  --body-background: var(--color-midnight-express);
  --body-overflow-y: auto;
  --body-margin: 0;
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

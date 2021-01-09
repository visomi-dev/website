<template>
  <nav
    class="navbar"
    aria-label="main navigation"
    role="navigation"
  >

  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>

<style lang="scss" scoped>
nav.navbar {
  position: relative;
  min-height: var(--navbar-height, 3.25rem);
  background: var(--navbar-background, none);
  z-index: var(--navbar-z, 25);
}

@media screen and (min-width: 1024px) {
  nav.navbar {
    padding: 0 2rem;
    min-height: var(--navbar-height, 3.25rem);
  }

  .navbar,
  .navbar-end,
  .navbar-menu,
  .navbar-start {
    align-items: stretch;
    display: flex;
  }
}
</style>

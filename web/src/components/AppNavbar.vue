<template>
  <nav
    class="navbar"
    aria-label="main navigation"
    role="navigation"
  >
    <a class="navbar-brand">
      <img
        src="../assets/visomi-icon.svg"
        alt="visomi.dev software architect"
        title="visomi.dev software architect"
      >
    </a>
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
  min-height: var(--navbar-height);
  background: var(--navbar-background);
  z-index: var(--navbar-z);

  .navbar-brand,
  .navbar-menu {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .navbar-brand img {
    height: 2.5rem;
    width: auto;
  }
}

@media screen and (min-width: 1024px) {
  nav.navbar {
    padding: 0 2rem;
    min-height: var(--navbar-height);
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

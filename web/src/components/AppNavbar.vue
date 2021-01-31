<template>
  <nav
    class="navbar"
    aria-label="main navigation"
    role="navigation"
  >
    <router-link class="brand" to="/">
      <img
        src="../assets/visomi-icon.svg"
        alt="visomi.dev software architect"
        title="visomi.dev software architect"
      >
    </router-link>

    <ul class="menu">
      <li>
        <router-link to="/">
          home
        </router-link>
      </li>

      <li>
        <router-link to="/">
          about
        </router-link>
      </li>

      <li>
        <router-link to="/">
          portfolio
        </router-link>
      </li>

      <li>
        <router-link to="/">
          contact
        </router-link>
      </li>
    </ul>
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
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 25;

  .brand {
    display: flex;
    align-items: center;
    padding: 1.5rem;
  }

  .brand img {
    height: 2.5rem;
    width: auto;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    width: 100%;
    bottom: 0;
    margin: 0;
    padding: 0;

    list-style: none;

    li {
      flex: 1;
      position: relative;
      text-align: center;
      padding: 1.5rem 0;

      a {
        text-decoration: none;
      }
    }
  }
}
</style>

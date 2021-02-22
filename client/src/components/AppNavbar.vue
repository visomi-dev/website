<script name="Navbar" setup lang="ts">
import AppIcon from './AppIcon.vue';
</script>

<template>
  <nav
    class="navbar"
    aria-label="main navigation"
    role="navigation"
  >
    <router-link
      class="brand"
      to="/"
    >
      <img
        src="../assets/visomi-icon.svg"
        alt="visomi.dev software architect"
        title="visomi.dev software architect"
      >
    </router-link>

    <ul class="menu">
      <li>
        <router-link to="/">
          <img
            class="icon"
            src="../assets/earth.svg"
            alt="to home page"
          >

          HOME
        </router-link>
      </li>

      <li>
        <router-link to="/about">
          <img
            class="icon"
            src="../assets/rocket.svg"
            alt="to about page"
          >

          ABOUT
        </router-link>
      </li>

      <li>
        <router-link to="/portfolio">
          <img
            class="icon"
            src="../assets/constellation.svg"
            alt="to portfolio page"
          >

          PORTFOLIO
        </router-link>
      </li>

      <li>
        <router-link to="/contact">
          <img
            class="icon"
            src="../assets/satellite.svg"
            alt="to contact page"
          >

          CONTACT
        </router-link>
      </li>
    </ul>
  </nav>
</template>

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
    background: var(--color-midnight-express);

    li {
      display: flex;
      position: relative;
      flex-direction: column;

      flex: 1;
      text-align: center;

      a {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 1rem .5rem;

        color: white;
        font-size: .75rem;

        text-decoration: none;

        img.icon {
          height: 3rem;
          width: 3rem;

          padding-bottom: .75rem;
        }
      }
    }
  }
}

@media screen and (min-width: 769px) {
  nav.navbar {
    justify-content: space-between;

    ul.menu {
      position: relative;
      width: inherit;
      bottom: inherit;

      width: auto;

      li {
        a {
          padding: 1rem 1.5rem;
        }
      }
    }
  }
}
</style>

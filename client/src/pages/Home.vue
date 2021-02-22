<script name="Home" lang="ts" setup>
import AppIcon from '../components/AppIcon.vue';
</script>

<template>
  <main class="home">
    <div class="visomi">
      <div class="thumbnail" />

      <div class="titles">
        <h1 class="title is-1">
          Michael Villalba Sotelo
        </h1>

        <h2 class="title is-2">
          Fullstack Developer
        </h2>
      </div>

      <div class="contact">
        <a
          target="_blank"
          href="tel:+(52)5587606759"
          rel="phone number of Michael +(52)5587606759"
        >
          <app-icon icon="phone" />

          <span class="is-sr-only">
            phone number of Michael +(52)5587606759
          </span>
        </a>

        <a
          target="_blank"
          href="mailto:visomi.dev@gmail.com"
          rel="email of Michael visomi.dev@gmail.com"
        >
          <app-icon icon="email" />

          <span class="is-sr-only">
            email of Michael visomi.dev@gmail.com
          </span>
        </a>

        <a
          target="_blank"
          class="linkedin"
          href="https://www.linkedin.com/in/visomi"
          rel="linkedin profile of Michael"
        >
          <app-icon icon="linkedin" />

          <span class="is-sr-only">
            linkedin profile of Michael
          </span>
        </a>

        <a
          target="_blank"
          class="twitter"
          href="https://twitter.com/visomiDev"
          rel="twitter profile of Michael"
        >
          <app-icon icon="twitter" />

          <span class="is-sr-only">
            twitter profile of Michael
          </span>
        </a>

        <a
          target="_blank"
          class="gitlab"
          href="https://gitlab.com/visomi.dev"
          rel="gitlab profile of Michael"
        >
          <app-icon icon="gitlab" />

          <span class="is-sr-only">
            gitlab profile of Michael
          </span>
        </a>

        <a
          target="_blank"
          href="https://github.com/visomiDev"
          rel="github profile of Michael"
        >
          <app-icon icon="github" />

          <span class="is-sr-only">
            github profile of Michael
          </span>
        </a>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main.home {
  display: flex;
  justify-content: center;
  align-items: center;

  .visomi {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .thumbnail {
    background: url("../assets/visomi.jpg") 50% 50% no-repeat;
    background-size: cover;
    width: 9.5rem;
    height: 9.5rem;
    border-radius: 50%;
  }

  .titles {
    color: white;
    text-align: center;
  }

  .contact {
    display: flex;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      color: white;

      .icon {
        width: 2rem;
        height: 2rem;
      }

      &.linkedin {
        color: #0275b4;
      }

      &.gitlab {
        color: #e24329;
      }

      &.twitter {
        color: #1da1f2;
      }

      &:not(:last-child)::after {
        content: "|";
        padding: 0 .5rem;
        color: white;
      }
    }
  }
}
</style>

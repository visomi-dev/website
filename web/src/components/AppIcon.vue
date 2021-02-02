<template>
  <svg class="icon" viewBox="0 0 24 24">
    <use :href="url"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import environment from '../environment';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: String,
    color: {
      type: String,
      default: 'white',
    },
  },
  setup(props) {
    const url = computed(() => (
      `${environment.serverUrl}/icons/${props.icon}.svg?color=${props.color}#icon`
    ));

    return {
      url,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

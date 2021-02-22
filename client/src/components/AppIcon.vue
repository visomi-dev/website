<script name="Icon" lang="ts" setup>
import { defineProps, computed } from 'vue';

import environment from '../environment';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
});

const url = computed(() => (
  `${environment.serverUrl}/icons/${props.icon}.svg?color=${props.color}#icon`
));
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
  >
    <use :href="url" />
  </svg>
</template>

<style lang="scss" scoped>
</style>

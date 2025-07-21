<template>
  <path
    v-if="up"
    :class="{ active: value }"
    :style="style"
    d="m 12,0 -12,14 h 8 v 16 h 8 v -16 h 8 z"
  />
  <path
    v-else
    :class="{ active: value }"
    :style="style"
    d="m 8,0 v 16 h -8 l 12,14 12,-14 h -8 v -16 z"
  />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  x: {
    required: true,
    type: Number,
  },
  y: {
    required: true,
    type: Number,
  },
  dir: {
    required: true,
    type: String as PropType<'up' | 'down'>,
  },
  value: {
    required: true,
    type: Boolean,
  },
});
const up = computed(() => props.dir === 'up');
const style = computed(() => `transform: translate(${props.x}px,${props.y}px)`);
</script>

<style lang="scss" scoped>
path {
  fill: var(--object-text-color);
  &.active {
    fill: var(--object-text-active-color);
  }
}
</style>

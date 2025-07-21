<template>
  <rect
    :class="{ active: value }"
    :width="vertical ? 8 : length"
    :height="vertical ? length : 8"
    :x="x ?? 0"
    :y="y ?? 0"
  />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  x: Number,
  y: Number,
  dir: {
    required: true,
    type: String as PropType<'horizontal' | 'vertical'>,
  },
  length: {
    required: true,
    type: Number,
  },
  value: Boolean,
});
const vertical = computed(() => props.dir === 'vertical');
</script>

<style lang="scss" scoped>
rect {
  fill: var(--inactive-color);
}
rect.active {
  fill: var(--active-color);
}
</style>

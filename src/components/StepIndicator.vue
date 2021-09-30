<template>
  <g :style="`transform: translate(${x}px, ${y}px)`">
    <path
      style="fill: #e6e6e6"
      d="m 0,0 36,36 -36,36 h 192 l 36,-36 -36,-36 z"
    />
    <text class="component-label" :class="{ active }" x="116" y="36">
      {{ label }}
    </text>
  </g>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'StepIndicator',
  components: {},
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
text {
  fill: var(--object-text-color);
  text-anchor: middle;
  dominant-baseline: central;
  user-select: none;

  &.active {
    fill: var(--object-text-active-color);
  }
}
</style>

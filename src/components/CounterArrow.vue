<template>
  <path
    d="M 0 0 V 16 L 14 8 Z"
    :style="`transform: translate(${x}px, ${y}px)`"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  x: {
    required: true,
    type: Number,
  },
  y: {
    required: true,
    type: Number,
  },
});
</script>

<style lang="scss" scoped>
text {
  user-select: none;
  font-size: 32px;
  font-family: monospace;
  text-anchor: middle;
  dominant-baseline: central;
}

g {
  cursor: pointer;
  & > rect {
    fill: var(--inactive-color);
  }
  & > text {
    fill: var(--inactive-text-color);
  }
}

g.active {
  & > rect {
    fill: var(--active-color);
  }
  & > text {
    fill: var(--active-text-color);
  }
}

g:focus {
  outline: 0;

  rect {
    outline: 1px solid #fff;
  }
}

g:focus-visible {
  outline: 0;

  rect {
    outline: 4px solid #fff;
  }
}
</style>

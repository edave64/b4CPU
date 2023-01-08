<template>
  <g
    :class="{ active: modelValue }"
    :style="{ transform: 'translate(' + x + 'px, ' + y + 'px)' }"
    @click="emit('update:modelValue', !modelValue)"
    @keypress="emit('update:modelValue', !modelValue)"
    tabindex="0"
  >
    <rect width="32" height="32" />
    <text x="16" y="16" height="32" width="32">
      {{ modelValue ? '1' : '0' }}
    </text>
  </g>
</template>

<script lang="ts" setup>
const props = defineProps({
  x: Number,
  y: Number,
  modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);
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

<template>
  <g
    :class="{ active: value }"
    :style="{ transform: 'translate(' + x + 'px, ' + y + 'px)' }"
    @click="$emit('input', !value)"
    @keypress="$emit('input', !value)"
    tabindex="0"
  >
    <rect width="32" height="32" />
    <text x="16" y="16" height="32" width="32">
      {{ value ? '1' : '0' }}
    </text>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Bit',
  components: {},
  props: {
    x: Number,
    y: Number,
    value: Boolean,
  },
  setup() {
    return {};
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

g:focus-visible {
  outline: 0;

  rect {
    outline: 4px solid #fff;
  }
}
</style>

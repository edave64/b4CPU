<template>
  <g
    class="bit"
    :style="{ transform: 'translate(' + x + 'px, ' + y + 'px)' }"
    @click="$emit('input', !value)"
  >
    <rect width="32" height="32" :fill="value ? '#f00' : '#000'" />
    <text
      style="
        font-size: 32px;
        font-family: monospace;
        fill-opacity: 1;
        stroke-width: 1;
      "
      x="16"
      y="16"
      height="32"
      width="32"
      text-anchor="middle"
      dominant-baseline="central"
      fill="#FFF"
      id="text2627"
    >
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
}

g {
  cursor: pointer;
}
</style>

<template>
  <g id="alu">
    <path
      class="component-bg"
      d="m 984.01238,400 h 376.00472 v 104 l -88,88 h -200.0036 l -88.00112,-88 z"
      id="path2803"
    />
    <g :class="{ 'alu-btn': true, active: zero }">
      <rect width="32" height="32" x="992" y="424" />
      <text x="1008" y="440"> Z </text>
    </g>
    <g :class="{ 'alu-btn': true, active: overflow }">
      <rect width="32" height="32" x="992" y="464" />
      <text x="1008" y="480"> O </text>
    </g>
    <text class="component-label" x="1135.1296" y="441.76642"> ALU </text>
    <g :class="{ 'alu-btn': true, active: add }">
      <rect width="56" height="32" x="1176" y="464" />
      <text x="1204" y="480"> ADD </text>
    </g>
    <g :class="{ 'alu-btn': true, active: sub }">
      <rect width="56" height="32" x="1240" y="464" />
      <text x="1268" y="480"> SUB </text>
    </g>
    <g :class="{ 'alu-btn': true, active: and }">
      <rect width="56" height="32" x="1048" y="464" />
      <text x="1076" y="480"> AND </text>
    </g>
    <g :class="{ 'alu-btn': true, active: xor }" transform="translate(-64,0)">
      <rect width="56" height="32" x="1176" y="464" />
      <text x="1204" y="480"> XOR </text>
    </g>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ALU',
  components: {},
  props: {
    and: { type: Boolean, required: true },
    xor: { type: Boolean, required: true },
    add: { type: Boolean, required: true },
    sub: { type: Boolean, required: true },
  },
  setup() {
    const zero = ref(false);
    const overflow = ref(false);
    return {
      zero,
      overflow,
    };
  },
});
</script>

<style lang="scss" scoped>
g.alu-btn {
  cursor: default;
  & > rect {
    fill: var(--inactive-color);
  }
  & > text {
    user-select: none;
    font-size: 32px;
    font-family: monospace;
    text-anchor: middle;
    dominant-baseline: central;
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
</style>

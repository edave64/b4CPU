<template>
  <g id="alu" style="transform: translate(984px, 400px)">
    <path
      class="component-bg"
      d="m 0,0 h 376 v 104 l -88,88 h -200 l -88,-88 z"
    />
    <g :class="{ 'alu-btn': true, active: zero }">
      <rect width="32" height="32" x="8" y="24" fill="#000" />
      <text x="24" y="40"> Z </text>
    </g>
    <g :class="{ 'alu-btn': true, active: overflow }">
      <rect width="32" height="32" x="8" y="64" />
      <text x="24" y="80"> O </text>
    </g>
    <text class="component-label" x="151" y="41"> ALU </text>
    <g :class="{ 'alu-btn': true, active: and }">
      <rect width="64" height="32" x="88" y="64" />
      <text x="120" y="80"> AND </text>
    </g>
    <g :class="{ 'alu-btn': true, active: add }">
      <rect width="64" height="32" x="160" y="64" />
      <text x="192" y="80"> ADD </text>
    </g>
    <g :class="{ 'alu-btn': true, active: sub }">
      <rect width="64" height="32" x="232" y="64" />
      <text x="264" y="80"> SUB </text>
    </g>
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';

const SelectNop = 0;
const SelectAnd = 1;
const SelectAdd = 2;
const SelectSub = 3;

export default defineComponent({
  name: 'ALU',
  components: {},
  props: {
    select1: { type: Boolean, required: true },
    select2: { type: Boolean, required: true },
    inputA: { type: Number, required: true },
    inputB: { type: Number, required: true },
  },
  setup(props, { emit }) {
    const select = computed(
      () => (props.select2 ? 2 : 0) + (props.select1 ? 1 : 0)
    );
    const and = computed(() => select.value === SelectAnd);
    const add = computed(() => select.value === SelectAdd);
    const sub = computed(() => select.value === SelectSub);
    const zero = ref(false);
    const overflow = ref(false);

    watch(zero, (z) => emit('zero-write', z));
    watch(overflow, (o) => emit('overflow-write', o));

    function doCalc() {
      let val = 0;
      switch (select.value) {
        case SelectNop:
          return;
        case SelectAnd:
          val = props.inputA & props.inputB;
          break;
        case SelectAdd:
          val = props.inputA + props.inputB;
          break;
        case SelectSub:
          val = props.inputA - props.inputB;
          break;
      }
      overflow.value = val > 0xf || val < 0;
      zero.value = val === 0;
      emit('input', val & 0xf);
    }

    watch(
      () => [select.value, props.inputA, props.inputB],
      () => doCalc()
    );
    doCalc();
    return { add, and, sub, overflow, zero };
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

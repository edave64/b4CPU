<template>
  <g id="alu" style="transform: translate(984px, 400px)">
    <path
      class="component-bg"
      d="m 0,0 h 376 v 104 l -88,88 h -200 l -88,-88 z"
    />
    <bit-btn
      id="flag_z"
      v-model="flagZ"
      v-model:mask="flagZMask"
      :x="8"
      :y="24"
      text="Z"
    />
    <bit-btn
      id="flag_o"
      v-model="flagO"
      v-model:mask="flagOMask"
      :x="8"
      :y="64"
      text="O"
    />
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

<script lang="ts" setup>
import { computed } from 'vue';
import BitBtn from './BitBtn.vue';

// const SelectNop = 0;
const SelectAnd = 1;
const SelectAdd = 2;
const SelectSub = 3;

const props = defineProps({
  select: { type: Number, required: true },
});

const flagZ = defineModel<boolean>('flagZ', {
  required: true,
});
const flagO = defineModel<boolean>('flagO', {
  required: true,
});

const flagZMask = defineModel<boolean>('flagZMask', {
  required: true,
});
const flagOMask = defineModel<boolean>('flagOMask', {
  required: true,
});

const and = computed(() => props.select === SelectAnd);
const add = computed(() => props.select === SelectAdd);
const sub = computed(() => props.select === SelectSub);
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

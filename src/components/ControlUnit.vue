<template>
  <g id="decoder_timer">
    <rect class="component-bg" width="1888" height="72" x="16" y="32" />
    <text class="component-label" x="45" y="80"> Decoder &amp; Timer </text>
    <step-indicator
      :x="336"
      :y="32"
      label="Fetch"
      :active="cpu.stage === CpuStage.Fetch"
    />
    <step-indicator
      :x="544"
      :y="32"
      label="Decode"
      :active="cpu.stage === CpuStage.Decode"
    />
    <step-indicator
      :x="752"
      :y="32"
      label="Read"
      :active="cpu.stage === CpuStage.Read"
    />
    <step-indicator
      :x="960"
      :y="32"
      label="Execute"
      :active="cpu.stage === CpuStage.Execute"
    />
    <step-indicator
      :x="1168"
      :y="32"
      label="Write"
      :active="cpu.stage === CpuStage.Write"
    />
    <g
      class="btn"
      @click="step()"
      style="transform: translate(1400px, 40px)"
      tabindex="0"
    >
      <rect width="56" height="56" x="0" y="0" />
      <path d="m 15,13 v 5 l 17,10 -17,10 v 5 l 27,-15 z" />
    </g>
    <g
      class="btn"
      @click="cycle()"
      style="transform: translate(1464px, 40px)"
      tabindex="0"
    >
      <rect width="56" height="56" x="0" y="0" />
      <path d="m 16,43 0,-31 L 43,28 Z" />
    </g>
    <g class="btn" style="transform: translate(1528px, 40px)" tabindex="0">
      <rect width="56" height="56" x="0" y="0" />
      <path d="M 6,13 V 43 L 24,33 V 43 L 50,28 23,13 V 23 Z" />
    </g>
  </g>
</template>

<script lang="ts" setup>
import StepIndicator from './StepIndicator.vue';
import { Cpu, CpuStage } from '../engine/cpu';

const props = defineProps({
  cpu: {
    type: Cpu,
    required: true,
  },
});
function step() {
  props.cpu.nextStage();
}
function cycle() {
  props.cpu.step();
}

defineExpose({
  doFocus() {},
});
</script>

<style lang="scss" scoped>
g.btn {
  fill: #e6e6e6;

  path {
    fill: #000;
  }
}
</style>

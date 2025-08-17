<template>
  <g id="decoder_timer">
    <rect class="component-bg" width="1888" height="72" x="16" y="32" />
    <text class="component-label" x="45" y="80"> Decoder &amp; Timer </text>
    <step-indicator
      :x="336"
      :y="32"
      label="Fetch"
      :active="CpuAccessor.getStage(cpu) === CpuStage.Fetch"
    />
    <step-indicator
      :x="544"
      :y="32"
      label="Decode"
      :active="CpuAccessor.getStage(cpu) === CpuStage.Decode"
    />
    <step-indicator
      :x="752"
      :y="32"
      label="Read"
      :active="CpuAccessor.getStage(cpu) === CpuStage.Read"
    />
    <step-indicator
      :x="960"
      :y="32"
      label="Execute"
      :active="CpuAccessor.getStage(cpu) === CpuStage.Execute"
    />
    <step-indicator
      :x="1168"
      :y="32"
      label="Write"
      :active="CpuAccessor.getStage(cpu) === CpuStage.Write"
    />
    <g
      id="control_unit_step_btn"
      class="btn"
      @click="step()"
      style="transform: translate(1400px, 40px)"
      tabindex="0"
    >
      <rect width="56" height="56" x="0" y="0" />
      <path d="m 15,13 v 5 l 17,10 -17,10 v 5 l 27,-15 z" />
    </g>
    <g
      id="control_unit_cycle_btn"
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
import {
  CpuStage,
  cpuStep,
  runInstruction,
  CpuAccessor,
  type CpuState,
} from '../engine/cpu';
import type { PropType } from 'vue';
import type { IDecoderState } from '../interfaces/decoder';

const props = defineProps({
  decoderState: {
    type: Object as PropType<IDecoderState>,
    required: true,
  },
});

const cpu = defineModel<CpuState>('cpu', {
  required: true,
});

function step() {
  cpu.value = cpuStep(props.decoderState, cpu.value);
}
function cycle() {
  cpu.value = runInstruction(props.decoderState, cpu.value);
}

defineExpose({
  doFocus() {},
});
</script>

<style lang="scss" scoped>
g.btn {
  fill: var(--inactive-color);

  path {
    fill: var(--inactive-text-color);
  }
}
</style>

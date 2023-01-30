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
    <g id="timer_step" @click="step()">
      <rect
        style="fill: #e6e6e6"
        id="rect3100"
        width="56"
        height="56"
        x="1376"
        y="40"
      />
      <path
        id="path3"
        d="m 1390.6015,52.508481 v 5.437568 l 17.4162,10.054814 -17.4162,10.054813 v 5.437568 l 26.8324,-15.492381 z"
      />
    </g>
    <g id="timer_cycle" @click="cycle()">
      <rect
        style="fill: #e6e6e6"
        id="rect3104"
        width="56"
        height="56"
        x="1440"
        y="40"
      />
      <path
        id="path3106"
        d="m 1456.0184,83.492129 0,-30.984258 L 1482.8515,68 Z"
      />
    </g>
    <g id="timer_fastforward">
      <rect
        style="fill: #e6e6e6"
        id="rect3108"
        width="56"
        height="56"
        x="1504"
        y="40"
      />
      <path
        id="path3110"
        d="M 1509.8945,52.507812 V 83.492188 L 1527.3105,73.4375 V 83.492188 L 1554.1445,68 1527.3105,52.507812 V 62.5625 Z"
      />
    </g>
  </g>
</template>

<script lang="ts" setup>
import { PropType, ref, watch, nextTick } from 'vue';
import { Gates, IDecoderState } from 'src/interfaces/decoder';
import StepIndicator from './StepIndicator.vue';
import { Cpu, CpuStage } from 'src/engine/cpu';

enum Stage {
  Fetch,
  Decode,
  Read,
  Execute,
  Write,
}
const stage = ref(Stage.Fetch);
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
</script>

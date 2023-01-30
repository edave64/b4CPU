<template>
  <g id="programm" style="transform: translate(16px, 136px)">
    <rect class="component-bg" width="536" height="720" x="0" y="0" />
    <text class="component-label" x="30" y="40"> Instruct. </text>

    <counter-arrow
      :x="8"
      :y="56 + 40 * (cpu.pc.value % 4) + 168 * Math.floor(cpu.pc.value / 4)"
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="cluster + '_' + i">
        <word
          :x="32"
          :y="48 + 40 * i + 168 * cluster"
          v-model="ops[i + cluster * 4]"
        />
        <word
          :x="200"
          :y="48 + 40 * i + 168 * cluster"
          v-model="addr[i + cluster * 4]"
        />
        <word
          :x="368"
          :y="48 + 40 * i + 168 * cluster"
          v-model="data[i + cluster * 4]"
        />
      </g>
    </g>
  </g>
</template>

<script lang="ts" setup>
import Word from './Word.vue';
import CounterArrow from './CounterArrow.vue';
import { Cpu } from 'src/engine/cpu';

const props = defineProps({
  cpu: {
    type: Cpu,
    required: true,
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const ops = props.cpu.instructionsOp;
// eslint-disable-next-line vue/no-setup-props-destructure
const addr = props.cpu.instructionsAddr;
// eslint-disable-next-line vue/no-setup-props-destructure
const data = props.cpu.instructionsData;
</script>

<template>
  <g id="ram" style="transform: translate(1704px, 136px)">
    <path class="component-bg" d="m 0,0 v 720 40 h 120 v -40 h 80 V 0 Z" />
    <text class="component-label" x="30" y="40"> RAM </text>
    <counter-arrow
      :x="8"
      :y="
        56 +
        40 * (cpu.address.value % 4) +
        168 * Math.floor(cpu.address.value / 4)
      "
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="'data_' + cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="'data_' + cluster + '_' + i">
        <word
          :x="32"
          :y="48 + 40 * i + 168 * cluster"
          ref="dataComp"
          v-model="ram[i + cluster * 4]"
        />
      </g>
    </g>
    <direction-arrow dir="up" :x="40" :y="720" :value="cpu.ramWrite" />
    <direction-arrow dir="down" :x="72" :y="720" :value="cpu.ramRead" />
  </g>
</template>

<script lang="ts" setup>
import word from 'components/WordBits.vue';
import { Cpu } from '../engine/cpu';
import { ref } from 'vue';
import CounterArrow from './CounterArrow.vue';
import DirectionArrow from './DirectionArrow.vue';

const props = defineProps({
  cpu: {
    type: Cpu,
    required: true,
  },
});

const dataComp = ref([] as (typeof word | null)[]);

defineExpose({
  doFocus() {
    dataComp.value[0]?.doFocus(3);
  },
});

const ram = props.cpu.ram;
</script>

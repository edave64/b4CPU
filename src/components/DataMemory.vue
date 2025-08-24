<template>
  <g id="ram" style="transform: translate(1704px, 136px)">
    <path class="component-bg" d="m 0,0 v 720 40 h 120 v -40 h 80 V 0 Z" />
    <text class="component-label" x="30" y="40"> RAM </text>
    <counter-arrow
      :x="8"
      :y="56 + 40 * (addr % 4) + 168 * Math.floor(addr / 4)"
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="'data_' + cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="'data_' + cluster + '_' + i">
        <word-bits
          :x="32"
          :y="48 + 40 * i + 168 * cluster"
          ref="dataComp"
          :model-value="ram[i + cluster * 4]!.value"
          @update:model-value="ram[i + cluster * 4]!.value = $event"
          :mask="ramMask[i + cluster * 4]!.value"
          @update:mask="ramMask[i + cluster * 4]!.value = $event"
          @up="dataComp[(i + cluster * 4 + 15) % 16]!.doFocus($event)"
          @down="dataComp[(i + cluster * 4 + 1) % 16]!.doFocus($event)"
          @keydown.right.stop="dataComp[(i + cluster * 4 + 1) % 16]!.doFocus(3)"
          @keydown.left.stop="dataComp[(i + cluster * 4 + 15) % 16]!.doFocus()"
        />
      </g>
    </g>
    <direction-arrow dir="up" :x="40" :y="720" :value="ramWrite" />
    <direction-arrow dir="down" :x="72" :y="720" :value="ramRead" />
  </g>
</template>

<script lang="ts" setup>
import WordBits from 'components/WordBits.vue';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import CounterArrow from './CounterArrow.vue';
import DirectionArrow from './DirectionArrow.vue';
import { CpuAccessor, type CpuState, Gate } from '../engine/cpu';
import { accessorComputed } from './cpuAdapters';

const dataComp = ref([] as (typeof WordBits | null)[]);

defineExpose({
  doFocus() {
    dataComp.value[0]?.doFocus(3);
  },
});

const cpu = defineModel<CpuState>('cpu', {
  required: true,
});

const mask = defineModel<CpuState>('mask', {
  required: true,
});

const ram: Ref<number>[] = [];
const ramMask: Ref<number>[] = [];

for (let i = 0; i < 16; i++) {
  ram.push(accessorComputed('Ram', cpu, i));
  ramMask.push(accessorComputed('Ram', mask, i));
}

const stage = computed(() => CpuAccessor.getStage(cpu.value));

const addr = computed(() => {
  const pc = CpuAccessor.getPc(cpu.value);
  return CpuAccessor.getInstructionsAddr(cpu.value, pc);
});

const ramWrite = computed(
  () => !!(CpuAccessor.getLastDecodedGates(cpu.value, stage.value) & Gate.RW),
);
const ramRead = computed(
  () => !!(CpuAccessor.getLastDecodedGates(cpu.value, stage.value) & Gate.RW),
);
</script>

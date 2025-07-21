<template>
  <g id="programm" style="transform: translate(16px, 136px)">
    <rect class="component-bg" width="536" height="720" x="0" y="0" />
    <text class="component-label" x="30" y="40">ROM</text>

    <counter-arrow
      :x="8"
      :y="56 + 40 * (cpu.pc.value % 4) + 168 * Math.floor(cpu.pc.value / 4)"
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="cluster + '_' + i">
        <word
          :x="32"
          :y="48 + 40 * i + 168 * cluster"
          ref="ref_inst"
          v-model="ops[i + cluster * 4]"
          @keydown.right.stop="ref_addr[i + cluster * 4]!.doFocus(3)"
          @keydown.left.stop="ref_data[(i + cluster * 4 + 15) % 16]!.doFocus()"
          @up="ref_inst[(i + cluster * 4 + 15) % 16]!.doFocus($event)"
          @down="ref_inst[(i + cluster * 4 + 1) % 16]!.doFocus($event)"
        />
        <word
          :x="200"
          :y="48 + 40 * i + 168 * cluster"
          ref="ref_addr"
          v-model="addr[i + cluster * 4]"
          @keydown.right.stop="ref_data[i + cluster * 4]!.doFocus(3)"
          @keydown.left.stop="ref_inst[i + cluster * 4]!.doFocus()"
          @up="ref_addr[(i + cluster * 4 + 15) % 16]!.doFocus($event)"
          @down="ref_addr[(i + cluster * 4 + 1) % 16]!.doFocus($event)"
        />
        <word
          :x="368"
          :y="48 + 40 * i + 168 * cluster"
          ref="ref_data"
          v-model="data[i + cluster * 4]"
          @keydown.right.stop="ref_inst[(i + cluster * 4 + 1) % 16]!.doFocus(3)"
          @keydown.left.stop="ref_addr[i + cluster * 4]!.doFocus()"
          @up="ref_data[(i + cluster * 4 + 15) % 16]!.doFocus($event)"
          @down="ref_data[(i + cluster * 4 + 1) % 16]!.doFocus($event)"
        />
      </g>
    </g>
  </g>
</template>

<script lang="ts" setup>
import Word from './WordBits.vue';
import CounterArrow from './CounterArrow.vue';
import { Cpu } from '../engine/cpu';
import type { Ref } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  cpu: {
    type: Cpu,
    required: true,
  },
});

const ref_inst: Ref<(typeof Word)[]> = ref([]);
const ref_addr: Ref<(typeof Word)[]> = ref([]);
const ref_data: Ref<(typeof Word)[]> = ref([]);

const ops = props.cpu.instructionsOp;

const addr = props.cpu.instructionsAddr;

const data = props.cpu.instructionsData;
</script>

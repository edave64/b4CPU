<template>
  <q-page class="">
    <q-card>
      <!--
      - Instruction memory on the left side
        - Every line is one instruction
        - Every instruction can have a data section and an address section
      - The ram on the right side
        - Unusual architecture, not Von Neumann
      - Decoder on the top
        - Takes instruction from the instruction memory and decodes it
        - Sends commands to the components of the CPU at specific timings
      - Program counter next to the instruction memory
        - Tracks which instruction is currently being executed
        - Keeps counting after each instruction
        - Can instead go to the address in the instruction, this is called a jump
      - Below the decoder are the A and B registers
        - Registers are used to store temporary data
        - Values can be read and written to Ram
      - Below the registers are the ALU
        - ALU is used to perform arithmetic operations
        - It uses the A and B registers as inputs
        - The result is stored in the A register
        - If the result is zero, the flag Z is set
        - If the result does not fit in 4 bits, is either too large or negative, the flag O is set
        - These flags can be used to perform conditional jumps, depending on if they are set or not
        -->
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { computed } from 'vue';
import Cpu from 'components/CPU.vue';
import { useCpuStore } from '../stores/cpu';
import type { CpuState } from '../engine/cpu';

const cpuStore = useCpuStore();

const cpu = computed({
  get(): Readonly<CpuState> {
    return cpuStore.cpu;
  },
  set(newCpu: CpuState) {
    cpuStore.update(newCpu);
  },
});
</script>

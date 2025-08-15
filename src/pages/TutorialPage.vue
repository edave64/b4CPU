<template>
  <q-page class="">
    <q-card>
      <cpu v-model:cpu="cpu" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import type { ComputedRef } from 'vue';
import { computed, ref } from 'vue';
import Cpu from 'components/CPU.vue';
import excercise from '../config/demoExcercise.json';
import type { IExcerciseState } from '../interfaces/excercises';
import { useCpuStore } from '../stores/cpu';
import type { CpuState } from '../engine/cpu';

const cpuStore = useCpuStore();

const tab = ref('mails');

const cpu = computed({
  get(): Readonly<CpuState> {
    return cpuStore.cpu;
  },
  set(newCpu: CpuState) {
    cpuStore.update(newCpu);
  },
});

const demoExcercise: ComputedRef<IExcerciseState> = computed(() => {
  return {
    dataMemoryState: excercise.dataMemoryState,
    instructionMemoryState: excercise.instructionMemoryState,
  };
});
</script>

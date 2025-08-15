<template>
  <q-page class="row items-center justify-evenly">
    <Cpu :excerciseState="demoExcercise" v-model:cpu="cpu" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import Cpu from 'components/CPU.vue';
import excercise from '../config/demoExcercise.json';
import type { IExcerciseState } from '../interfaces/excercises';
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

const demoExcercise: ComputedRef<IExcerciseState> = computed(() => {
  return {
    dataMemoryState: excercise.dataMemoryState,
    instructionMemoryState: excercise.instructionMemoryState,
  };
});
</script>

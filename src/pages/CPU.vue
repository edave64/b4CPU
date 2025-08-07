<template>
  <q-page class="row items-center justify-evenly">
    <cpu :excerciseState="demoExcercise" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import cpu from 'components/CPU.vue';
import excercise from '../config/demoExcercise.json';
import type { IExcerciseState } from '../interfaces/excercises';

const demoExcercise: ComputedRef<IExcerciseState> = computed(() => {
  return {
    dataMemoryState: excercise.dataMemoryState,
    instructionMemoryState: excercise.instructionMemoryState,
  };
});
</script>

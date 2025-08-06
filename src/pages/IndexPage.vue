<template>
  <q-page class="row items-center justify-evenly">
    <cpu :excerciseState="demoExcercise" :decoderState="decoderState" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import cpu from 'components/CPU.vue';
import excercise from '../config/demoExcercise.json';
import initialDecoderState from '../config/initialDecoder.json';
import type { IExcerciseState } from '../interfaces/excercises';
import type { IDecoderState } from '../interfaces/decoder';
import { readDecoder, verifyDecoder } from '../engine/readDecoder';

const demoExcercise: ComputedRef<IExcerciseState> = computed(() => {
  return {
    dataMemoryState: excercise.dataMemoryState,
    instructionMemoryState: excercise.instructionMemoryState,
  };
});
if (!verifyDecoder(initialDecoderState)) {
  throw new Error('Invalid decoder state');
}
const decoderState: IDecoderState = readDecoder(initialDecoderState);
</script>

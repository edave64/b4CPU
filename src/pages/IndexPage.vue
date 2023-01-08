<template>
  <q-page class="row items-center justify-evenly">
    <cpu :excerciseState="demoExcercise" :decoderState="decoderState" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { ComputedRef, computed } from 'vue';
import cpu from 'components/CPU.vue';
import excercise from '../config/demoExcercise.json';
import initialDecoderState from '../config/initialDecoder.json';
import { IExcerciseState } from '../interfaces/excercises';
import { Gates, IDecoderState } from '../interfaces/decoder';

const demoExcercise: ComputedRef<IExcerciseState> = computed(() => {
  return {
    dataMemoryState: excercise.dataMemoryState,
    instructionMemoryState: excercise.instructionMemoryState,
  };
});
const decoderState: IDecoderState = {
  instructions: initialDecoderState.instructions.map((i) => ({
    name: i.name,
    gates: new Set(i.gates as Gates[]),
  })),
  timingMasks: {
    fetch: new Set(initialDecoderState.timingMasks.fetch as Gates[]),
    read: new Set(initialDecoderState.timingMasks.read as Gates[]),
    exec: new Set(initialDecoderState.timingMasks.exec as Gates[]),
    write: new Set(initialDecoderState.timingMasks.write as Gates[]),
  },
};
</script>

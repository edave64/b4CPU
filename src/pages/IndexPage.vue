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
import type { Gates, IDecoderState } from '../interfaces/decoder';
import { CpuStage } from '../engine/cpu';

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
    [CpuStage.Fetch]: new Set(initialDecoderState.timingMasks.fetch as Gates[]),
    [CpuStage.Decode]: new Set(
      initialDecoderState.timingMasks.decode as Gates[],
    ),
    [CpuStage.Read]: new Set(initialDecoderState.timingMasks.read as Gates[]),
    [CpuStage.Execute]: new Set(
      initialDecoderState.timingMasks.exec as Gates[],
    ),
    [CpuStage.Write]: new Set(initialDecoderState.timingMasks.write as Gates[]),
  },
};
</script>

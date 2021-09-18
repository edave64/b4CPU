<template>
  <q-page class="row items-center justify-evenly">
    <cpu :excerciseState="demoExcercise" />
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  ComputedRef,
} from '@vue/composition-api';
import cpu from 'components/CPU.vue';
import excercise from '../config/demoExcercise.json';
import { IExcerciseState } from '../interfaces/excercises';

export default defineComponent({
  name: 'PageIndex',
  components: { cpu },
  setup() {
    const demoExcercise: ComputedRef<IExcerciseState> = computed(() => {
      return {
        dataMemoryState: excercise.dataMemoryState,
        instructionMemoryState: excercise.instructionMemoryState,
      };
    });
    return { demoExcercise };
  },
});
</script>

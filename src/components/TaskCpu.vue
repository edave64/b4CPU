<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <CPU
    v-model:cpu="task.cpu"
    v-model:decoder-state="task.decoder"
    v-model:mask="task.mask"
    :allow-mask-editing="false"
  />
</template>

<script setup lang="ts">
import { watch, type PropType } from 'vue';
import CPU from './CPU.vue';
import type { IExcerciseState } from '../interfaces/excercises';

const props = defineProps({
  task: {
    type: Object as PropType<IExcerciseState>,
    required: true,
  },
});

const emit = defineEmits(['finished']);

watch(
  () => props.task.cpu,
  (cpu) => {
    if (props.task.testGoal(cpu, props.task)) {
      emit('finished');
    }
  },
);
</script>

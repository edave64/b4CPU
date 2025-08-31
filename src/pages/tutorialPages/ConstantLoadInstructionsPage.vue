<template>
  <p>
    In order to work with data, you first need to put that data into the
    registers. There are two registers, A and B. In the below CPU, use the LDA
    and LDB instructions and set a value in the data (Column 3 in the ROM) to
    load data into the registers.
  </p>
  <p v-if="pageState.beaten">
    Congratulations! You have successfully loaded data into the registers.
    <br />
    <q-btn
      stretch
      flat
      color="primary"
      label="Proceed to next chapter"
      @click="emit('advance')"
    />
  </p>
  <TaskCpu :task="task" @finished="pageState.beaten = true" />
</template>
<script setup lang="ts">
import { computed, markRaw, watch } from 'vue';
import { useTutorial } from '../../stores/tutorial';
import confetti from 'canvas-confetti';
import taskJson from './ConstantLoadInstructionsTask.json';
import {
  type IExcerciseJSON,
  type IExcerciseState,
  initTask,
} from '../../interfaces/excercises';
import TaskCpu from '../../components/TaskCpu.vue';

const emit = defineEmits(['advance']);

const tutorial = useTutorial();

if (!tutorial.chapterState[tutorial.chapter]) {
  tutorial.chapterState[tutorial.chapter] = {
    task: initTask(taskJson as IExcerciseJSON),
    beaten: false,
  } as ChapterState;
}

const pageState = tutorial.chapterState[tutorial.chapter] as ChapterState;
const task = computed({
  get() {
    return pageState.task;
  },
  set(newTask: IExcerciseState) {
    pageState.task = markRaw(newTask);
  },
});

watch(
  () => pageState.beaten,
  (beaten) => {
    if (beaten) {
      confetti({
        particleCount: 200,
        spread: 1000,
      })?.catch((e) => console.error(e));
    }
  },
);

interface ChapterState {
  task: IExcerciseState;
  beaten: boolean;
}
</script>

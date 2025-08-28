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
  <CPU v-model:cpu="pageState.cpu" :decoder-state="decoderState" :mask="mask" />
</template>
<script setup lang="ts">
import { CpuAccessor, type CpuState, makeCpuState } from '../../engine/cpu';
import CPU from '../../components/CPU.vue';
import type { IDecoderState } from '../../interfaces/decoder';
import { readDecoder } from '../../engine/readDecoder';
import { markRaw, watch } from 'vue';
import { useTutorial } from '../../stores/tutorial';
import confetti from 'canvas-confetti';

const emit = defineEmits(['advance']);

const tutorial = useTutorial();

if (!tutorial.chapterState[tutorial.chapter]) {
  tutorial.chapterState[tutorial.chapter] = {
    cpu: markRaw(makeCpuState()),
    beaten: false,
  } as ChapterState;
}

const pageState = tutorial.chapterState[tutorial.chapter] as ChapterState;

const decoderState: IDecoderState = readDecoder({
  instructions: [
    {
      name: 'NOP',
      gates: [],
    },
    {
      name: 'LDA',
      gates: ['AW'],
    },
    {
      name: 'LDB',
      gates: ['BW'],
    },
    undefined!,
    {
      name: 'JMP',
      gates: ['JN'],
    },
  ],
  timingMasks: {
    fetch: [],
    decode: [],
    read: [],
    exec: [],
    write: ['AW', 'BW'],
  },
});
const mask = makeCpuState();
for (let i = 0; i < 2; i++) {
  CpuAccessor.setInstructionsOp(mask, i, 0b0011);
  CpuAccessor.setInstructionsData(mask, i, 15);
}

CpuAccessor.setInstructionsOp(pageState.cpu, 2, 0b0100);

watch(
  () => pageState.cpu,
  (cpu) => {
    if (
      CpuAccessor.getRegA(cpu) !== 0 &&
      CpuAccessor.getRegB(cpu) !== 0 &&
      !pageState.beaten
    ) {
      pageState.beaten = true;
      confetti({
        particleCount: 200,
        spread: 1000,
      })?.catch((e) => console.error(e));
    }
  },
);

interface ChapterState {
  cpu: CpuState;
  beaten: boolean;
}
</script>

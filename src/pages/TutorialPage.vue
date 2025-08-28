<template>
  <q-page class="">
    <!--
      - Instruction memory on the left side
        - Every line is one instruction
        - Every instruction can have a data section and an address section
      - The ram on the right side
        - Unusual architecture, not Von Neumann
      - Decoder on the top
        - Takes instruction from the instruction memory and decodes it
        - Sends commands to the components of the CPU at specific timings
      - Program counter next to the instruction memory
        - Tracks which instruction is currently being executed
        - Keeps counting after each instruction
        - Can instead go to the address in the instruction, this is called a jump
      - Below the decoder are the A and B registers
        - Registers are used to store temporary data
        - Values can be read and written to Ram
      - Below the registers are the ALU
        - ALU is used to perform arithmetic operations
        - It uses the A and B registers as inputs
        - The result is stored in the A register
        - If the result is zero, the flag Z is set
        - If the result does not fit in 4 bits, is either too large or negative, the flag O is set
        - These flags can be used to perform conditional jumps, depending on if they are set or not
        -->
    <q-toolbar class="text-white">
      <q-btn-dropdown
        flat
        round
        dense
        icon="toc"
        class="q-mr-sm"
        title="Table of Contents"
      >
        <q-list>
          <q-item
            v-for="(title, name) in pageTitles"
            :key="name"
            clickable
            @click="tutorial.chapter = name"
          >
            <q-item-section>
              <q-item-label>{{ title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical inset />
      <q-btn stretch flat label="Back" @click="backPage" />

      <q-space />

      {{ pageTitles[tutorial.chapter] }}

      <q-space />

      <q-btn stretch flat label="Next" @click="nextPage" />
    </q-toolbar>
    <q-tab-panels v-model="tutorial.chapter">
      <q-tab-panel name="start">
        <StartPage @advance="nextPage" />
      </q-tab-panel>
      <q-tab-panel name="cpu_basics">
        <TourPage @advance="nextPage" />
      </q-tab-panel>
      <q-tab-panel name="ld_instructions">
        <ConstantLoadInstructionsPage @advance="nextPage" />
      </q-tab-panel>
      <q-tab-panel name="end">
        <div>To be continued...</div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import TourPage from './tutorialPages/TourPage.vue';
import type { Chapter } from '../stores/tutorial';
import { AllChapters, useTutorial } from '../stores/tutorial';
import StartPage from './tutorialPages/StartPage.vue';
import ConstantLoadInstructionsPage from './tutorialPages/ConstantLoadInstructionsPage.vue';

const tutorial = useTutorial();

const pageTitles: Record<Chapter, string> = {
  start: 'Introduction',
  cpu_basics: 'Tour of the CPU',
  ld_instructions: 'Constant load instructions',
  end: 'End',
};

function nextPage() {
  let idx = AllChapters.indexOf(tutorial.chapter);
  if (idx === -1) {
    idx = 0;
  }
  if (idx >= AllChapters.length - 1) return;
  tutorial.chapter = AllChapters[idx + 1]!;
}

function backPage() {
  const idx = AllChapters.indexOf(tutorial.chapter);
  if (idx <= 0) return;
  tutorial.chapter = AllChapters[idx - 1]!;
}
</script>

<style lang="scss">
// Prevent shepherd from blocking the toolbar
.q-toolbar {
  z-index: 1;
}
</style>

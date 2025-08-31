<template>
  <q-page class="row items-center justify-evenly">
    <Cpu
      :decoder-state="decoderState"
      allow-mask-editing
      v-model:mask="exercise.mask"
      v-model:cpu="exercise.initialState"
    />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { computed, reactive } from 'vue';
import Cpu from 'components/CPU.vue';
import { makeCpuState } from '../engine/cpu';
import { useDecoderStore } from '../stores/decoder';

const decoderState = computed(() => useDecoderStore().state);

const exercise = reactive({
  initialState: makeCpuState(),
  mask: makeCpuState(),
});
</script>

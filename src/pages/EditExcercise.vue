<template>
  <q-page class="row items-center justify-evenly">
    <Cpu
      :decoder-state="decoderState"
      allow-mask-editing
      v-model:mask="mask"
      v-model:cpu="initialState"
    />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { computed, ref } from 'vue';
import Cpu from 'components/CPU.vue';
import { makeCpuState, type CpuState } from '../engine/cpu';
import { useDecoderStore } from '../stores/decoder';

const decoderState = computed(() => useDecoderStore().state);

const initialState = ref<CpuState>(makeCpuState());

const mask = ref<Uint8Array>(makeCpuState());
</script>

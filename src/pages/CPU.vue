<template>
  <q-page class="row items-center justify-evenly">
    <Cpu v-model:cpu="cpu" :decoder-state="decoderState" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { computed } from 'vue';
import Cpu from 'components/CPU.vue';
import { useCpuStore } from '../stores/cpu';
import type { CpuState } from '../engine/cpu';
import { useDecoderStore } from '../stores/decoder';

const cpuStore = useCpuStore();
const decoderState = computed(() => useDecoderStore().state);

const cpu = computed({
  get(): Readonly<CpuState> {
    return cpuStore.cpu;
  },
  set(newCpu: CpuState) {
    cpuStore.update(newCpu);
  },
});
</script>

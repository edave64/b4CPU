<template>
  <q-page class="row items-center justify-evenly">
    <Cpu v-model:cpu="cpu" v-model:decoder-state="decoderState" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { computed, markRaw } from 'vue';
import Cpu from 'components/CPU.vue';
import { useCpuStore } from '../stores/cpu';
import type { CpuState } from '../engine/cpu';
import { useDecoderStore } from '../stores/decoder';
import type { IDecoderState } from '../interfaces/decoder';

const cpuStore = useCpuStore();
const decoderStore = useDecoderStore();
const decoderState = computed({
  get() {
    return decoderStore.state;
  },
  set(newDecoderState: IDecoderState) {
    decoderStore.state = markRaw(newDecoderState);
  },
});

const cpu = computed({
  get(): Readonly<CpuState> {
    return cpuStore.cpu;
  },
  set(newCpu: CpuState) {
    cpuStore.update(newCpu);
  },
});
</script>

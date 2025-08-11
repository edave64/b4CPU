import { defineStore, acceptHMRUpdate } from 'pinia';
import { Cpu } from '../engine/cpu';
import { markRaw } from 'vue';
import { useDecoderStore } from './decoder';

export const useCpuStore = defineStore('cpu', {
  state: () => ({
    cpu: markRaw(new Cpu(useDecoderStore().state)),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCpuStore, import.meta.hot));
}

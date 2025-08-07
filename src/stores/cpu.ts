import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Cpu } from '../engine/cpu';
import type { Raw } from 'vue';

export const useCpuStore = defineStore('cpu', {
  state: () => ({
    cpu: null as Raw<Cpu> | null,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCpuStore, import.meta.hot));
}

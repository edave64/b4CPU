import { defineStore, acceptHMRUpdate } from 'pinia';
import { makeCpuState } from '../engine/cpu';

export const useCpuStore = defineStore('cpu', {
  state: () => ({
    cpu: makeCpuState(),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCpuStore, import.meta.hot));
}

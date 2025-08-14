import { defineStore, acceptHMRUpdate } from 'pinia';
import type { CpuState } from '../engine/cpu';
import { makeCpuState } from '../engine/cpu';

export const useCpuStore = defineStore('cpu', {
  state: () => ({
    cpu: makeCpuState() as Readonly<CpuState>,
  }),
  actions: {
    update(mutator: (cpu: CpuState) => void) {
      const newState = structuredClone(this.cpu) as CpuState;
      mutator(newState);
      this.cpu = newState;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCpuStore, import.meta.hot));
}

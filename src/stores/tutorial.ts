import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTutorial = defineStore('tutorial', {
  state: () => ({
    step: null as null | string,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTutorial, import.meta.hot));
}

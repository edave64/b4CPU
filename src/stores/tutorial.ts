import { defineStore, acceptHMRUpdate } from 'pinia';

export const AllChapters = ['start', 'cpu_basics', 'end'] as const;
export type Chapter = (typeof AllChapters)[number];

export const useTutorial = defineStore('tutorial', {
  state: () => ({
    step: null as null | string,
    chapter: AllChapters[0] as Chapter,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTutorial, import.meta.hot));
}

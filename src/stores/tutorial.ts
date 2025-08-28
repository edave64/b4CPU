import { defineStore, acceptHMRUpdate } from 'pinia';

export const AllChapters = ['start', 'cpu_basics', 'ld_instructions', 'end'];
export type Chapter = (typeof AllChapters)[number];

export const useTutorial = defineStore('tutorial', {
  state: () => ({
    chapter: AllChapters[0] as Chapter,
    // Used to store the state of individual chapters
    // The specific type is determined by the chapter itself
    chapterState: {} as Record<Chapter, unknown>,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTutorial, import.meta.hot));
}

import { defineStore, acceptHMRUpdate } from 'pinia';
import type { IDecoderState } from '../interfaces/decoder';
import initialDecoderState from '../config/initialDecoder.json';
import { readDecoder } from '../engine/readDecoder';
import type { IDecoderJson } from '../engine/readDecoder';
import { markRaw } from 'vue';

const decoderState: IDecoderState = readDecoder(
  initialDecoderState as IDecoderJson,
);

export const useDecoderStore = defineStore('decoder', {
  state: () => ({
    state: markRaw(decoderState),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDecoderStore, import.meta.hot));
}

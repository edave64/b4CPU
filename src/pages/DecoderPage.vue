<template>
  <q-page padding>
    <decoder-config v-model="decoderState" />
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import type { IDecoderState } from '../interfaces/decoder';
import { computed, markRaw } from 'vue';
import { useDecoderStore } from '../stores/decoder';
import DecoderConfig from '../components/DecoderConfig.vue';

const decoderStore = useDecoderStore();
const decoderState = computed({
  get() {
    return decoderStore.state;
  },
  set(newDecoderState: IDecoderState) {
    decoderStore.state = markRaw(newDecoderState);
  },
});
</script>

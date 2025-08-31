<template>
  <q-layout view="Hhh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <img src="favicon.svg" alt="B4CPU" width="32" height="32" />

        <q-toolbar-title> B4CPU </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="text-grey-8"> Menu </q-item-label>
        <q-item clickable v-ripple to="/"> CPU view </q-item>
        <q-item clickable v-ripple to="/task"> Create Task </q-item>
        <q-item clickable v-ripple to="/tutorial"> Tutorial </q-item>
        <q-item clickable v-ripple @click="save"> Save </q-item>
        <q-item clickable v-ripple @click="load"> Load </q-item>
        <q-item clickable v-ripple to="/decoder"> Configure decoder </q-item>
        <!-- <q-item clickable v-ripple to="/excercises"> Excercises </q-item> -->
        <q-item clickable v-ripple to="/about"> About </q-item>
        <q-item clickable v-ripple href="https://github.com/edave64/b4CPU">
          Source code
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useDecoderStore } from '../stores/decoder';
import { readDecoder, writeDecoder } from '../engine/readDecoder';
import { useCpuStore } from '../stores/cpu';
import { ref } from 'vue';
import { saveJson, tryLoadJson } from '../utils/file';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function save() {
  saveJson(
    {
      cpu: Array.from(useCpuStore().cpu),
      decoder: writeDecoder(useDecoderStore().state),
    },
    'b4cpu',
  );
}

function load() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tryLoadJson<any>((json) => {
    const cpu = new Uint8Array(json.cpu);
    useCpuStore().cpu = cpu;
    useDecoderStore().state = readDecoder(json.decoder);
  });
}
</script>

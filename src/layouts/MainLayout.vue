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
        <q-item clickable v-ripple @click="save"> Save </q-item>
        <q-item clickable v-ripple @click="load"> Load </q-item>
        <q-item clickable v-ripple to="/decoder"> Configure decoder </q-item>
        <!-- <q-item clickable v-ripple to="/excercises"> Excercises </q-item> -->
        <q-item clickable v-ripple to="/about"> About </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Cpu } from '../engine/cpu';
import { useCpuStore } from '../stores/cpu';
import { markRaw, ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function save() {
  const state = useCpuStore().cpu!.saveState();

  const a = document.createElement('a');
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(state)], { type: 'application/json' }),
  );
  const date = new Date();
  a.setAttribute(
    'download',
    `b4cpu_${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}.json`,
  );
  a.setAttribute('href', url);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function load() {
  console.log('load');
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      const cpu = Cpu.loadState(json);
      useCpuStore().cpu = markRaw(cpu);
    };
    reader.readAsText(file);
  };
  input.click();
}
</script>

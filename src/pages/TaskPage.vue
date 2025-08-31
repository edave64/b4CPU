<template>
  <q-page padding>
    <h2>Creating Task</h2>
    <p>
      <q-btn @click="clear">New Task</q-btn>
      <q-btn @click="load">Load Task</q-btn>
      <q-btn @click="save">Save Task</q-btn>
    </p>
    <p>
      <q-btn-toggle
        :options="[
          { label: 'Initial state', value: 'init' },
          { label: 'Description', value: 'desc' },
          { label: 'Initial values', value: 'inits' },
          { label: 'Goals', value: 'goals' },
        ]"
        v-model="subpage"
      />
    </p>
    <template v-if="subpage === 'desc'">
      <p>Description:</p>
      <textarea v-model="description"></textarea>
    </template>
    <template v-else-if="subpage === 'inits'">
      <table>
        <thead>
          <tr>
            <th>Target</th>
            <th>Initial assignments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="target in initialTargets" :key="target">
            <td>{{ target }}</td>
            <td>
              <select v-model="editingState.initialAssignments[target]">
                <option :value="undefined">Use value in initial state</option>
                <option
                  v-for="randomIdx in 18"
                  :key="randomIdx"
                  :value="`random[${randomIdx - 1}]`"
                >
                  Random value {{ randomIdx }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="subpage === 'goals'">
      <GoalTreeEditor
        v-model="editingState.goal"
        :initial-assignments="editingState.initialAssignments"
      />
    </template>
    <template v-else>
      <CPU
        v-model:cpu="editingState.initial"
        v-model:decoder-state="editingState.decoder"
        v-model:mask="editingState.mask"
        allow-mask-editing
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { makeCpuState } from '../engine/cpu';
import { markRaw, reactive, type Ref, ref } from 'vue';
import initialDecoderState from '../config/initialDecoder.json';
import {
  type IDecoderJson,
  readDecoder,
  writeDecoder,
} from '../engine/readDecoder';
import type { IExcerciseEditingState } from '../interfaces/excercises';
import CPU from '../components/CPU.vue';
import GoalTreeEditor from '../components/GoalTreeEditor.vue';
import { saveJson, tryLoadJson } from '../utils/file';

const description = ref('');
const subpage: Ref<'init' | 'desc' | 'inits' | 'goals'> = ref('init');

const initialTargets = [
  'a',
  'b',
  'ram0',
  'ram1',
  'ram2',
  'ram3',
  'ram4',
  'ram5',
  'ram6',
  'ram7',
  'ram8',
  'ram9',
  'ram10',
  'ram11',
  'ram12',
  'ram13',
  'ram14',
  'ram15',
] as Array<keyof IExcerciseEditingState['initialAssignments']>;

const editingState = reactive<IExcerciseEditingState>({
  initial: markRaw(makeCpuState()),
  mask: markRaw(makeCpuState().fill(0xf)),
  decoder: readDecoder(initialDecoderState as IDecoderJson),
  initialAssignments: {},
  description: '',
  goal: {
    join: 'eq',
    goalA: 1,
    goalB: 1,
    not: false,
  },
});

function clear() {
  description.value = '';
}

function load() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tryLoadJson<any>((json) => {
    editingState.initial = markRaw(new Uint8Array(json.cpu));
    editingState.mask = markRaw(new Uint8Array(json.mask));
    editingState.decoder = readDecoder(json.decoder);
    editingState.description = json.description ?? '';
    editingState.initialAssignments = json.initialAssignments;
    editingState.goal = json.goal;
  });
}

function save() {
  saveJson(
    {
      cpu: Array.from(editingState.initial),
      mask: Array.from(editingState.mask),
      decoder: writeDecoder(editingState.decoder),
      initialAssignments: editingState.initialAssignments,
      description: editingState.description,
      goal: editingState.goal,
    },
    'b4task',
  );
}
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 200px;
}
</style>

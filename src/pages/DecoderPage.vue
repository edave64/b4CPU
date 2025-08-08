<template>
  <q-page padding>
    <div>
      <h2>Decoder</h2>
      <table>
        <thead>
          <tr>
            <th>Instruction</th>
            <th v-for="gate in gates" :key="gate">{{ gate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 16" :key="i">
            <td>
              <input
                type="text"
                readonly
                :value="decoderState.instructions[i - 1]!.name"
              />
            </td>

            <td v-for="gate in gates" :key="gate">
              <input
                type="checkbox"
                readonly
                :checked="
                  decoderState.instructions[i - 1]!.gates.has(gate as Gates)
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <thead>
          <tr>
            <th>Timing mask</th>
            <th v-for="gate in gates" :key="gate">{{ gate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stage, stageName) in stages" :key="stageName">
            <td>{{ stageName }}</td>
            <td v-for="gate in gates" :key="gate">
              <input
                type="checkbox"
                readonly
                :checked="decoderState.timingMasks[stage]!.has(gate as Gates)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { useDecoderStore } from '../stores/decoder';
import { AllGates } from '../interfaces/decoder';
import type { Gates } from '../interfaces/decoder';
import { CpuStage } from '../engine/cpu';

const decoderState = useDecoderStore().state;
const gates = AllGates;
const stages = {
  Fetch: CpuStage.Fetch,
  Decode: CpuStage.Decode,
  Read: CpuStage.Read,
  Execute: CpuStage.Execute,
  Write: CpuStage.Write,
} as const;
</script>

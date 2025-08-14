<template>
  <q-page padding>
    <div>
      <h2>Decoder</h2>
      <table>
        <thead>
          <tr>
            <th>Instruction</th>
            <th v-for="gate in gateNames" :key="gate">{{ gate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 16" :key="i">
            <td>
              <input
                type="text"
                :value="decoderState.instructions[i - 1]!.name"
                @input="
                  setInstructionName(
                    i - 1,
                    ($event.target as HTMLInputElement).value,
                  )
                "
              />
            </td>

            <td v-for="gate in gates" :key="gate">
              <input
                type="checkbox"
                :checked="!!(decoderState.instructions[i - 1]!.gates & gate)"
                @input="
                  setInstructionGate(
                    i - 1,
                    gate as Gate,
                    ($event.target as HTMLInputElement).checked,
                  )
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
            <th v-for="gate in gateNames" :key="gate">{{ gate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stage, stageName) in stages" :key="stageName">
            <td>{{ stageName }}</td>
            <td v-for="gate in gates" :key="gate">
              <input
                type="checkbox"
                :checked="!!(decoderState.timingMasks[stage]! & gate)"
                @input="
                  setTimingMask(
                    stage,
                    gate as Gate,
                    ($event.target as HTMLInputElement).checked,
                  )
                "
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
import { AllGates } from '../interfaces/decoder';
import type { IDecoderState } from '../interfaces/decoder';
import { Gate } from '../engine/cpu';
import { CpuStage } from '../engine/cpu';
import { computed, markRaw } from 'vue';
import { useDecoderStore } from '../stores/decoder';

const gateNames = Object.keys(Gate);

const decoderState = computed(() => useDecoderStore().state);
const gates = AllGates;
const stages = {
  Fetch: CpuStage.Fetch,
  Decode: CpuStage.Decode,
  Read: CpuStage.Read,
  Execute: CpuStage.Execute,
  Write: CpuStage.Write,
} as const;

function setInstructionName(op: number, name: string) {
  const newDecoderState = copyDecoderState();
  newDecoderState.instructions[op]!.name = name;
  useDecoderStore().state = markRaw(newDecoderState);
}

function setInstructionGate(op: number, gate: Gate, value: boolean) {
  const newDecoderState = copyDecoderState();
  if (value) {
    newDecoderState.instructions[op]!.gates |= gate;
  } else {
    newDecoderState.instructions[op]!.gates &= ~gate;
  }
  useDecoderStore().state = markRaw(newDecoderState);
}

function setTimingMask(stage: CpuStage, gate: Gate, value: boolean) {
  const newDecoderState = copyDecoderState();
  if (value) {
    newDecoderState.timingMasks[stage] |= gate;
  } else {
    newDecoderState.timingMasks[stage] &= ~gate;
  }
  useDecoderStore().state = markRaw(newDecoderState);
}

function copyDecoderState(): IDecoderState {
  const oldDecoderState = decoderState.value;
  return {
    timingMasks: {
      [CpuStage.Fetch]: oldDecoderState.timingMasks[CpuStage.Fetch],
      [CpuStage.Decode]: oldDecoderState.timingMasks[CpuStage.Decode],
      [CpuStage.Read]: oldDecoderState.timingMasks[CpuStage.Read],
      [CpuStage.Execute]: oldDecoderState.timingMasks[CpuStage.Execute],
      [CpuStage.Write]: oldDecoderState.timingMasks[CpuStage.Write],
    },
    instructions: oldDecoderState.instructions.map((x) => ({
      name: x.name,
      gates: x.gates,
    })),
  };
}
</script>

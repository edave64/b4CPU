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
                :checked="
                  decoderState.instructions[i - 1]!.gates.has(gate as Gates)
                "
                @input="
                  setInstructionGate(
                    i - 1,
                    gate as Gates,
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
            <th v-for="gate in gates" :key="gate">{{ gate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stage, stageName) in stages" :key="stageName">
            <td>{{ stageName }}</td>
            <td v-for="gate in gates" :key="gate">
              <input
                type="checkbox"
                :checked="decoderState.timingMasks[stage]!.has(gate as Gates)"
                @input="
                  setTimingMask(
                    stage,
                    gate as Gates,
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
import type { Gates, IDecoderState } from '../interfaces/decoder';
import { CpuStage } from '../engine/cpu';
import { useCpuStore } from '../stores/cpu';
import { computed, markRaw } from 'vue';

const decoderState = computed(() => useCpuStore().cpu!.decoderState);
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
  useCpuStore().cpu = markRaw(
    useCpuStore().cpu!.withNewDecoder(newDecoderState),
  );
}

function setInstructionGate(op: number, gate: Gates, value: boolean) {
  const newDecoderState = copyDecoderState();
  if (value) {
    newDecoderState.instructions[op]!.gates.add(gate);
  } else {
    newDecoderState.instructions[op]!.gates.delete(gate);
  }
  useCpuStore().cpu = markRaw(
    useCpuStore().cpu!.withNewDecoder(newDecoderState),
  );
}

function setTimingMask(stage: CpuStage, gate: Gates, value: boolean) {
  const newDecoderState = copyDecoderState();
  if (value) {
    newDecoderState.timingMasks[stage].add(gate);
  } else {
    newDecoderState.timingMasks[stage].delete(gate);
  }
  useCpuStore().cpu = markRaw(
    useCpuStore().cpu!.withNewDecoder(newDecoderState),
  );
}

function copyDecoderState(): IDecoderState {
  const oldDecoderState = decoderState.value;
  return {
    timingMasks: {
      [CpuStage.Fetch]: new Set(oldDecoderState.timingMasks[CpuStage.Fetch]),
      [CpuStage.Decode]: new Set(oldDecoderState.timingMasks[CpuStage.Decode]),
      [CpuStage.Read]: new Set(oldDecoderState.timingMasks[CpuStage.Read]),
      [CpuStage.Execute]: new Set(
        oldDecoderState.timingMasks[CpuStage.Execute],
      ),
      [CpuStage.Write]: new Set(oldDecoderState.timingMasks[CpuStage.Write]),
    },
    instructions: oldDecoderState.instructions.map((x) => ({
      name: x.name,
      gates: new Set(x.gates),
    })),
  };
}
</script>

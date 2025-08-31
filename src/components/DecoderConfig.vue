<template>
  <div>
    <h2>Decoder Configuration</h2>
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
              :value="decoderState.instructions[i - 1]?.name ?? ''"
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
                !!((decoderState.instructions[i - 1]?.gates ?? 0) & gate)
              "
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
</template>

<script setup lang="ts">
import { AllGates } from '../interfaces/decoder';
import type { IDecoderState } from '../interfaces/decoder';
import { Gate } from '../engine/cpu';
import { CpuStage } from '../engine/cpu';
import { markRaw } from 'vue';

const gateNames = Object.keys(Gate);

const decoderState = defineModel<IDecoderState>({
  required: true,
});
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
  if (!newDecoderState.instructions[op]) {
    newDecoderState.instructions[op] = {
      name: '',
      gates: 0,
    };
  }
  if (name === '' && !newDecoderState.instructions[op]?.gates) {
    newDecoderState.instructions[op] = undefined;
  } else {
    newDecoderState.instructions[op].name = name;
  }
  decoderState.value = markRaw(newDecoderState);
}

function setInstructionGate(op: number, gate: Gate, value: boolean) {
  const newDecoderState = copyDecoderState();
  if (!newDecoderState.instructions[op]) {
    newDecoderState.instructions[op] = {
      name: '',
      gates: 0,
    };
  }
  if (value) {
    newDecoderState.instructions[op].gates |= gate;
  } else {
    newDecoderState.instructions[op].gates &= ~gate;
  }
  if (
    !newDecoderState.instructions[op].name &&
    !newDecoderState.instructions[op].gates
  ) {
    newDecoderState.instructions[op] = undefined;
  }
  decoderState.value = markRaw(newDecoderState);
}

function setTimingMask(stage: CpuStage, gate: Gate, value: boolean) {
  const newDecoderState = copyDecoderState();
  if (value) {
    newDecoderState.timingMasks[stage] |= gate;
  } else {
    newDecoderState.timingMasks[stage] &= ~gate;
  }
  decoderState.value = markRaw(newDecoderState);
}

function copyDecoderState(): IDecoderState {
  const oldDecoderState = decoderState.value;
  return {
    instructions: oldDecoderState.instructions.map((x) => (x ? { ...x } : x)),
    timingMasks: {
      ...oldDecoderState.timingMasks,
    },
  };
}
</script>

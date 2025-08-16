<template>
  <svg
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 1080"
    version="1.1"
    height="100%"
    width="100%"
  >
    <g>
      <text x="4" y="1008" id="databus_label">Data</text>
      <bus
        id="main_data_bus"
        :x="0"
        :y="1016"
        :value="dataBus"
        dir="horizontal"
        :length="1920"
      />
      <text x="8" y="904" id="addressbus_label">Address</text>
      <bus
        id="main_address_bus"
        :x="0"
        :y="912"
        :value="addressBus"
        dir="horizontal"
        :length="1920"
      />
      <bus
        id="program_out_address"
        :x="264"
        :y="856"
        :value="addressBus"
        dir="vertical"
        :length="112"
        taperedEnd
      />
      <bus
        id="program_out_data"
        :x="432"
        :y="856"
        :value="dataBus"
        dir="vertical"
        :length="216"
        taperedEnd
      />

      <bus
        id="pc_in_address"
        :x="808"
        :y="768"
        :value="addressBus"
        dir="vertical"
        :length="200"
        taperedEnd
      />

      <bus
        id="incrementor_bus"
        :x="576"
        :y="776"
        :value="pc + 1"
        dir="horizontal"
        :length="192"
        taperedStart
        taperedEnd
      />
      <bus
        id="incrementor_out"
        :x="576"
        :y="768"
        :value="pc + 1"
        dir="vertical"
        :length="64"
        taperedEnd
      />
      <bus
        id="pc_incrementor_in"
        :x="712"
        :y="768"
        :value="pc + 1"
        dir="vertical"
        :length="64"
        taperedEnd
      />
      <bus
        id="pc_bus"
        :x="552"
        :y="640"
        :value="pc"
        dir="horizontal"
        :length="152"
      />

      <bus
        id="incrementor_in"
        :x="576"
        :y="640"
        :value="pc"
        dir="vertical"
        :length="80"
        taperedStart
      />

      <bus
        id="alu_out"
        :x="1144"
        :y="592"
        :value="dataBus"
        dir="vertical"
        :length="480"
        taperedEnd
      />

      <bus
        id="databus_registers_ext"
        :x="1568"
        :y="200"
        :value="dataBus"
        dir="vertical"
        :length="872"
        taperedStart
        taperedEnd
      />
      <bus
        id="databus_registers"
        :x="1040"
        :y="200"
        :value="dataBus"
        dir="horizontal"
        :length="582"
        taperedStart
        taperedEnd
      />
      <bus
        id="register_A_in"
        :x="1040"
        :y="200"
        :value="dataBus"
        dir="vertical"
        :length="64"
        taperedStart
      />
      <bus
        id="register_B_in"
        :x="1248"
        :y="200"
        :value="dataBus"
        dir="vertical"
        :length="64"
        taperedStart
      />
      <lane
        dir="horizontal"
        :length="16"
        :value="CpuAccessor.getFlagZ(cpu)"
        :x="968"
        :y="448"
      />
      <lane
        dir="horizontal"
        :length="16"
        :value="CpuAccessor.getFlagO(cpu)"
        :x="968"
        :y="464"
      />
      <lane :length="264" :x="936" :y="488" dir="vertical" :value="false" />
      <lane :length="72" :x="872" :y="744" dir="horizontal" :value="false" />

      <lane
        :length="328"
        :x="920"
        :y="104"
        dir="vertical"
        :value="!!(gates & Gate.JN)"
      />
      <lane
        :length="328"
        :x="936"
        :y="104"
        dir="vertical"
        :value="!!(gates & Gate.JZ)"
      />
      <lane
        :length="328"
        :x="952"
        :y="104"
        dir="vertical"
        :value="!!(gates & Gate.JO)"
      />

      <lane
        dir="horizontal"
        :value="!!(gates & Gate.AW)"
        :length="16"
        :x="1152"
        :y="272"
      />
      <lane
        dir="vertical"
        :value="!!(gates & Gate.AW)"
        :length="176"
        :x="1160"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(gates & Gate.AR)"
        :length="32"
        :x="1152"
        :y="288"
      />
      <lane
        dir="vertical"
        :value="!!(gates & Gate.AR)"
        :length="192"
        :x="1176"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(gates & Gate.BW)"
        :length="16"
        :x="1360"
        :y="272"
      />
      <lane
        dir="vertical"
        :value="!!(gates & Gate.BW)"
        :length="176"
        :x="1368"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(gates & Gate.BR)"
        :length="32"
        :x="1360"
        :y="288"
      />
      <lane
        dir="vertical"
        :value="!!(gates & Gate.BR)"
        :length="192"
        :x="1384"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(gates & Gate.RW)"
        :length="32"
        :x="1672"
        :y="856"
      />
      <lane
        dir="vertical"
        :value="!!(gates & Gate.RW)"
        :length="760"
        :x="1672"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(gates & Gate.RR)"
        :length="48"
        :x="1656"
        :y="872"
      />
      <lane
        dir="vertical"
        :value="!!(gates & Gate.RR)"
        :length="776"
        :x="1656"
        :y="104"
      />

      <bus
        dir="vertical"
        :length="32"
        :value="CpuAccessor.getInstructionsOp(cpu, pc)"
        :x="96"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(aluOp & 0b01)"
        :length="56"
        :x="1360"
        :y="416"
      />
      <lane
        dir="vertical"
        :value="!!(aluOp & 0b01)"
        :length="320"
        :x="1408"
        :y="104"
      />
      <lane
        dir="horizontal"
        :value="!!(aluOp & 0b10)"
        :length="72"
        :x="1360"
        :y="432"
      />
      <lane
        dir="vertical"
        :value="!!(aluOp & 0b10)"
        :length="336"
        :x="1424"
        :y="104"
      />

      <bus
        id="ram_in_address"
        :x="1840"
        :y="856"
        :value="addressBus"
        dir="vertical"
        :length="112"
        taperedEnd
      />

      <bus
        id="databus_ram"
        :x="1744"
        :y="896"
        :value="dataBus"
        dir="vertical"
        :length="176"
        taperedEnd
      />

      <control-unit
        ref="controlComp"
        v-model:cpu="cpu"
        :decoder-state="decoderState"
        @keydown="navKey(controlComp, $event)"
      />
      <instruction-memory
        ref="romComp"
        v-model:cpu="cpu"
        :decoder-state="decoderState"
        @keydown="navKey(romComp, $event)"
      />
      <data-memory
        ref="dataComp"
        v-model:cpu="cpu"
        @keydown="navKey(dataComp, $event)"
      />

      <register
        name="A"
        :x="984"
        :y="264"
        ref="regAComp"
        v-model="regA"
        :command-read="!!(gates & Gate.AR)"
        :command-write="!!(gates & Gate.AW)"
        @keydown="navKey(regAComp, $event)"
      />
      <register
        name="B"
        :x="1192"
        :y="264"
        ref="regBComp"
        v-model="regB"
        :command-read="!!(gates & Gate.BR)"
        :command-write="!!(gates & Gate.BW)"
        @keydown="navKey(regBComp, $event)"
      />

      <alu
        ref="aluComp"
        :select="aluOp"
        v-model:flag-o="flagO"
        v-model:flag-z="flagZ"
        @keydown="navKey(aluComp, $event)"
      />
      <bus
        id="alu_in_A"
        dir="vertical"
        :length="40"
        :x="1040"
        :y="360"
        :value="regA"
      />
      <bus
        id="alu_in_B"
        dir="vertical"
        :length="40"
        :x="1248"
        :y="360"
        :value="regB"
      />

      <jump-manager />
      <program-counter
        ref="pcComp"
        v-model="pc"
        :jump="false"
        @keydown="navKey(pcComp, $event)"
      />
      <incrementor />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import type { CpuState } from '../engine/cpu';
import { CpuAccessor, getAluOp, updateCpu } from '../engine/cpu';
import type { IExcerciseState } from '../interfaces/excercises';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import alu from './ALU.vue';
import bus from './BusLanes.vue';
import ControlUnit from './ControlUnit.vue';
import DataMemory from './DataMemory.vue';
import Incrementor from './IncrementorUnit.vue';
import InstructionMemory from './InstructionMemory.vue';
import JumpManager from './JumpManager.vue';
import lane from './BusLane.vue';
import ProgramCounter from './ProgramCounter.vue';
import Register from './DataRegister.vue';
import { Gate } from '../engine/cpu';
import type { IDecoderState } from '../interfaces/decoder';

defineProps({
  excerciseState: {
    type: Object as PropType<IExcerciseState>,
  },

  decoderState: {
    type: Object as PropType<IDecoderState>,
    required: true,
  },
});

const cpu = defineModel<CpuState>('cpu', {
  required: true,
});

const romComp = ref(null as typeof InstructionMemory | null);
const dataComp = ref(null as typeof DataMemory | null);
const regAComp = ref(null as typeof Register | null);
const regBComp = ref(null as typeof Register | null);
const aluComp = ref(null as typeof alu | null);
const controlComp = ref(null as typeof ControlUnit | null);
const pcComp = ref(null as typeof ProgramCounter | null);
const compOrder = [
  controlComp,
  romComp,
  dataComp,
  regAComp,
  regBComp,
  aluComp,
  pcComp,
];

function navKey(sender: unknown, e: KeyboardEvent) {
  if (e.key === 'PageUp' || e.key === 'PageDown') {
    const delta = e.key === 'PageUp' ? compOrder.length - 1 : 1;
    const idx = compOrder.findIndex((x) => x.value === sender);
    if (idx === -1) return;
    compOrder[(idx + delta) % compOrder.length]?.value?.doFocus();
    e.preventDefault();
    e.stopPropagation();
  }
}

const gates = computed(() => {
  const stage = CpuAccessor.getStage(cpu.value);
  return CpuAccessor.getLastDecodedGates(cpu.value, stage);
});
const addressBus = computed(() => {
  return CpuAccessor.getInstructionsAddr(
    cpu.value,
    CpuAccessor.getPc(cpu.value),
  );
});
const dataBus = computed(() => {
  return CpuAccessor.getDataBus(cpu.value);
});

const aluOp = computed(() => {
  return getAluOp(gates.value);
});

const regA = computed({
  get() {
    return CpuAccessor.getRegA(cpu.value);
  },
  set(value) {
    cpu.value = updateCpu(cpu.value, (cpu) => {
      CpuAccessor.setRegA(cpu, value);
    });
  },
});
const regB = computed({
  get() {
    return CpuAccessor.getRegB(cpu.value);
  },
  set(value) {
    cpu.value = updateCpu(cpu.value, (cpu) => {
      CpuAccessor.setRegB(cpu, value);
    });
  },
});
const pc = computed({
  get() {
    return CpuAccessor.getPc(cpu.value);
  },
  set(value) {
    cpu.value = updateCpu(cpu.value, (cpu) => {
      CpuAccessor.setPc(cpu, value);
    });
  },
});

const flagO = computed({
  get() {
    return CpuAccessor.getFlagO(cpu.value);
  },
  set(value) {
    cpu.value = updateCpu(cpu.value, (cpu) => {
      CpuAccessor.setFlagO(cpu, value);
    });
  },
});
const flagZ = computed({
  get() {
    return CpuAccessor.getFlagZ(cpu.value);
  },
  set(value) {
    cpu.value = updateCpu(cpu.value, (cpu) => {
      CpuAccessor.setFlagZ(cpu, value);
    });
  },
});
</script>

<style lang="scss" scoped>
svg {
  max-height: calc(100vh - 50px);
}

text {
  font-size: 32px;
  font-family: sans-serif;
  fill: var(--object-text-color);
}
</style>

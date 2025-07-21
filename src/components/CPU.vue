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
        :value="cpu.data.value"
        dir="horizontal"
        :length="1920"
      />
      <text x="8" y="904" id="addressbus_label">Address</text>
      <bus
        id="main_address_bus"
        :x="0"
        :y="912"
        :value="cpu.address.value"
        dir="horizontal"
        :length="1920"
      />
      <bus
        id="program_out_address"
        :x="264"
        :y="856"
        :value="cpu.address.value"
        dir="vertical"
        :length="112"
        taperedEnd
      />

      <bus
        id="program_out_data"
        :x="432"
        :y="856"
        :value="cpu.data.value"
        dir="vertical"
        :length="216"
        taperedEnd
      />

      <bus
        id="pc_in_address"
        :x="808"
        :y="768"
        :value="cpu.address.value"
        dir="vertical"
        :length="200"
        taperedEnd
      />

      <bus
        id="incrementor_bus"
        :x="576"
        :y="776"
        :value="cpu.pc.value + 1"
        dir="horizontal"
        :length="192"
        taperedStart
        taperedEnd
      />
      <bus
        id="incrementor_out"
        :x="576"
        :y="768"
        :value="cpu.pc.value + 1"
        dir="vertical"
        :length="64"
        taperedEnd
      />
      <bus
        id="pc_incrementor_in"
        :x="712"
        :y="768"
        :value="cpu.pc.value + 1"
        dir="vertical"
        :length="64"
        taperedEnd
      />
      <bus
        id="pc_bus"
        :x="552"
        :y="640"
        :value="cpu.pc.value"
        dir="horizontal"
        :length="152"
      />

      <bus
        id="incrementor_in"
        :x="576"
        :y="640"
        :value="cpu.pc.value"
        dir="vertical"
        :length="80"
        taperedStart
      />

      <bus
        id="register_C_out"
        :x="1144"
        :y="728"
        :value="cpu.data.value"
        dir="vertical"
        :length="344"
        taperedEnd
      />
      <bus
        id="databus_registers_ext"
        :x="1568"
        :y="200"
        :value="cpu.data.value"
        dir="vertical"
        :length="872"
        taperedStart
        taperedEnd
      />
      <bus
        id="databus_registers"
        :x="1040"
        :y="200"
        :value="cpu.data.value"
        dir="horizontal"
        :length="582"
        taperedStart
        taperedEnd
      />
      <bus
        id="register_A_in"
        :x="1040"
        :y="200"
        :value="cpu.data.value"
        dir="vertical"
        :length="64"
        taperedStart
      />
      <bus
        id="register_B_in"
        :x="1248"
        :y="200"
        :value="cpu.data.value"
        dir="vertical"
        :length="64"
        taperedStart
      />
      <lane
        dir="horizontal"
        :length="16"
        :value="cpu.flagZ.value"
        :x="968"
        :y="448"
      />
      <lane
        dir="horizontal"
        :length="16"
        :value="cpu.flagO.value"
        :x="968"
        :y="464"
      />
      <lane
        :length="264"
        :x="936"
        :y="488"
        dir="vertical"
        :value="cpu.pcJump"
      />
      <lane
        :length="72"
        :x="872"
        :y="744"
        dir="horizontal"
        :value="cpu.pcJump"
      />

      <lane
        :length="632"
        :x="880"
        :y="104"
        dir="vertical"
        :value="cpu.pcAdvance"
      />
      <lane
        :length="14"
        :x="872"
        :y="728"
        dir="horizontal"
        :value="cpu.pcAdvance"
      />

      <lane
        :length="328"
        :x="920"
        :y="104"
        dir="vertical"
        :value="cpu.jmpNot"
      />
      <lane
        :length="328"
        :x="936"
        :y="104"
        dir="vertical"
        :value="cpu.jmpZero"
      />
      <lane
        :length="328"
        :x="952"
        :y="104"
        dir="vertical"
        :value="cpu.jmpOverflow"
      />

      <lane
        dir="horizontal"
        :value="cpu.regAWrite"
        :length="16"
        :x="1152"
        :y="272"
      />
      <lane
        dir="vertical"
        :value="cpu.regAWrite"
        :length="176"
        :x="1160"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.regARead"
        :length="32"
        :x="1152"
        :y="288"
      />
      <lane
        dir="vertical"
        :value="cpu.regARead"
        :length="192"
        :x="1176"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.regBRead"
        :length="16"
        :x="1360"
        :y="272"
      />
      <lane
        dir="vertical"
        :value="cpu.regBRead"
        :length="176"
        :x="1368"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.regBWrite"
        :length="32"
        :x="1360"
        :y="288"
      />
      <lane
        dir="vertical"
        :value="cpu.regBWrite"
        :length="192"
        :x="1384"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.regCRead"
        :length="264"
        :x="1256"
        :y="656"
      />
      <lane
        dir="vertical"
        :value="cpu.regCRead"
        :length="560"
        :x="1512"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.regCWrite"
        :length="248"
        :x="1256"
        :y="640"
      />
      <lane
        dir="vertical"
        :value="cpu.regCWrite"
        :length="544"
        :x="1496"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.ramWrite"
        :length="32"
        :x="1672"
        :y="856"
      />
      <lane
        dir="vertical"
        :value="cpu.ramWrite"
        :length="760"
        :x="1672"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="cpu.ramRead"
        :length="48"
        :x="1656"
        :y="872"
      />
      <lane
        dir="vertical"
        :value="cpu.ramRead"
        :length="776"
        :x="1656"
        :y="104"
      />

      <bus
        dir="vertical"
        :length="32"
        :value="cpu.instructionsOp[cpu.pc.value]"
        :x="96"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="!!(cpu.aluOp & 0b01)"
        :length="56"
        :x="1360"
        :y="416"
      />
      <lane
        dir="vertical"
        :value="!!(cpu.aluOp & 0b01)"
        :length="320"
        :x="1408"
        :y="104"
      />
      <lane
        dir="horizontal"
        :value="!!(cpu.aluOp & 0b10)"
        :length="72"
        :x="1360"
        :y="432"
      />
      <lane
        dir="vertical"
        :value="!!(cpu.aluOp & 0b10)"
        :length="336"
        :x="1424"
        :y="104"
      />

      <bus
        id="ram_in_address"
        :x="1840"
        :y="856"
        :value="cpu.address.value"
        dir="vertical"
        :length="112"
        taperedEnd
      />

      <bus
        id="databus_ram"
        :x="1744"
        :y="896"
        :value="cpu.data.value"
        dir="vertical"
        :length="176"
        taperedEnd
      />

      <control-unit
        ref="controlComp"
        :cpu="cpu"
        @keydown="navKey(controlComp, $event)"
      />
      <instruction-memory
        ref="romComp"
        :cpu="cpu"
        @keydown="navKey(romComp, $event)"
      />
      <data-memory
        ref="dataComp"
        :cpu="cpu"
        @keydown="navKey(dataComp, $event)"
      />

      <register
        name="A"
        :x="984"
        :y="264"
        ref="regAComp"
        v-model="cpu.regA.value"
        :command-read="cpu.regARead"
        :command-write="cpu.regAWrite"
        @keydown="navKey(regAComp, $event)"
      />
      <register
        name="B"
        :x="1192"
        :y="264"
        ref="regBComp"
        v-model="cpu.regB.value"
        :command-read="cpu.regBRead"
        :command-write="cpu.regBWrite"
        @keydown="navKey(regBComp, $event)"
      />
      <register
        name="C"
        :x="1088"
        :y="632"
        ref="regCComp"
        v-model="cpu.regC.value"
        :command-read="cpu.regCRead"
        :command-write="cpu.regCWrite"
        @keydown="navKey(regCComp, $event)"
      />

      <alu
        ref="aluComp"
        :select="cpu.aluOp"
        v-model:flag-z="cpu.flagZ.value"
        v-model:flag-o="cpu.flagO.value"
        @keydown="navKey(aluComp, $event)"
      />
      <bus
        id="alu_in_A"
        dir="vertical"
        :length="40"
        :x="1040"
        :y="360"
        :value="cpu.regA.value"
      />
      <bus
        id="alu_in_B"
        dir="vertical"
        :length="40"
        :x="1248"
        :y="360"
        :value="cpu.regB.value"
      />
      <bus
        id="alu_out"
        dir="vertical"
        :length="40"
        :x="1144"
        :y="592"
        :value="cpu.aluOut.value"
      />

      <jump-manager />
      <program-counter
        ref="pcComp"
        v-model="cpu.pc.value"
        :jump-to-addr="cpu.pcJump"
        :jump-to-next="cpu.pcAdvance"
        @keydown="navKey(pcComp, $event)"
      />
      <incrementor />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { Cpu } from '../engine/cpu';
import type { IDecoderState } from '../interfaces/decoder';
import type { IExcerciseState } from '../interfaces/excercises';
import type { PropType } from 'vue';
import { markRaw, ref } from 'vue';
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

const props = defineProps({
  excerciseState: {
    type: Object as PropType<IExcerciseState>,
    required: true,
  },
  decoderState: {
    type: Object as PropType<IDecoderState>,
    required: true,
  },
});

const romComp = ref(null as typeof InstructionMemory | null);
const dataComp = ref(null as typeof DataMemory | null);
const regAComp = ref(null as typeof Register | null);
const regBComp = ref(null as typeof Register | null);
const regCComp = ref(null as typeof Register | null);
const aluComp = ref(null as typeof alu | null);
const controlComp = ref(null as typeof ControlUnit | null);
const pcComp = ref(null as typeof ProgramCounter | null);
const compOrder = [
  controlComp,
  romComp,
  dataComp,
  regAComp,
  regBComp,
  regCComp,
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

const cpu = markRaw(new Cpu(props.decoderState));
</script>

<style lang="scss" scoped>
svg {
  max-height: calc(100vh - 50px);
}

text {
  font-size: 32px;
  font-family: sans-serif;
}
</style>

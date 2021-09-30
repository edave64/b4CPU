<template>
  <svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    viewBox="0 0 1920 1080"
    version="1.1"
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
        :taperedEnd="true"
      />

      <bus
        id="program_out_data"
        :x="432"
        :y="856"
        :value="dataBus"
        dir="vertical"
        :length="216"
        :taperedEnd="true"
      />

      <bus
        id="pc_in_address"
        :x="808"
        :y="768"
        :value="addressBus"
        dir="vertical"
        :length="200"
        :taperedEnd="true"
      />

      <bus
        id="incrementor_bus"
        :x="576"
        :y="776"
        :value="pcBus + 1"
        dir="horizontal"
        :length="192"
        :taperedStart="true"
        :taperedEnd="true"
      />
      <bus
        id="incrementor_out"
        :x="576"
        :y="768"
        :value="pcBus + 1"
        dir="vertical"
        :length="64"
        :taperedEnd="true"
      />
      <bus
        id="pc_incrementor_in"
        :x="712"
        :y="768"
        :value="pcBus + 1"
        dir="vertical"
        :length="64"
        :taperedEnd="true"
      />
      <bus
        id="pc_bus"
        :x="552"
        :y="640"
        :value="pcBus"
        dir="horizontal"
        :length="152"
      />

      <bus
        id="incrementor_in"
        :x="576"
        :y="640"
        :value="pcBus"
        dir="vertical"
        :length="80"
        :taperedStart="true"
      />

      <bus
        id="register_C_out"
        :x="1144"
        :y="728"
        :value="dataBus"
        dir="vertical"
        :length="344"
        :taperedEnd="true"
      />
      <bus
        id="databus_registers_ext"
        :x="1568"
        :y="200"
        :value="dataBus"
        dir="vertical"
        :length="872"
        :taperedStart="true"
        :taperedEnd="true"
      />
      <bus
        id="databus_registers"
        :x="1040"
        :y="200"
        :value="dataBus"
        dir="horizonal"
        :length="582"
        :taperedStart="true"
        :taperedEnd="true"
      />
      <bus
        id="register_A_in"
        :x="1040"
        :y="200"
        :value="dataBus"
        dir="vertical"
        :length="64"
        :taperedStart="true"
      />
      <bus
        id="register_B_in"
        :x="1248"
        :y="200"
        :value="dataBus"
        dir="vertical"
        :length="64"
        :taperedStart="true"
      />
      <lane dir="horizontal" :length="16" :value="aluZero" :x="968" :y="448" />
      <lane
        dir="horizontal"
        :length="16"
        :value="aluOverflow"
        :x="968"
        :y="464"
      />
      <lane :length="264" :x="944" :y="488" dir="vertical" :value="jmpAddr" />
      <lane :length="80" :x="872" :y="744" dir="horizontal" :value="jmpAddr" />

      <lane :length="248" :x="928" :y="488" dir="vertical" :value="jmpNext" />
      <lane :length="64" :x="872" :y="728" dir="horizontal" :value="jmpNext" />
      <lane :length="632" :x="880" :y="104" dir="vertical" :value="jmpNext" />

      <lane
        :length="328"
        :x="920"
        :y="104"
        dir="vertical"
        :value="jmpNotCommand"
      />
      <lane
        :length="328"
        :x="936"
        :y="104"
        dir="vertical"
        :value="jmpZeroCommand"
      />
      <lane
        :length="328"
        :x="952"
        :y="104"
        dir="vertical"
        :value="jmpOverflowCommand"
      />

      <lane
        dir="horizontal"
        :value="regAWriteCommand"
        :length="16"
        :x="1152"
        :y="272"
      />
      <lane
        dir="vertical"
        :value="regAWriteCommand"
        :length="176"
        :x="1160"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="regAReadCommand"
        :length="32"
        :x="1152"
        :y="288"
      />
      <lane
        dir="vertical"
        :value="regAReadCommand"
        :length="192"
        :x="1176"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="regBReadCommand"
        :length="16"
        :x="1360"
        :y="272"
      />
      <lane
        dir="vertical"
        :value="regBReadCommand"
        :length="176"
        :x="1368"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="regBWriteCommand"
        :length="32"
        :x="1360"
        :y="288"
      />
      <lane
        dir="vertical"
        :value="regBWriteCommand"
        :length="192"
        :x="1384"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="regCReadCommand"
        :length="264"
        :x="1256"
        :y="656"
      />
      <lane
        dir="vertical"
        :value="regCReadCommand"
        :length="560"
        :x="1512"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="regCWriteCommand"
        :length="248"
        :x="1256"
        :y="640"
      />
      <lane
        dir="vertical"
        :value="regCWriteCommand"
        :length="544"
        :x="1496"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="ramWriteCommand"
        :length="32"
        :x="1672"
        :y="856"
      />
      <lane
        dir="vertical"
        :value="ramWriteCommand"
        :length="760"
        :x="1672"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="ramReadCommand"
        :length="48"
        :x="1656"
        :y="872"
      />
      <lane
        dir="vertical"
        :value="ramReadCommand"
        :length="776"
        :x="1656"
        :y="104"
      />

      <bus
        dir="vertical"
        :length="32"
        :value="instructionBus"
        :x="96"
        :y="104"
      />

      <lane
        dir="horizontal"
        :value="aluCommand1"
        :length="56"
        :x="1360"
        :y="416"
      />
      <lane
        dir="vertical"
        :value="aluCommand1"
        :length="320"
        :x="1408"
        :y="104"
      />
      <lane
        dir="horizontal"
        :value="aluCommand2"
        :length="72"
        :x="1360"
        :y="432"
      />
      <lane
        dir="vertical"
        :value="aluCommand2"
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
        :taperedEnd="true"
      />

      <bus
        id="databus_ram"
        :x="1744"
        :y="896"
        :value="dataBus"
        dir="vertical"
        :length="176"
        :taperedEnd="true"
      />

      <instruction-memory
        :initialState="excerciseState.instructionMemoryState"
        :program-counter="pcBus"
        @data-write="databusInInstructionMemory = $event"
        @address-write="addressbusInInstructionMemory = $event"
        @instruction-write="instructionBus = $event"
      />
      <data-memory
        :initialState="excerciseState.dataMemoryState"
        :address="addressBus"
        :readCommand="ramReadCommand"
        :writeCommand="ramWriteCommand"
        :readFrom="dataBus"
        @data-write="databusInRam = $event"
      />

      <register
        name="A"
        :x="984"
        :y="264"
        :commandRead="regAReadCommand"
        :commandWrite="regAWriteCommand"
        :readFrom="dataBus"
        @input="regA = $event"
        @write="databusInRegA = $event"
      />
      <register
        name="B"
        :x="1192"
        :y="264"
        :commandRead="regBReadCommand"
        :commandWrite="regBWriteCommand"
        :readFrom="dataBus"
        @input="regB = $event"
        @write="databusInRegB = $event"
      />
      <register
        name="C"
        :x="1088"
        :y="632"
        :commandRead="regCReadCommand"
        :commandWrite="regCWriteCommand"
        :readFrom="aluOut"
        @input="regC = $event"
        @write="databusInRegC = $event"
      />

      <alu
        :inputA="regA"
        :inputB="regB"
        :select1="aluCommand1"
        :select2="aluCommand2"
        @zero-write="aluZero = $event"
        @overflow-write="aluOverflow = $event"
        @input="aluOut = $event"
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
      <bus
        id="alu_out"
        dir="vertical"
        :length="40"
        :x="1144"
        :y="592"
        :value="aluOut"
      />

      <jump-manager />
      <control-unit
        :decoderState="decoderState"
        :instruction="instructionBus"
        @write-next="jmpNextDecoderIn = $event"
        @write-jmp-not="jmpNotCommand = $event"
        @write-jmp-overflow="jmpOverflowCommand = $event"
        @write-jmp-zero="jmpZeroCommand = $event"
        @write-reg-a-read="regAReadCommand = $event"
        @write-reg-a-write="regAWriteCommand = $event"
        @write-reg-b-read="regBReadCommand = $event"
        @write-reg-b-write="regBWriteCommand = $event"
        @write-reg-c-read="regCReadCommand = $event"
        @write-reg-c-write="regCWriteCommand = $event"
        @write-alu1="aluCommand1 = $event"
        @write-alu2="aluCommand2 = $event"
        @write-ram-read="ramReadCommand = $event"
        @write-ram-write="ramWriteCommand = $event"
      />
      <program-counter
        :jump-to-addr="jmpAddr"
        :jump-to-next="jmpNext"
        :next-value="pcBus + 1"
        :address-bus="addressBus"
        @pc-write="pcBus = $event"
      />
      <incrementor />
    </g>
  </svg>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
} from '@vue/composition-api';
import { IDecoderState } from 'src/interfaces/decoder';
import { IExcerciseState } from 'src/interfaces/excercises';
import alu from './ALU.vue';
import Bus from './Bus.vue';
import ControlUnit from './ControlUnit.vue';
import DataMemory from './DataMemory.vue';
import Incrementor from './Incrementor.vue';
import InstructionMemory from './InstructionMemory.vue';
import JumpManager from './JumpManager.vue';
import Lane from './Lane.vue';
import ProgramCounter from './ProgramCounter.vue';
import Register from './Register.vue';
import StepIndicator from './StepIndicator.vue';

export default defineComponent({
  name: 'cpu',
  components: {
    DataMemory,
    InstructionMemory,
    alu,
    JumpManager,
    ControlUnit,
    ProgramCounter,
    Incrementor,
    Bus,
    Lane,
    Register,
    StepIndicator,
  },
  props: {
    excerciseState: {
      type: Object as PropType<IExcerciseState>,
      required: true,
    },
    decoderState: {
      type: Object as PropType<IDecoderState>,
      required: true,
    },
  },
  methods: {},
  setup(props) {
    const instruction = ref(0);
    // const addressBus = ref(0);
    const pcBus = ref(0);

    const databusInInstructionMemory = ref(0);
    const databusInRam = ref(0);
    const databusInRegA = ref(0);
    const databusInRegB = ref(0);
    const databusInRegC = ref(0);

    const jmpNotCommand = ref(false);
    const jmpZeroCommand = ref(false);
    const jmpOverflowCommand = ref(false);

    const regA = ref(0);
    const regAReadCommand = ref(false);
    const regAWriteCommand = ref(false);
    const regB = ref(0);
    const regBReadCommand = ref(false);
    const regBWriteCommand = ref(false);
    const regC = ref(0);
    const regCReadCommand = ref(false);
    const regCWriteCommand = ref(false);

    const aluOut = ref(0);
    const aluZero = ref(false);
    const aluOverflow = ref(false);

    const aluCommand1 = ref(false);
    const aluCommand2 = ref(false);

    const ramReadCommand = ref(false);
    const ramWriteCommand = ref(false);

    function jmpCommand(): { next: boolean; addr: boolean } {
      if (!jmpZeroCommand.value && !jmpOverflowCommand.value) {
        // Unconditional jump
        return {
          next: false,
          addr: jmpNotCommand.value,
        };
      }
      let jump = true;
      if (jmpZeroCommand.value && !aluZero.value) jump = false;
      if (jmpOverflowCommand.value && !aluOverflow.value) jump = false;
      if (jump === !jmpNotCommand.value) {
        return {
          next: false,
          addr: true,
        };
      } else {
        return {
          next: true,
          addr: false,
        };
      }
    }

    const jmpNextDecoderIn = ref(false);
    const jmpNextMngIn = computed(() => jmpCommand().next);
    const jmpAddr = computed(() => jmpCommand().addr);
    const jmpNext = computed(
      () => jmpNextMngIn.value || jmpNextDecoderIn.value
    );

    const addressbusInInstructionMemory = ref(0);
    const addressBus = computed(() => {
      return addressbusInInstructionMemory.value;
    });

    const instructionBus = ref(0);

    const dataBus = computed(() => {
      return (
        databusInInstructionMemory.value |
        databusInRam.value |
        databusInRegA.value |
        databusInRegB.value |
        databusInRegC.value
      );
    });

    onMounted(() => {
      // console.log(JSON.stringify(props.excerciseState));
    });

    return {
      instruction,
      addressBus,
      dataBus,
      pcBus,
      databusInInstructionMemory,
      databusInRam,
      databusInRegA,
      databusInRegB,
      databusInRegC,
      addressbusInInstructionMemory,
      instructionBus,
      regA,
      regAReadCommand,
      regAWriteCommand,
      regB,
      regBReadCommand,
      regBWriteCommand,
      regC,
      regCReadCommand,
      regCWriteCommand,
      aluOut,
      aluZero,
      aluOverflow,
      aluCommand1,
      aluCommand2,
      ramWriteCommand,
      ramReadCommand,
      jmpNextDecoderIn,
      jmpNextMngIn,
      jmpNext,
      jmpAddr,
      jmpNotCommand,
      jmpZeroCommand,
      jmpOverflowCommand,
    };
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
}
</style>

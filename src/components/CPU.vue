<template>
  <svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    version="1.1"
    id="svg8"
    inkscape:version="1.0.2 (e86c870879, 2021-01-15, custom)"
  >
    <defs id="defs2">
      <inkscape:perspective
        inkscape:vp_x="0 : 540 : 1"
        inkscape:vp_y="0 : 3779.5279 : 0"
        inkscape:vp_z="1920 : 540 : 1"
        inkscape:persp3d-origin="960 : 360 : 1"
        id="perspective2841"
      />
    </defs>
    <metadata id="metadata5">
      <rdf:RDF>
        <cc:Work rdf:about="">
          <dc:format>image/svg+xml</dc:format>
          <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          <dc:title></dc:title>
        </cc:Work>
      </rdf:RDF>
    </metadata>
    <g inkscape:label="Basis" inkscape:groupmode="layer" id="layer1">
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 32.2036px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill-opacity: 1;
          stroke-width: 0.805091;
        "
        x="4"
        y="1008"
        id="databus_label"
      >
        <tspan id="tspan889" x="4" y="1008" style="stroke-width: 0.805091">
          Data
        </tspan>
      </text>
      <bus
        id="main_data_bus"
        :x="0"
        :y="1016"
        :value="dataBus"
        dir="horizontal"
        :length="1920"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 32.2036px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill-opacity: 1;
          stroke-width: 0.805091;
        "
        x="8"
        y="904"
        id="addressbus_label"
      >
        <tspan id="tspan" x="8" y="904" style="stroke-width: 0.805091">
          Address
        </tspan>
      </text>
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
        id="incrementor_out"
        :x="576"
        :y="768"
        :value="pcBus + 1"
        dir="vertical"
        :length="64"
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
      <rect id="alu_zero" width="16" height="8" x="968" y="448" />
      <rect id="alu_overflow" width="16" height="8" x="968" y="464" />
      <g id="jump_to_address">
        <rect id="jump_condition_met" width="8" height="264" x="936" y="488" />
        <rect id="bus_jmpFromAddress" width="72" height="8" x="872" y="744" />
      </g>
      <g id="jump_to_inc">
        <rect id="rect2867" width="16" height="8" x="872" y="728" />
        <rect id="rect2869" width="8" height="632" x="880" y="104" />
      </g>
      <rect id="command_negateJump" width="8" height="328" x="920" y="104" />
      <rect id="command_jump_z" width="8" height="328" x="936" y="104" />
      <rect id="command_jump_o" width="8" height="328" x="952" y="104" />
      <g id="register_A_read">
        <rect id="rect2881" width="16" height="8" x="1152" y="272" />
        <rect id="rect2883" width="8" height="176" x="1160" y="104" />
      </g>
      <g id="register_A_write">
        <rect id="rect2885" width="32" height="8" x="1152" y="288" />
        <rect id="rect2887" width="8" height="192" x="1176" y="104" />
      </g>
      <g id="register_B_read">
        <rect id="rect2889" width="16" height="8" x="1360" y="272" />
        <rect id="rect2891" width="8" height="176" x="1368" y="104" />
      </g>
      <g id="register_B_write">
        <rect id="rect2893" width="32" height="8" x="1360" y="288" />
        <rect id="rect2895" width="8" height="192" x="1384" y="104" />
      </g>
      <g id="command_register_c_read">
        <rect id="rect2899" width="264" height="8" x="1256" y="656" />
        <rect id="rect2" width="8" height="560" x="1512" y="104" />
      </g>
      <g id="command_register_c_write">
        <rect id="rect2903" width="248" height="8" x="1256" y="640" />
        <rect id="rect2905" width="8" height="544" x="1496" y="104" />
      </g>
      <rect id="alu_in_A_4" width="8" height="40" x="1056" y="360" />
      <rect id="alu_in_A_8" width="8" height="40" x="1040" y="360" />
      <rect id="alu_in_A_2" width="8" height="40" x="1072" y="360" />
      <rect id="alu_in_A_1" width="8" height="40" x="1088" y="360" />
      <rect id="alu_in_B_8" width="8" height="40" x="1248" y="360" />
      <rect id="alu_in_B_4" width="8" height="40" x="1264" y="360" />
      <rect id="alu_in_B_2" width="8" height="40" x="1280" y="360" />
      <rect id="alu_in_B_1" width="8" height="40" x="1296" y="360" />

      <rect id="alu_out_8" width="8" height="40" x="1144" y="592" />
      <rect id="alu_out_4" width="8" height="40" x="1160" y="592" />
      <rect id="alu_out_2" width="8" height="40" x="1176" y="592" />
      <rect id="alu_out_1" width="8" height="40" x="1192" y="592" />
      <g id="command_ram_write">
        <rect id="rect2961" width="32" height="8" x="1672" y="856" />
        <rect id="rect2979" width="8" height="760" x="1672" y="104" />
      </g>
      <g id="command_ram_read">
        <rect
          id="rect2959"
          fill="#f00"
          width="48"
          height="8"
          x="1656"
          y="872"
        />
        <rect id="rect2981" width="8" height="776" x="1656" y="104" />
      </g>
      <rect id="instruction_8" width="8" height="32" x="96" y="104" />
      <rect id="instruction_4" width="8" height="32" x="112" y="104" />
      <rect id="instruction_2" width="8" height="32" x="128" y="104" />
      <rect id="instruction_1" width="8" height="32" x="144" y="104" />

      <rect id="rect3121" width="56" height="8" x="1360" y="416" />
      <rect id="rect3143" width="8" height="320" x="1408" y="104" />
      <rect id="rect3123" width="72" height="8" x="1360" y="432" />
      <rect id="rect3145" width="8" height="336" x="1424" y="104" />

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
      <rect
        id="command_fetchInstuction"
        width="8"
        height="32"
        x="448"
        y="104"
      />

      <instruction-memory
        :initialState="excerciseState.instructionMemoryState"
        @data-write="databusInInstructionMemory = $event"
        @address-write="addressbusInInstructionMemory = $event"
      />
      <data-memory :initialState="excerciseState.dataMemoryState" />
      <register-a />
      <register-b />
      <register-c />
      <alu :and="false" :xor="false" :add="false" :sub="false" />
      <jump-manager />
      <control-unit />
      <program-counter />
      <incrementor />
    </g>
    <g
      inkscape:groupmode="layer"
      id="layer3"
      inkscape:label="ALU-Extension"
      style="display: none"
    >
      <g id="g1964" transform="translate(128,40)">
        <rect id="rect3149" width="56" height="32" x="1048" y="464" />
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-weight: normal;
            font-size: 21.7389px;
            line-height: 1.25;
            font-family: sans-serif;
            letter-spacing: 0px;
            word-spacing: 0px;
            fill: #ffffff;
            fill-opacity: 1;
            stroke-width: 0.543473;
          "
          x="1059.595"
          y="487.9299"
          id="text3153"
        >
          <tspan
            id="tspan3151"
            x="1059.595"
            y="487.9299"
            style="fill: #ffffff; stroke-width: 0.543473"
          >
            OR
          </tspan>
        </text>
      </g>
      <g id="g1969" transform="translate(0,40)">
        <rect id="rect3155" width="56" height="32" x="1112" y="464" />
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-weight: normal;
            font-size: 21.7389px;
            line-height: 1.25;
            font-family: sans-serif;
            letter-spacing: 0px;
            word-spacing: 0px;
            fill: #ffffff;
            fill-opacity: 1;
            stroke-width: 0.543473;
          "
          x="1132.2603"
          y="487.92996"
          id="text3159"
        >
          <tspan
            id="tspan3157"
            x="1132.2603"
            y="487.92996"
            style="fill: #ffffff; stroke-width: 0.543473"
          >
            B
          </tspan>
        </text>
      </g>
      <g id="g1994" transform="translate(-64)">
        <rect id="rect3179" width="56" height="32" x="1112" y="504" />
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-weight: normal;
            font-size: 21.7389px;
            line-height: 1.25;
            font-family: sans-serif;
            letter-spacing: 0px;
            word-spacing: 0px;
            fill: #ffffff;
            fill-opacity: 1;
            stroke-width: 0.543473;
          "
          x="1132.5697"
          y="528.284"
          id="text3183"
        >
          <tspan
            id="tspan3181"
            x="1132.5697"
            y="528.284"
            style="fill: #ffffff; stroke-width: 0.543473"
          >
            A
          </tspan>
        </text>
      </g>
      <g id="g1984">
        <rect id="rect3213" width="56" height="32" x="1240" y="504" />
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-weight: normal;
            font-size: 21.7389px;
            line-height: 1.25;
            font-family: sans-serif;
            letter-spacing: 0px;
            word-spacing: 0px;
            fill: #ffffff;
            fill-opacity: 1;
            stroke-width: 0.543473;
          "
          x="1254"
          y="528"
          id="text3217"
        >
          <tspan
            id="tspan3215"
            x="1254"
            y="528"
            style="fill: #ffffff; stroke-width: 0.543473"
          >
            SR
          </tspan>
        </text>
      </g>
      <rect id="rect3125" width="88" height="8" x="1360" y="448" />
      <rect id="rect3147" width="8" height="352" x="1440" y="104" />
    </g>
    <g
      inkscape:groupmode="layer"
      id="layer2"
      inkscape:label="Dynamic-Address-Extension"
      style="display: none"
    >
      <g id="command_register_c_read_to_address">
        <rect id="rect2897" width="280" height="8" x="1256" y="752" />
        <rect id="rect2907" width="8" height="656" x="1528" y="104" />
      </g>
      <rect
        style="stroke-width: 1.1239"
        id="register_c_out_address_8"
        width="8"
        height="192"
        x="1192"
        y="728"
      />
      <rect
        style="stroke-width: 1.1127"
        id="register_c_out_address_4"
        width="8"
        height="208"
        x="1208"
        y="728"
      />
      <rect
        style="stroke-width: 1.10335"
        id="register_c_out_address_2"
        width="8"
        height="224"
        x="1224"
        y="728"
      />
      <rect
        style="stroke-width: 1.09545"
        id="register_c_out_address_1"
        width="8"
        height="240"
        x="1240"
        y="728"
      />
      <g id="g1476">
        <rect
          style="
            fill: #b0b0b0;
            fill-opacity: 1;
            stroke-width: 2.07013;
            stroke-linecap: square;
            paint-order: markers fill stroke;
          "
          id="register_C_ext"
          width="168"
          height="48"
          x="1088"
          y="720"
        />
        <path
          id="path2715"
          style="stroke-width: 4.62901"
          inkscape:transform-center-x="3.0228287e-06"
          inkscape:transform-center-y="0.61"
          d="m 1216,728 v 16 h 8 v -16 z m -7.9844,16.00977 12,13.85546 12,-13.85546 z"
        />
        <path
          id="path2719"
          style="stroke-width: 4.62901"
          inkscape:transform-center-x="2.0228286e-06"
          inkscape:transform-center-y="0.61"
          d="m 1120,728 v 16 h 8 v -16 z m -7.9863,16.00977 12,13.85546 12,-13.85546 z"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
} from '@vue/composition-api';
import alu from './ALU.vue';
import Bus from './Bus.vue';
import ControlUnit from './ControlUnit.vue';
import DataMemory from './DataMemory.vue';
import Incrementor from './incrementor.vue';
import InstructionMemory from './InstructionMemory.vue';
import JumpManager from './JumpManager.vue';
import ProgramCounter from './ProgramCounter.vue';
import RegisterA from './RegisterA.vue';
import RegisterB from './RegisterB.vue';
import RegisterC from './RegisterC.vue';

export default defineComponent({
  name: 'cpu',
  components: {
    DataMemory,
    InstructionMemory,
    RegisterA,
    RegisterB,
    RegisterC,
    alu,
    JumpManager,
    ControlUnit,
    ProgramCounter,
    Incrementor,
    Bus,
  },
  props: {
    excerciseState: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dbg: function () {
      debugger;
    },
  },
  setup(props) {
    const instruction = ref(0);
    // const addressBus = ref(0);
    const pcBus = ref(0);

    const databusInInstructionMemory = ref(0);
    const databusInRam = ref(0);
    const databusInRegA = ref(0);
    const databusInRegB = ref(0);
    const databusInRegC = ref(0);

    const addressbusInInstructionMemory = ref(0);
    const addressBus = computed(() => {
      return addressbusInInstructionMemory.value;
    });

    const dataBus = computed(() => {
      return (
        databusInInstructionMemory.value ||
        databusInRam.value ||
        databusInRegA.value ||
        databusInRegB.value ||
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
    };
  },
});
</script>

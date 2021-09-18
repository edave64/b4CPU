<template>
  <g id="programm">
    <rect
      style="fill: #b0b0b0"
      id="program_bg"
      width="536"
      height="720"
      x="16"
      y="136"
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
      x="47.799999"
      y="175.95418"
      id="program_header"
    >
      <tspan
        sodipodi:role="line"
        id="tspan1163"
        x="47.799999"
        y="175.95418"
        style="stroke-width: 0.805091"
      >
        Instruct.
      </tspan>
    </text>
    <g
      :style="
        'transform: translate(0px, ' +
        (40 * (programCounter % 4) + 168 * Math.floor(programCounter / 4)) +
        'px)'
      "
    >
      <path
        id="program_indicator"
        transform="matrix(0,1.9517638,-1.951764,0,131.89999,183.47756)"
        d="m 4.370366,55.28166 4.0963003,-7.095 4.0962997,7.095 z"
      />
    </g>
    <g v-for="cluster in [0, 1, 2, 3]" :key="cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="cluster + '_' + i">
        <word
          :x="48"
          :y="184 + 40 * i + 168 * cluster"
          v-model="instructions[i + cluster * 4]"
          :blocked="initialState.instructions[i + cluster * 4].blocked"
        />
        <word
          :x="216"
          :y="184 + 40 * i + 168 * cluster"
          v-model="addressBus[i + cluster * 4]"
          :blocked="initialState.data[i + cluster * 4].blocked"
        />
        <word
          :x="384"
          :y="184 + 40 * i + 168 * cluster"
          v-model="dataBus[i + cluster * 4]"
          :blocked="initialState.addresses[i + cluster * 4].blocked"
        />
      </g>
    </g>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import Word from './Word.vue';
import { IMemoryState } from '../interfaces/excercises';
import { emit } from 'process';

export default defineComponent({
  name: 'InstructionMemory',
  components: { Word },
  props: {
    initialState: {
      type: Object,
      required: true,
    },
    programCounter: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialInstructionsState = props.initialState
      .instructions as IMemoryState;
    const initialaddressState = props.initialState.addresses as IMemoryState;
    const initialdataState = props.initialState.data as IMemoryState;
    const instructions = ref([
      initialInstructionsState['0'].value,
      initialInstructionsState['1'].value,
      initialInstructionsState['2'].value,
      initialInstructionsState['3'].value,
      initialInstructionsState['4'].value,
      initialInstructionsState['5'].value,
      initialInstructionsState['6'].value,
      initialInstructionsState['7'].value,
      initialInstructionsState['8'].value,
      initialInstructionsState['9'].value,
      initialInstructionsState['10'].value,
      initialInstructionsState['11'].value,
      initialInstructionsState['12'].value,
      initialInstructionsState['13'].value,
      initialInstructionsState['14'].value,
      initialInstructionsState['15'].value,
    ]);
    const dataBus = ref([
      initialdataState['0'].value,
      initialdataState['1'].value,
      initialdataState['2'].value,
      initialdataState['3'].value,
      initialdataState['4'].value,
      initialdataState['5'].value,
      initialdataState['6'].value,
      initialdataState['7'].value,
      initialdataState['8'].value,
      initialdataState['9'].value,
      initialdataState['10'].value,
      initialdataState['11'].value,
      initialdataState['12'].value,
      initialdataState['13'].value,
      initialdataState['14'].value,
      initialdataState['15'].value,
    ]);
    const addressBus = ref([
      initialaddressState['0'].value,
      initialaddressState['1'].value,
      initialaddressState['2'].value,
      initialaddressState['3'].value,
      initialaddressState['4'].value,
      initialaddressState['5'].value,
      initialaddressState['6'].value,
      initialaddressState['7'].value,
      initialaddressState['8'].value,
      initialaddressState['9'].value,
      initialaddressState['10'].value,
      initialaddressState['11'].value,
      initialaddressState['12'].value,
      initialaddressState['13'].value,
      initialaddressState['14'].value,
      initialaddressState['15'].value,
    ]);
    watch(
      () => dataBus.value[props.programCounter],
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('data-write', newVal);
        }
      }
    );
    watch(
      () => addressBus.value[props.programCounter],
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('address-write', newVal);
        }
      }
    );
    emit('data-write', dataBus.value[props.programCounter]);
    emit('address-write', addressBus.value[props.programCounter]);
    return { instructions, dataBus, addressBus };
  },
});
</script>

<template>
  <g id="programm" style="transform: translate(16px, 136px)">
    <rect class="component-bg" width="536" height="720" x="0" y="0" />
    <text class="component-label" x="30" y="40"> Instruct. </text>

    <counter-arrow
      :x="8"
      :y="56 + 40 * (programCounter % 4) + 168 * Math.floor(programCounter / 4)"
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="cluster + '_' + i">
        <word
          :x="32"
          :y="48 + 40 * i + 168 * cluster"
          v-model="instructions[i + cluster * 4]"
          :blocked="initialState.instructions[i + cluster * 4].blocked"
        />
        <word
          :x="200"
          :y="48 + 40 * i + 168 * cluster"
          v-model="addressBus[i + cluster * 4]"
          :blocked="initialState.data[i + cluster * 4].blocked"
        />
        <word
          :x="368"
          :y="48 + 40 * i + 168 * cluster"
          v-model="dataBus[i + cluster * 4]"
          :blocked="initialState.addresses[i + cluster * 4].blocked"
        />
      </g>
    </g>
  </g>
</template>

<script lang="ts" setup>
import Word from './Word.vue';
import { IMemoryState } from '../interfaces/excercises';
import CounterArrow from './CounterArrow.vue';
import { ref, watch } from 'vue';

const props = defineProps({
  initialState: {
    type: Object,
    required: true,
  },
  programCounter: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['data-write', 'address-write', 'instruction-write']);
const initialInstructionsState = props.initialState
  .instructions as IMemoryState;
const initialaddressState = props.initialState.addresses as IMemoryState;
const initialdataState = props.initialState.data as IMemoryState;
const instructions = ref(
  Array(16)
    .fill(0)
    .map((_, i) => initialInstructionsState[i as 15].value)
);
const dataBus = ref(
  Array(16)
    .fill(0)
    .map((_, i) => initialdataState[i as 15].value)
);
const addressBus = ref(
  Array(16)
    .fill(0)
    .map((_, i) => initialaddressState[i as 15].value)
);
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
watch(
  () => instructions.value[props.programCounter],
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      emit('instruction-write', newVal);
    }
  }
);
emit('data-write', dataBus.value[props.programCounter]);
emit('address-write', addressBus.value[props.programCounter]);
emit('instruction-write', instructions.value[props.programCounter]);
</script>

<template>
  <g id="ram" style="transform: translate(1704px, 136px)">
    <path class="component-bg" d="m 0,0 v 720 40 h 120 v -40 h 80 V 0 Z" />
    <text class="component-label" x="30" y="40"> RAM </text>
    <counter-arrow
      :x="8"
      :y="56 + 40 * (address % 4) + 168 * Math.floor(address / 4)"
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="'data_' + cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="'data_' + cluster + '_' + i">
        <word
          :x="32"
          :y="48 + 40 * i + 168 * cluster"
          v-model="wordValues[i + cluster * 4]"
          :blocked="initialState[i + cluster * 4].blocked"
        />
      </g>
    </g>
    <direction-arrow dir="up" :x="40" :y="720" :value="writeCommand" />
    <direction-arrow dir="down" :x="72" :y="720" :value="readCommand" />
  </g>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  reactive,
} from '@vue/composition-api';
import word from 'components/Word.vue';
import { IMemoryState } from '../interfaces/excercises';
import CounterArrow from './CounterArrow.vue';
import DirectionArrow from './DirectionArrow.vue';

export default defineComponent({
  name: 'DataMemory',
  components: { word, CounterArrow, DirectionArrow },
  props: {
    initialState: {
      type: Object,
      required: true,
    },
    address: {
      type: Number,
      required: true,
    },
    readFrom: {
      type: Number,
      required: true,
    },
    readCommand: {
      type: Boolean,
      required: true,
    },
    writeCommand: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialState = props.initialState as IMemoryState;
    const wordValues = reactive(
      Array(16)
        .fill(0)
        .map((_, i) => initialState[i as 15].value)
    );
    watch(
      () => props.readCommand,
      (read) => {
        emit('data-write', read ? wordValues[props.address] : 0);
      }
    );

    watch(
      () => props.writeCommand,
      (write) => {
        if (write) {
          wordValues[props.address] = props.readFrom;
        }
      }
    );

    onMounted(() => {});

    return { wordValues };
  },
});
</script>

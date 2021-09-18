<template>
  <g id="ram">
    <path
      id="ram_bg"
      style="fill: #b0b0b0"
      d="m 1704,136 v 720 40 h 120 v -40 h 80 V 136 Z"
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
      x="1733.068"
      y="170.24263"
      id="ram_label"
    >
      <tspan
        id="tspan1553"
        x="1733.068"
        y="170.24263"
        style="stroke-width: 0.805091"
      >
        RAM
      </tspan>
    </text>
    <g v-for="cluster in [0, 1, 2, 3]" :key="'data_' + cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="'data_' + cluster + '_' + i">
        <word
          :x="1736"
          :y="184 + 40 * i + 168 * cluster"
          v-model="wordValues[i + cluster * 4]"
          :blocked="initialState[i + cluster * 4].blocked"
        />
      </g>
    </g>
    <path
      id="ram_indicator_write"
      inkscape:transform-center-y="-0.61"
      d="m 1752.0215,856 -12,13.86719 h 8 v 16 h 8 v -16 h 8 z"
    />
    <path
      id="ram_indicator_read"
      inkscape:transform-center-x="2.0228286e-06"
      inkscape:transform-center-y="0.61"
      d="m 1788.0234,856 v 16.01172 h -8.0019 l 12.0019,13.85547 12,-13.85547 h -8 V 856 Z"
    />
    <path
      id="ram_indicator_address"
      d="m 1712,208 v -16 l 14,8 z"
      sodipodi:nodetypes="cccc"
    />
  </g>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import word from 'components/Word.vue';
import { IMemoryState } from '../interfaces/excercises';

export default defineComponent({
  name: 'DataMemory',
  components: { word },
  props: {
    initialState: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const initialState = props.initialState as IMemoryState;
    const wordValues = ref([
      initialState['0'].value,
      initialState['1'].value,
      initialState['2'].value,
      initialState['3'].value,
      initialState['4'].value,
      initialState['5'].value,
      initialState['6'].value,
      initialState['7'].value,
      initialState['8'].value,
      initialState['9'].value,
      initialState['10'].value,
      initialState['11'].value,
      initialState['12'].value,
      initialState['13'].value,
      initialState['14'].value,
      initialState['15'].value,
    ]);

    onMounted(() => {});

    return { wordValues };
  },
});
</script>

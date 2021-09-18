<template>
  <g id="pc">
    <rect
      style="fill: #b0b0b0"
      id="pc_bg"
      width="168"
      height="136"
      x="704"
      y="632"
    />
    <text
      xml:space="preserve"
      style="
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        line-height: 1.25;
        font-family: sans-serif;
        letter-spacing: 0px;
        word-spacing: 0px;
        fill-opacity: 1;
        stroke-width: 1;
      "
      x="708.08459"
      y="672"
      id="pc_label"
    >
      <tspan
        sodipodi:role="line"
        id="tspan2621"
        x="708.08459"
        y="672"
        style="stroke-width: 1"
      >
        PC
      </tspan>
    </text>
    <word :x="712" :y="688" v-model="wordValue" />
    <path
      id="pc_indicator_inc"
      inkscape:transform-center-y="-0.61"
      d="M 740,730.15234 728,744 h 8 v 16 h 8 v -16 h 8 z"
    />
    <path
      id="pc_indicator_address"
      inkscape:transform-center-y="-0.61"
      d="M 836,730.15234 824,744 h 8 v 16 h 8 v -16 h 8 z"
    />
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import word from 'components/Word.vue';

export default defineComponent({
  name: 'ProgramCounter',
  components: { word },
  setup() {
    return { wordValue: 0 };
  },
});
</script>

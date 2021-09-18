<template>
  <g id="register_B">
    <rect
      style="fill: #b0b0b0"
      id="rect2647"
      width="168"
      height="96"
      x="1192"
      y="264"
    />
    <word v-model="x" :x="1200" :y="320" />
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
      x="1200"
      y="304"
      id="text2659"
    >
      <tspan id="tspan2657" x="1200" y="304" style="stroke-width: 1"> B </tspan>
    </text>
    <text
      xml:space="preserve"
      style="
        font-style: normal;
        font-weight: normal;
        font-size: 14.3456px;
        line-height: 1.25;
        font-family: sans-serif;
        text-align: end;
        letter-spacing: 0px;
        word-spacing: 0px;
        text-anchor: end;
        fill-opacity: 1;
        stroke-width: 0.35864;
      "
      x="1351.5151"
      y="286.46475"
      id="text2665"
    >
      <tspan
        id="tspan2661"
        x="1351.5151"
        y="286.46475"
        style="text-align: end; text-anchor: end; stroke-width: 0.35864"
      >
        R
      </tspan>
      <tspan
        x="1351.5151"
        y="304.39676"
        style="text-align: end; text-anchor: end; stroke-width: 0.35864"
        id="tspan2663"
      >
        W
      </tspan>
    </text>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Word from './Word.vue';

export default defineComponent({
  name: 'RegisterB',
  components: { Word },
  setup() {
    return { x: 0 };
  },
});
</script>

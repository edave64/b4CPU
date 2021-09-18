<template>
  <g id="register_C">
    <rect
      style="fill: #b0b0b0; stroke-width: 0.840168"
      id="rect2669"
      width="168"
      height="96"
      x="1088"
      y="632"
    />
    <word :x="1096" :y="688" v-model="wordValue" />
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
      x="1095.8885"
      y="671.88336"
      id="text2681"
    >
      <tspan id="tspan2679" x="1095.8885" y="671.88336" style="stroke-width: 1">
        C
      </tspan>
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
      x="1248"
      y="654"
      id="text2687"
    >
      <tspan
        x="1248"
        y="654"
        style="text-align: end; text-anchor: end; stroke-width: 0.35864"
        id="tspan2685"
      >
        W
      </tspan>
      <tspan
        x="1248"
        y="671.93201"
        style="text-align: end; text-anchor: end; stroke-width: 0.35864"
        id="tspan1463"
      >
        R
      </tspan>
    </text>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import word from 'components/Word.vue';

export default defineComponent({
  name: 'RegisterC',
  components: { word },
  setup() {
    return { wordValue: 0 };
  },
});
</script>

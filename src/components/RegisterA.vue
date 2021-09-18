<template>
  <g>
    <rect class="component-bg" width="168" height="96" x="984" y="264" />
    <word :x="992" :y="320" v-model="wordValue" />
    <text class="component-label" x="992" y="304"> A </text>
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
      x="1144"
      y="286"
      id="text2631"
    >
      <tspan
        id="tspan2629"
        x="1144"
        y="286"
        style="text-align: end; text-anchor: end; stroke-width: 0.35864"
      >
        R
      </tspan>
      <tspan
        x="1144"
        y="303.93201"
        style="text-align: end; text-anchor: end; stroke-width: 0.35864"
        id="tspan2633"
      >
        W
      </tspan>
    </text>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import word from 'components/Word.vue';

export default defineComponent({
  name: 'RegisterA',
  components: { word },
  setup() {
    return { wordValue: 0 };
  },
});
</script>

<template>
  <g>
    <rect class="component-bg" width="168" height="96" x="1088" y="632" />
    <word :x="1096" :y="688" v-model="wordValue" />
    <text class="component-label" x="1095.8885" y="671.88336"> C </text>
    <text
      xml:space="preserve"
      style="
        font-size: 14.3456px;
        line-height: 1.25;
        font-family: sans-serif;
        text-align: end;
        text-anchor: end;
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

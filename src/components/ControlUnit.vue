<template>
  <g id="decoder_timer">
    <rect class="component-bg" width="1888" height="72" x="16" y="32" />
    <text class="component-label" x="45" y="80">Decoder &amp; Timer </text>
    <g id="g1765">
      <path
        id="rect3054"
        style="fill: #e6e6e6"
        d="m 336,32 36,36 -36,36 H 520 L 556,68 520,32 Z"
      />
      <text class="component-label" x="408" y="80"> Fetch </text>
    </g>
    <g id="g1770">
      <path
        id="path3063"
        style="fill: #e6e6e6"
        d="m 528,32 36,36 -36,36 H 712 L 748,68 712,32 Z"
      />
      <text class="component-label" x="581.0932" y="79.786446">Decode </text>
    </g>
    <g id="g1775">
      <path
        id="path3088"
        style="fill: #e6e6e6"
        d="m 720,32 36,36 -36,36 H 904.0114 L 940.01185,68 904.0114,32 Z"
      />
      <text class="component-label" x="773.09564" y="79.78643"> Execute </text>
    </g>
    <g id="timer_step">
      <rect
        style="fill: #e6e6e6"
        id="rect3100"
        width="56"
        height="56"
        x="1376"
        y="40"
      />
      <path
        id="path3"
        d="m 1390.6015,52.508481 v 5.437568 l 17.4162,10.054814 -17.4162,10.054813 v 5.437568 l 26.8324,-15.492381 z"
      />
    </g>
    <g id="timer_cycle">
      <rect
        style="fill: #e6e6e6"
        id="rect3104"
        width="56"
        height="56"
        x="1440"
        y="40"
      />
      <path
        id="path3106"
        d="m 1456.0184,83.492129 0,-30.984258 L 1482.8515,68 Z"
      />
    </g>
    <g id="timer_fastforward">
      <rect
        style="fill: #e6e6e6"
        id="rect3108"
        width="56"
        height="56"
        x="1504"
        y="40"
      />
      <path
        id="path3110"
        d="M 1509.8945,52.507812 V 83.492188 L 1527.3105,73.4375 V 83.492188 L 1554.1445,68 1527.3105,52.507812 V 62.5625 Z"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'DataMemory',
  components: {},
  setup() {
    return {};
  },
});
</script>

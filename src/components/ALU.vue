<template>
  <g id="alu">
    <path
      style="
        fill: #b0b0b0;
        fill-opacity: 1;
        stroke-width: 1px;
        stroke-linecap: butt;
        stroke-linejoin: miter;
        stroke-opacity: 1;
      "
      d="m 984.01238,400 h 376.00472 v 104 l -88,88 h -200.0036 l -88.00112,-88 z"
      id="path2803"
    />
    <g id="g1954">
      <rect
        id="rect2671-3"
        width="32"
        height="32"
        x="992"
        y="424"
        :fill="zero ? '#f00' : '#000'"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 21.7389px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill: #ffffff;
          fill-opacity: 1;
          stroke-width: 0.543473;
        "
        x="1000"
        y="448"
        id="text2831"
      >
        <tspan id="tspan2829" x="1000" y="448" class="alu-text"> Z </tspan>
      </text>
    </g>
    <g id="g1959">
      <rect
        id="rect2673-0"
        width="32"
        height="32"
        x="992"
        y="464"
        :fill="overflow ? '#f00' : '#000'"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 21.7389px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill: #ffffff;
          fill-opacity: 1;
          stroke-width: 0.543473;
        "
        x="999.45721"
        y="487.91928"
        id="text2839"
      >
        <tspan id="tspan2837" x="999.45721" y="487.91928" class="alu-text">
          O
        </tspan>
      </text>
    </g>
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
      x="1135.1296"
      y="441.76642"
      id="text3141"
    >
      <tspan id="tspan3139" x="1135.1296" y="441.76642" style="stroke-width: 1">
        ALU
      </tspan>
    </text>
    <g id="g1974">
      <rect
        id="rect3161"
        width="56"
        height="32"
        x="1176"
        y="464"
        :fill="add ? '#f00' : '#000'"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 21.7389px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill: #ffffff;
          fill-opacity: 1;
          stroke-width: 0.543473;
        "
        x="1180.3973"
        y="488.28354"
        id="text3165"
      >
        <tspan id="tspan3163" x="1180.3973" y="488.28354" class="alu-text">
          ADD
        </tspan>
      </text>
    </g>
    <g id="g1979">
      <rect
        id="rect3167"
        width="56"
        height="32"
        x="1240"
        y="464"
        :fill="sub ? '#f00' : '#000'"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 21.7389px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill: #ffffff;
          fill-opacity: 1;
          stroke-width: 0.543473;
        "
        x="1245.7568"
        y="488.28354"
        id="text3171"
      >
        <tspan id="tspan3169" x="1245.7568" y="488.28354" class="alu-text">
          SUB
        </tspan>
      </text>
    </g>
    <g id="g1999" transform="translate(0,-40)">
      <rect
        id="rect3173"
        width="56"
        height="32"
        x="1048"
        y="504"
        :fill="and ? '#f00' : '#000'"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 21.7389px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill: #ffffff;
          fill-opacity: 1;
          stroke-width: 0.543473;
        "
        x="1052.6345"
        y="528.28406"
        id="text3177"
      >
        <tspan id="tspan3175" x="1052.6345" y="528.28406" class="alu-text">
          AND
        </tspan>
      </text>
    </g>
    <g id="g1989" transform="translate(-64,-40)">
      <rect
        id="rect3179-9"
        width="56"
        height="32"
        x="1176"
        y="504"
        :fill="xor ? '#f00' : '#000'"
      />
      <text
        xml:space="preserve"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 21.7389px;
          line-height: 1.25;
          font-family: sans-serif;
          letter-spacing: 0px;
          word-spacing: 0px;
          fill: #ffffff;
          fill-opacity: 1;
          stroke-width: 0.543473;
        "
        x="1181.1456"
        y="528.28406"
        id="text3183-3"
      >
        <tspan id="tspan3181-1" x="1181.1456" y="528.28406" class="alu-text">
          XOR
        </tspan>
      </text>
    </g>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ALU',
  components: {},
  props: {
    and: { type: Boolean, required: true },
    xor: { type: Boolean, required: true },
    add: { type: Boolean, required: true },
    sub: { type: Boolean, required: true },
  },
  setup() {
    const zero = ref(false);
    const overflow = ref(false);
    return {
      zero,
      overflow,
    };
  },
});
</script>

<style>
.alu-text {
  user-select: none;
  cursor: default;
  fill: #ffffff;
  stroke-width: 0.543473;
}
</style>

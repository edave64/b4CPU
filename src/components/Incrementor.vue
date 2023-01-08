<template>
  <g id="pc_incrementor" :style="translate(568, 720)">
    <rect class="component-bg" width="72" height="48" x="0" y="0" />
    <text
      class="component-label"
      x="36"
      y="24"
      text-anchor="middle"
      dominant-baseline="central"
    >
      +1
    </text>
  </g>
</template>

<script lang="ts" setup>
import { translate } from '../style-helper';
</script>

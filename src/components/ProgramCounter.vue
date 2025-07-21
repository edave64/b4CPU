<template>
  <g id="pc" style="transform: translate(704px, 632px)">
    <rect class="component-bg" width="168" height="136" x="0" y="0" />
    <text class="component-label" x="8" y="40"> PC </text>
    <word
      :x="8"
      :y="56"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <direction-arrow dir="up" :value="jumpToNext" :x="24" :y="98" />
    <direction-arrow dir="up" :value="jumpToAddr" :x="120" :y="98" />
  </g>
</template>

<script lang="ts" setup>
import word from 'components/WordBits.vue';
import DirectionArrow from './DirectionArrow.vue';

defineProps({
  jumpToNext: {
    type: Boolean,
    required: true,
  },
  jumpToAddr: {
    type: Boolean,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>

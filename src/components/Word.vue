<template>
  <g
    :style="{
      transform: 'translate(' + x + 'px, ' + y + 'px)',
      opacity: blocked ? 0.5 : 1,
    }"
  >
    <bit
      v-model="bit3"
      :x="0"
      :y="0"
      :style="blocked ? 'cursor: not-allowed' : ''"
    />
    <bit
      v-model="bit2"
      :x="40"
      :y="0"
      :style="blocked ? 'cursor: not-allowed' : ''"
    />
    <bit
      v-model="bit1"
      :x="80"
      :y="0"
      :style="blocked ? 'cursor: not-allowed' : ''"
    />
    <bit
      v-model="bit0"
      :x="120"
      :y="0"
      :style="blocked ? 'cursor: not-allowed' : ''"
    />
  </g>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import bit from './Bit.vue';

const props = defineProps({
  x: Number,
  y: Number,
  modelValue: {
    type: Number,
    required: true,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
function makeBit(mask: number) {
  return computed({
    get(): boolean {
      return !!(props.modelValue & mask);
    },
    set() {
      if (!props.blocked) emit('update:modelValue', props.modelValue ^ mask);
    },
  });
}

const bit0 = makeBit(0b0001);
const bit1 = makeBit(0b0010);
const bit2 = makeBit(0b0100);
const bit3 = makeBit(0b1000);
</script>

<template>
  <g
    :style="{
      transform: 'translate(' + x + 'px, ' + y + 'px)',
      opacity: blocked ? 0.5 : 1,
    }"
  >
    <bit
      v-model="bit3"
      v-model:mask="mask3"
      :x="0"
      :y="0"
      :style="blocked ? 'cursor: not-allowed' : ''"
      ref="comp_bit3"
      @keydown.right.stop="comp_bit2?.doFocus()"
      @keydown.down.stop="$emit('down', 3)"
      @keydown.up.stop="$emit('up', 3)"
    />
    <bit
      v-model="bit2"
      v-model:mask="mask2"
      :x="40"
      :y="0"
      ref="comp_bit2"
      :style="blocked ? 'cursor: not-allowed' : ''"
      @keydown.right.stop="comp_bit1?.doFocus()"
      @keydown.left.stop="comp_bit3?.doFocus()"
      @keydown.up.stop="$emit('up', 2)"
      @keydown.down.stop="$emit('down', 2)"
    />
    <bit
      v-model="bit1"
      v-model:mask="mask1"
      :x="80"
      :y="0"
      ref="comp_bit1"
      :style="blocked ? 'cursor: not-allowed' : ''"
      @keydown.right.stop="comp_bit0?.doFocus()"
      @keydown.left.stop="comp_bit2?.doFocus()"
      @keydown.up.stop="$emit('up', 1)"
      @keydown.down.stop="$emit('down', 1)"
    />
    <bit
      v-model="bit0"
      v-model:mask="mask0"
      :x="120"
      :y="0"
      ref="comp_bit0"
      :style="blocked ? 'cursor: not-allowed' : ''"
      @keydown.left.stop="comp_bit1?.doFocus()"
      @keydown.up.stop="$emit('up', 0)"
      @keydown.down.stop="$emit('down', 0)"
    />
  </g>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Bit from './BitBtn.vue';

const props = defineProps({
  x: Number,
  y: Number,
  blocked: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['up', 'down']);

const value = defineModel<number>({
  required: true,
});

const mask = defineModel<number>('mask', {
  default: 0,
});

function makeBit(mask: number, target = value) {
  return computed({
    get(): boolean {
      return !!(target.value & mask);
    },
    set() {
      if (!props.blocked) target.value ^= mask;
    },
  });
}

defineExpose({
  doFocus(index = 0) {
    comps[index]?.value?.doFocus();
  },
});

const bit0 = makeBit(0b0001);
const bit1 = makeBit(0b0010);
const bit2 = makeBit(0b0100);
const bit3 = makeBit(0b1000);
const mask0 = makeBit(0b0001, mask);
const mask1 = makeBit(0b0010, mask);
const mask2 = makeBit(0b0100, mask);
const mask3 = makeBit(0b1000, mask);

const comp_bit3 = ref(null as typeof Bit | null);
const comp_bit2 = ref(null as typeof Bit | null);
const comp_bit1 = ref(null as typeof Bit | null);
const comp_bit0 = ref(null as typeof Bit | null);
const comps = [comp_bit0, comp_bit1, comp_bit2, comp_bit3];
</script>

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

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import Bit from './Bit.vue';

export default defineComponent({
  name: 'Word',
  components: { Bit },
  props: {
    x: Number,
    y: Number,
    value: {
      type: Number,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    function bit(mask: number) {
      return computed({
        get(): boolean {
          return !!(props.value & mask);
        },
        set(val: boolean) {
          if (!props.blocked) emit('input', props.value ^ mask);
        },
      });
    }

    const bit0 = bit(0b0001);
    const bit1 = bit(0b0010);
    const bit2 = bit(0b0100);
    const bit3 = bit(0b1000);

    return { bit0, bit1, bit2, bit3 };
  },
});
</script>

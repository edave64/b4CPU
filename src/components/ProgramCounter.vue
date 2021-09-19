<template>
  <g id="pc" style="transform: translate(704px, 632px)">
    <rect class="component-bg" width="168" height="136" x="0" y="0" />
    <text class="component-label" x="4" y="40"> PC </text>
    <word :x="8" :y="56" v-model="value" />
    <direction-arrow dir="up" :value="false" :x="24" :y="98" />
    <direction-arrow dir="up" :value="false" :x="120" :y="98" />
  </g>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import word from 'components/Word.vue';
import DirectionArrow from './DirectionArrow.vue';

export default defineComponent({
  name: 'ProgramCounter',
  components: { word, DirectionArrow },
  props: {
    nextValue: {
      type: Number,
      required: true,
    },
    addressBus: {
      type: Number,
      required: true,
    },
    jumpToNext: {
      type: Boolean,
      required: true,
    },
    jumpToAddr: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const value = ref(0);

    function pcWrite() {
      emit('pc-write', value.value & 0xf);
    }
    function pcUpdate(newValue: boolean) {
      if (!newValue) return;
      let addr = 0;
      if (props.jumpToNext) {
        addr = addr | props.nextValue;
      }
      if (props.jumpToAddr) {
        addr = addr | props.nextValue;
      }
      value.value = addr & 0xf;
    }

    watch(value, (newValue) => emit('pc-write', value.value & 0xf));
    watch(() => props.jumpToNext, pcUpdate);
    watch(() => props.jumpToAddr, pcUpdate);

    pcWrite();

    return { value };
  },
});
</script>

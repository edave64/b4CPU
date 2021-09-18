<template>
  <g id="pc">
    <rect class="component-bg" width="168" height="136" x="704" y="632" />
    <text class="component-label" x="708.08459" y="672"> PC </text>
    <word :x="712" :y="688" v-model="value" />
    <path
      id="pc_indicator_inc"
      d="M 740,730.15234 728,744 h 8 v 16 h 8 v -16 h 8 z"
    />
    <path
      id="pc_indicator_address"
      d="M 836,730.15234 824,744 h 8 v 16 h 8 v -16 h 8 z"
    />
  </g>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import word from 'components/Word.vue';

export default defineComponent({
  name: 'ProgramCounter',
  components: { word },
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

<template>
  <g id="pc" style="transform: translate(704px, 632px)">
    <rect class="component-bg" width="168" height="136" x="0" y="0" />
    <text class="component-label" x="8" y="40"> PC </text>
    <word :x="8" :y="56" v-model="value" />
    <direction-arrow dir="up" :value="false" :x="24" :y="98" />
    <direction-arrow dir="up" :value="false" :x="120" :y="98" />
  </g>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import word from 'components/Word.vue';
import DirectionArrow from './DirectionArrow.vue';

const props = defineProps({
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
});
const emit = defineEmits(['pc-write']);
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
    addr = addr | props.addressBus;
  }
  value.value = addr & 0xf;
}

watch(value, (newValue) => emit('pc-write', newValue & 0xf));
watch(() => props.jumpToNext, pcUpdate);
watch(() => props.jumpToAddr, pcUpdate);

pcWrite();
</script>

<template>
  <g :style="`transform: translate(${x}px, ${y}px)`">
    <rect class="component-bg" width="168" height="96" x="0" y="0" />
    <word
      :x="8"
      :y="56"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <text class="component-label" x="8" y="40">{{ name }}</text>
    <text
      class="component-port-label"
      :class="{ active: commandRead }"
      x="154"
      y="28"
    >
      R
    </text>
    <text
      class="component-port-label"
      :class="{ active: commandWrite }"
      x="154"
      y="12"
    >
      W
    </text>
  </g>
</template>

<script setup lang="ts">
import word from 'components/Word.vue';

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  commandRead: {
    type: Boolean,
    required: true,
  },
  commandWrite: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

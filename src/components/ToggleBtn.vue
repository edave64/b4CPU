<template>
  <g
    :class="{ active: modelValue }"
    :style="{ transform: 'translate(' + x + 'px, ' + y + 'px)' }"
    @click="emit('update:modelValue', !modelValue)"
    @keypress="emit('update:modelValue', !modelValue)"
    tabindex="0"
    ref="focusTarget"
  >
    <rect :width="width!" :height="32" />
    <text x="64" y="16" height="32" :width="width!" text-anchor="start">
      {{ label }}
    </text>
  </g>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  x: Number,
  y: Number,
  width: Number,
  modelValue: Boolean,
  label: String,
});

const focusTarget = ref(null as HTMLElement | null);

defineExpose({
  doFocus() {
    const target = focusTarget.value;
    if (target) {
      target.focus();
    }
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
text {
  user-select: none;
  font-size: 32px;
  font-family: monospace;
  text-anchor: middle;
  dominant-baseline: central;
}

g {
  cursor: pointer;
  & > rect {
    fill: var(--inactive-color);
  }
  & > text {
    fill: var(--inactive-text-color);
  }
}

g.active {
  & > rect {
    fill: var(--active-color);
  }
  & > text {
    fill: var(--active-text-color);
  }
}

g:focus {
  outline: 0;

  rect {
    outline: 1px solid #fff;
  }
}

g:focus-visible {
  outline: 0;

  rect {
    outline: 4px solid #fff;
  }
}
</style>

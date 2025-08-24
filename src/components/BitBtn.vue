<template>
  <g
    :class="{ active: modelValue, blocked: !mask }"
    :style="{ transform: 'translate(' + x + 'px, ' + y + 'px)' }"
    @click.right.stop.prevent="mask = !mask"
    @click="toggleValue()"
    @keypress="toggleValue()"
    tabindex="0"
    ref="focusTarget"
  >
    <rect width="32" height="32" />
    <text x="16" y="16" height="32" width="32">
      {{ modelValue ? '1' : '0' }}
    </text>
  </g>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  x: Number,
  y: Number,
});

const modelValue = defineModel<boolean>({
  required: true,
});

const mask = defineModel<boolean>('mask', {
  default: false,
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

function toggleValue() {
  if (!mask.value) return;
  modelValue.value = !modelValue.value;
}
</script>

<style lang="scss" scoped>
text {
  user-select: none;
  font-size: 32px;
  font-family: monospace;
  text-anchor: middle;
  dominant-baseline: central;
}

.blocked {
  cursor: not-allowed;
  opacity: 0.5;
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

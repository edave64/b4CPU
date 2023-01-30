<template>
  <g :style="{ transform: 'translate(' + x + 'px, ' + y + 'px)' }">
    <lane
      v-for="lane in lanes"
      :key="lane.key"
      :value="lane.value"
      :dir="dir"
      :length="lane.length"
      :x="lane.x"
      :y="lane.y"
    />
  </g>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import lane from './Lane.vue';

const props = defineProps({
  x: Number,
  y: Number,
  dir: {
    required: true,
    type: String as PropType<'horizontal' | 'vertical'>,
  },
  length: {
    required: true,
    type: Number,
  },
  taperedStart: {
    type: Boolean,
  },
  taperedEnd: {
    type: Boolean,
  },
  value: {
    required: true,
    type: Number,
  },
});

const vertical = computed(() => props.dir === 'vertical');

function makeLane(bit: number) {
  const mask = 1 << bit;
  return {
    key: `lane_${bit}`,
    get x() {
      if (vertical.value) {
        return 16 * (3 - bit);
      } else {
        let ret = 0;
        if (props.taperedStart) {
          ret += 16 * (3 - bit);
        }
        return ret;
      }
    },
    get y() {
      if (vertical.value) {
        let ret = 0;
        if (props.taperedStart) {
          ret += 16 * (3 - bit);
        }
        return ret;
      } else {
        return 16 * (3 - bit);
      }
    },
    get length() {
      const len = props.length;
      if (!props.taperedStart && !props.taperedEnd) {
        return len;
      } else if (props.taperedStart && props.taperedEnd) {
        return len - 48;
      } else if (props.taperedStart && !props.taperedEnd) {
        return len - 16 * (3 - bit);
      } else if (!props.taperedStart && props.taperedEnd) {
        return len - 48 + 16 * (3 - bit);
      }
    },
    get value() {
      return !!(props.value & mask);
    },
    get dir(): 'horizontal' | 'vertical' {
      return vertical.value ? 'vertical' : 'horizontal';
    },
  };
}

const lanes = [makeLane(3), makeLane(2), makeLane(1), makeLane(0)];
</script>

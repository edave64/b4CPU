<template>
  <rect
    :width="vertical ? 8 : length"
    :height="vertical ? length : 8"
    :x="x"
    :y="y"
    :fill="value ? '#f00' : '#000'"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Lane',
  components: {},
  props: {
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
    value: Boolean,
  },
  setup(props) {
    const vertical = computed(() => props.dir === 'vertical');

    return {
      vertical,
    };
  },
});
</script>

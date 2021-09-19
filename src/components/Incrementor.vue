<template>
  <g id="pc_incrementor" :style="translate(568, 720)">
    <rect class="component-bg" width="72" height="48" x="0" y="0" />
    <text
      class="component-label"
      x="36"
      y="24"
      text-anchor="middle"
      dominant-baseline="central"
    >
      +1
    </text>
  </g>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';
import cpu from 'components/CPU.vue';

export default defineComponent({
  name: 'DataMemory',
  components: {},
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta };
  },
});
</script>

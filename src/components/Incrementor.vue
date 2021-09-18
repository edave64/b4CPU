<template>
  <g id="pc_incrementor">
    <rect
      style="fill: #b0b0b0"
      id="rect2345"
      width="72"
      height="48"
      x="568"
      y="720"
    />
    <text
      xml:space="preserve"
      style="
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        line-height: 1.25;
        font-family: sans-serif;
        letter-spacing: 0px;
        word-spacing: 0px;
        fill-opacity: 1;
        stroke-width: 1;
      "
      x="574"
      y="758"
      id="text2593"
    >
      <tspan id="tspan2591" x="574" y="758" style="stroke-width: 1"> +1 </tspan>
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

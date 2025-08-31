<template>
  <div class="goal-tree-editor">
    <select v-model="type">
      <option value="value">Value</option>
      <option value="componentValue">Component value</option>
      <option
        value="initialAssignments"
        v-if="
          availableInitialAssignments.length > 0 ||
          type === 'initialAssignments'
        "
      >
        Initial assignments
      </option>
      <option value="and">And</option>
      <option value="or">Or</option>
      <option value="xor">Xor</option>
      <option value="gt">Greater than</option>
      <option value="lt">Less than</option>
      <option value="eq">Equal</option>
    </select>
    <template v-if="type === 'value'">
      <input type="number" v-model="model" />
    </template>
    <template v-else-if="type === 'initialAssignments'">
      <select v-model="model">
        <option
          v-for="random in availableInitialAssignments"
          :key="random"
          :value="`${random}`"
        >
          Random value {{ +random.slice(7, -1) + 1 }}
        </option>
      </select>
    </template>
    <template v-else-if="type === 'componentValue'">
      <select v-model="model">
        <option value="a">A</option>
        <option value="b">B</option>
        <option v-for="ram in 16" :key="ram" :value="`ram[${ram - 1}]`">
          RAM {{ ram }}
        </option>
      </select>
    </template>
    <template v-else>
      <GoalTreeEditor
        :initial-assignments="initialAssignments"
        v-model="(model as GoalJSON).goalA"
      />
      <GoalTreeEditor
        :initial-assignments="initialAssignments"
        v-model="(model as GoalJSON).goalB"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type {
  GoalJSON,
  IExcerciseEditingState,
} from '../interfaces/excercises';

const props = defineProps({
  initialAssignments: {
    type: Object as PropType<IExcerciseEditingState['initialAssignments']>,
    required: true,
  },
});

defineOptions({
  name: 'GoalTreeEditor',
});
const model = defineModel<GoalJSON | number | string>({
  required: true,
});

const availableInitialAssignments = computed(() => {
  const available = Object.values(props.initialAssignments).filter((x) => x);
  if (
    type.value === 'initialAssignments' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !available.includes(model.value as any)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    available.push(model.value as any);
  }
  return available;
});

type Types =
  | GoalJSON['join']
  | 'componentValue'
  | 'value'
  | 'initialAssignments';
const type = computed<Types>({
  get(): Types {
    const val = model.value;
    if (typeof val === 'object') {
      return val.join;
    } else if (typeof val === 'string') {
      if (val === 'a' || val === 'b' || val.startsWith('ram[')) {
        return 'componentValue';
      }
      return 'initialAssignments';
    } else {
      return 'value';
    }
  },

  set(v: Types) {
    if (v === 'value') {
      model.value = 0;
    } else if (v === 'initialAssignments') {
      model.value = `random[0]`;
    } else if (v === 'componentValue') {
      model.value = 'a';
    } else {
      model.value = {
        join: v,
        goalA: 0,
        goalB: 0,
        not: false,
      };
    }
  },
});
</script>

<style lang="scss">
.goal-tree-editor > .goal-tree-editor {
  margin-left: 16px;
  border-left: 2px solid var(--object-color);
  padding-left: 16px;
}
</style>

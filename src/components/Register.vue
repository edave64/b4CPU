<template>
  <g :style="`transform: translate(${x}px, ${y}px)`">
    <rect class="component-bg" width="168" height="96" x="0" y="0" />
    <word :x="8" :y="56" v-model="value" />
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

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import word from 'components/Word.vue';

export default defineComponent({
  name: 'Register',
  components: { word },
  props: {
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
    readFrom: {
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
  },
  setup(props, { emit }) {
    const value = ref(0);
    watch(value, () => emit('input', value.value));
    watch(
      () => props.commandWrite,
      (write) => {
        if (write) {
          value.value = props.readFrom;
        }
      }
    );
    watch(
      () => props.commandRead,
      (read) => emit('write', read ? value.value : 0)
    );
    emit('input', value.value);
    return { value };
  },
});
</script>

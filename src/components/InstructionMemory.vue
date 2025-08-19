<template>
  <g id="programm" style="transform: translate(16px, 136px)">
    <rect class="component-bg" width="536" height="720" x="0" y="0" />
    <text class="component-label" x="30" y="40">ROM</text>

    <counter-arrow
      id="pc_counter_arrow"
      :x="8"
      :y="56 + 40 * (pc % 4) + 168 * Math.floor(pc / 4)"
    />
    <g v-for="cluster in [0, 1, 2, 3]" :key="cluster">
      <g v-for="i in [0, 1, 2, 3]" :key="cluster + '_' + i">
        <foreignObject
          x="32"
          :y="48 + 40 * i + 168 * cluster"
          :width="152"
          :height="32"
        >
          <select
            style="height: 100%; width: 100%"
            :value="ops[i + cluster * 4]!.value"
            :style="getStyle(ops[i + cluster * 4]!.value)"
            @input="
              ops[i + cluster * 4]!.value = +(
                $event.target as HTMLSelectElement
              ).value
            "
          >
            <option
              v-for="(op, i) in instructions"
              :key="op.name"
              :value="i"
              :style="getStyle(i)"
            >
              {{ op.name }}
            </option>
          </select>
        </foreignObject>
        <word
          :x="200"
          :y="48 + 40 * i + 168 * cluster"
          ref="ref_addr"
          :id="`rom_addr_${i + cluster * 4}`"
          :model-value="addr[i + cluster * 4]!.value"
          @update:model-value="addr[i + cluster * 4]!.value = $event"
          @keydown.right.stop="ref_data[i + cluster * 4]!.doFocus(3)"
          @keydown.left.stop="ref_inst[i + cluster * 4]!.doFocus()"
          @up="ref_addr[(i + cluster * 4 + 15) % 16]!.doFocus($event)"
          @down="ref_addr[(i + cluster * 4 + 1) % 16]!.doFocus($event)"
        />
        <word
          :x="368"
          :y="48 + 40 * i + 168 * cluster"
          ref="ref_data"
          :id="`rom_data_${i + cluster * 4}`"
          :model-value="data[i + cluster * 4]!.value"
          @update:model-value="data[i + cluster * 4]!.value = $event"
          @keydown.right.stop="ref_inst[(i + cluster * 4 + 1) % 16]!.doFocus(3)"
          @keydown.left.stop="ref_addr[i + cluster * 4]!.doFocus()"
          @up="ref_data[(i + cluster * 4 + 15) % 16]!.doFocus($event)"
          @down="ref_data[(i + cluster * 4 + 1) % 16]!.doFocus($event)"
        />
      </g>
    </g>
  </g>
</template>

<script lang="ts" setup>
import Word from './WordBits.vue';
import CounterArrow from './CounterArrow.vue';
import type { PropType, Ref } from 'vue';
import { computed, ref } from 'vue';
import { CpuAccessor, updateCpu, type CpuState } from '../engine/cpu';
import type { IDecoderState } from '../interfaces/decoder';

const ref_inst: Ref<(typeof Word)[]> = ref([]);
const ref_addr: Ref<(typeof Word)[]> = ref([]);
const ref_data: Ref<(typeof Word)[]> = ref([]);

const props = defineProps({
  decoderState: {
    type: Object as PropType<IDecoderState>,
    required: true,
  },
});

const cpu = defineModel<CpuState>('cpu', {
  required: true,
});

const pc = computed(() => CpuAccessor.getPc(cpu.value));

const ops: Ref<number>[] = [];
const addr: Ref<number>[] = [];
const data: Ref<number>[] = [];

for (let i = 0; i < 16; i++) {
  ops.push(
    computed({
      get: () => CpuAccessor.getInstructionsOp(cpu.value, i),
      set: (v) => {
        cpu.value = updateCpu(cpu.value, (cpu) => {
          CpuAccessor.setInstructionsOp(cpu, i, v);
        });
      },
    }),
  );
  addr.push(
    computed({
      get: () => CpuAccessor.getInstructionsAddr(cpu.value, i),
      set: (v) => {
        cpu.value = updateCpu(cpu.value, (cpu) => {
          CpuAccessor.setInstructionsAddr(cpu, i, v);
        });
      },
    }),
  );
  data.push(
    computed({
      get: () => CpuAccessor.getInstructionsData(cpu.value, i),
      set: (v) => {
        cpu.value = updateCpu(cpu.value, (cpu) => {
          CpuAccessor.setInstructionsData(cpu, i, v);
        });
      },
    }),
  );
}

function getStyle(value: number) {
  const colors = Array.from(value.toString(2).padStart(4, '0')).map((x) =>
    x === '1' ? 'var(--active-color)' : 'var(--inactive-color)',
  );
  const background = `linear-gradient(to right, ${colors.reduce(
    (acc, x, i, ary) => {
      if (i === 0) return `${x} 0, ${x}`;
      const percentage = Math.round((i / ary.length) * 100);
      return `${acc} ${percentage}%, ${x} ${percentage}%, ${x}`;
    },
    '',
  )} 100%)`;

  return {
    background,
  };
}

const instructions = computed(() => {
  return props.decoderState.instructions;
});
</script>

<style lang="scss" scoped>
select {
  background: var(--inactive-color);
  color: var(--inactive-text-color);
  font-size: 24px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
}
</style>

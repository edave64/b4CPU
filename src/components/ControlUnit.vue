<template>
  <g id="decoder_timer">
    <rect class="component-bg" width="1888" height="72" x="16" y="32" />
    <text class="component-label" x="45" y="80"> Decoder &amp; Timer </text>
    <step-indicator :x="336" :y="32" label="Fetch" :active="stage === 0" />
    <step-indicator :x="544" :y="32" label="Decode" :active="stage === 1" />
    <step-indicator :x="752" :y="32" label="Read" :active="stage === 2" />
    <step-indicator :x="960" :y="32" label="Execute" :active="stage === 3" />
    <step-indicator :x="1168" :y="32" label="Write" :active="stage === 4" />
    <g id="timer_step" @click="step()">
      <rect
        style="fill: #e6e6e6"
        id="rect3100"
        width="56"
        height="56"
        x="1376"
        y="40"
      />
      <path
        id="path3"
        d="m 1390.6015,52.508481 v 5.437568 l 17.4162,10.054814 -17.4162,10.054813 v 5.437568 l 26.8324,-15.492381 z"
      />
    </g>
    <g id="timer_cycle" @click="cycle()">
      <rect
        style="fill: #e6e6e6"
        id="rect3104"
        width="56"
        height="56"
        x="1440"
        y="40"
      />
      <path
        id="path3106"
        d="m 1456.0184,83.492129 0,-30.984258 L 1482.8515,68 Z"
      />
    </g>
    <g id="timer_fastforward">
      <rect
        style="fill: #e6e6e6"
        id="rect3108"
        width="56"
        height="56"
        x="1504"
        y="40"
      />
      <path
        id="path3110"
        d="M 1509.8945,52.507812 V 83.492188 L 1527.3105,73.4375 V 83.492188 L 1554.1445,68 1527.3105,52.507812 V 62.5625 Z"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@vue/composition-api';
import { Gates, IDecoderState } from 'src/interfaces/decoder';
import StepIndicator from './StepIndicator.vue';

enum Stage {
  Fetch,
  Decode,
  Read,
  Execute,
  Write,
}

export default defineComponent({
  name: 'ControlUnit',
  components: { StepIndicator },
  props: {
    decoderState: {
      type: Object as PropType<IDecoderState>,
      required: true,
    },
    instruction: {
      type: Number,
      required: true,
    },
  },
  methods: {
    step() {
      if (this.stage === Stage.Write) this.stage = Stage.Fetch;
      else {
        this.stage++;
      }
    },
    cycle() {
      if (this.inCycle) return;
      this.inCycle = true;
      const runner = () => {
        this.step();
        if (this.stage !== 0) {
          this.$nextTick(runner);
        } else {
          this.inCycle = false;
        }
      };
      runner();
    },
  },
  setup(props, { emit }) {
    const stage = ref(Stage.Fetch);
    const inCycle = ref(false);
    const lastDecoded = {
      fetch: new Set<Gates>(),
      read: new Set<Gates>(),
      exec: new Set<Gates>(),
      write: new Set<Gates>(),
    };
    function update() {
      switch (stage.value) {
        case Stage.Decode:
          const instruction =
            props.decoderState.instructions[props.instruction].gates;
          lastDecoded.fetch = new Set(
            [...props.decoderState.timingMasks.fetch].filter((x) =>
              instruction.has(x)
            )
          );
          lastDecoded.read = new Set(
            [...props.decoderState.timingMasks.read].filter((x) =>
              instruction.has(x)
            )
          );
          lastDecoded.exec = new Set(
            [...props.decoderState.timingMasks.exec].filter((x) =>
              instruction.has(x)
            )
          );
          lastDecoded.write = new Set(
            [...props.decoderState.timingMasks.write].filter((x) =>
              instruction.has(x)
            )
          );
          writeState(new Set());
          break;
        case Stage.Fetch:
          writeState(lastDecoded.fetch);
          break;
        case Stage.Read:
          writeState(lastDecoded.read);
          break;
        case Stage.Execute:
          writeState(lastDecoded.exec);
          break;
        case Stage.Write:
          writeState(lastDecoded.write);
          break;
      }
    }
    function writeState(set: Set<Gates>) {
      emit('write-alu1', set.has('ALU1'));
      emit('write-alu2', set.has('ALU2'));
      emit('write-next', set.has('N'));
      emit('write-jmp-not', set.has('JN'));
      emit('write-jmp-overflow', set.has('JO'));
      emit('write-jmp-zero', set.has('JZ'));
      emit('write-reg-a-read', set.has('AR'));
      emit('write-reg-b-read', set.has('BR'));
      emit('write-reg-c-read', set.has('CR'));
      emit('write-ram-read', set.has('RR'));
      emit('write-reg-a-write', set.has('AW'));
      emit('write-reg-b-write', set.has('BW'));
      emit('write-reg-c-write', set.has('CW'));
      emit('write-ram-write', set.has('RW'));
    }
    watch(() => [props.decoderState, props.instruction, stage.value], update);
    update();
    return {
      stage,
      inCycle,
    };
  },
});
</script>

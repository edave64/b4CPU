<template>
  <div id="tour-page">
    <Cpu ref="cpuEl" v-model:cpu="cpu" :decoder-state="decoderState" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef, onUnmounted, watch } from 'vue';
import Cpu from 'components/CPU.vue';
import { useCpuStore } from '../../stores/cpu';
import {
  CpuAccessor,
  CpuStage,
  updateCpu,
  type CpuState,
} from '../../engine/cpu';
import initialDecoderState from '../../config/initialDecoder.json';
import { readDecoder } from '../../engine/readDecoder';
import type { IDecoderJson } from '../../engine/readDecoder';
import type { IDecoderState } from '../../interfaces/decoder';
import { useShepherd } from 'vue-shepherd';
import 'shepherd.js/dist/css/shepherd.css';
import { useTutorial } from '../../stores/tutorial';

const emit = defineEmits(['advance']);

const decoderState: IDecoderState = readDecoder(
  initialDecoderState as IDecoderJson,
);

const cpuStore = useCpuStore();
const cpuEl = useTemplateRef('cpuEl');
const tutorial = useTutorial();

const cpu = computed({
  get(): Readonly<CpuState> {
    return cpuStore.cpu;
  },
  set(newCpu: CpuState) {
    cpuStore.update(newCpu);
  },
});

const tour = useShepherd({
  useModalOverlay: true,
});

onMounted(() => {
  tour.options.modalContainer = document.querySelector('#tour-page')!;
  tour.options.stepsContainer = document.querySelector('#tour-page')!;
  addStep(
    'main',
    '',
    'Welcome to the b4CPU tutorial.<br />This is a simple CPU with a very simple instruction set.<br/>The CPU is made up of a few components, which are explained in the next steps.',
  );
  addStep(
    'rom_0',
    '#programm',
    'This is the ROM. Here you can enter the instructions you want to execute.',
  );
  addStep(
    'rom_1',
    '#rom_inst_0',
    'These are the op codes. They tell the CPU what instruction to execute.',
    {
      extraHighlights: Array.from(range(1, 15)).map((x) => `#rom_inst_${x}`),
    },
  );
  addStep(
    'rom_2',
    '#rom_addr_0',
    'Some op codes require an address. This can, for example, be a ram address to load from, or a rom address to jump to.',
    {
      extraHighlights: Array.from(range(1, 15)).map((x) => `#rom_addr_${x}`),
    },
  );
  addStep(
    'rom_3',
    '#rom_data_0',
    'Some op codes require data. This can e.g. be used to store hardcoded values in the register.',
    {
      extraHighlights: Array.from(range(1, 15)).map((x) => `#rom_data_${x}`),
    },
  );

  addStep(
    'pc',
    '#program_counter',
    'This is the program counter. It keeps track of which instruction is currently being executed. Change the value here to proceed, then press Next.',
    {
      canContinue: () => {
        const pc = CpuAccessor.getPc(cpu.value);
        if (pc !== 0) {
          return true;
        }
        return false;
      },
    },
  );

  addStep(
    'rom_5',
    '#pc_counter_arrow',
    'Note how this arrow has moved because of the change you just made. It it indicates which instruction is currently being executed.',
  );

  addStep('ram_0', '#ram', 'This is the RAM. It can be used to store data.');

  addStep(
    'ram_1',
    '#rom_addr_0',
    'I have set the program counter back to 0. Change the address value here to proceed, then press Next.',
    {
      canContinue: () => {
        const addr = CpuAccessor.getInstructionsAddr(
          cpu.value,
          CpuAccessor.getPc(cpu.value),
        );
        if (addr !== 0) {
          return true;
        }
        return false;
      },
      onStart: () => {
        cpu.value = updateCpu(cpu.value, (cpu) => {
          CpuAccessor.setPc(cpu, 0);
        });
      },
    },
  );

  addStep(
    'ram_2',
    '#main_address_bus',
    'The value on the address bus has changed to the value you set. The address bus pases the address value between different components of the CPU.',
    {
      extraHighlights: ['#program_out_address', '#ram_in_address'],
    },
  );

  addStep(
    'ram_3',
    '#ram',
    'Based on the new address value, the arrow on the RAM component new shows the currently selected slot.',
  );

  addStep(
    'register_a',
    '#reg_a',
    'This is the A register. It is used to temporarily store data. It stores the first operand for arithmatic operations. Computation results are also stored here.',
  );

  addStep(
    'register_b',
    '#reg_b',
    'This is the B register. It provides the second operand for arithmatic operations.',
  );

  addStep(
    'alu',
    '#alu',
    'This is the ALU. It performs arithmatic operations on the A and B registers.',
  );

  addStep(
    'alu_1',
    '#flag_z',
    'This is the Z flag. It indicates if the result of the last operation was zero.',
  );

  addStep(
    'alu_2',
    '#flag_o',
    'This is the O flag. It indicates if the result of the last operation was negative or larger than 15.',
  );

  addStep(
    'alu_3',
    '#jmpManager',
    'This is the jump test. Based on the Z and O flags, it can tell the Program Counter to jump or not.',
  );

  addStep(
    'decoder',
    '#decoder_timer',
    'This is the control unit. It reads the instruction from the ROM sends the corresponding commands to the components of the CPU at the correct timings.',
  );
  addStep(
    'decoder_1',
    '#decoder_timer',
    'These arrows show what stage the CPU is currently in. Depending on the stage, each instruction reqiures different signals to be sent to the components.',
  );
  addStep(
    'decoder_2',
    '#control_unit_step_btn',
    'This button advances the CPU to the next stage. Click it and observe the stage arrows change.',
    {
      canContinue: () => {
        const stage = CpuAccessor.getStage(cpu.value);
        if (stage !== CpuStage.Fetch) {
          return true;
        }
        return false;
      },
      onStart: () => {
        cpu.value = updateCpu(cpu.value, (cpu) => {
          CpuAccessor.setStage(cpu, CpuStage.Fetch);
        });
      },
    },
  );
  addStep(
    'decoder_3',
    '#control_unit_cycle_btn',
    'This button advances the CPU to the next instruction. It executes all stages up until the next Fetch stage. Click it and observe the program counter change.',
    {
      canContinue: () => {
        const pc = CpuAccessor.getPc(cpu.value);
        return pc !== 0;
      },
      onStart: () => {
        cpu.value = updateCpu(cpu.value, (cpu) => {
          CpuAccessor.setPc(cpu, 0);
        });
      },
    },
  );
  tour.addStep({
    when: {
      show() {
        emit('advance');
      },
    },
  });

  (async () => {
    const s = tutorial.step;
    await tour.start();

    if (s) {
      tour.show(s);
    }
  })().catch((e) => {
    console.error(e);
  });
});

onUnmounted(() => {
  tour.cancel().catch((e) => {
    console.error(e);
  });
});

function* range(start: number, end: number): Generator<number> {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

function addStep(
  id: string,
  element: string | undefined,
  text: string,
  {
    extraHighlights,
    canContinue,
    onStart,
  }: {
    extraHighlights?: string[];
    canContinue?: () => boolean;
    onStart?: () => void;
  } = {},
) {
  let allowContinue = true;
  const step = tour.addStep({
    id,
    ...(element
      ? { attachTo: { element, on: 'auto' } }
      : { classes: 'tutorial-step' }),
    when: {
      show() {
        tutorial.step = this.id;
        onStart?.();
      },
    },
    text,
    ...(extraHighlights ? { extraHighlights } : {}),
    buttons: [
      ...(tour.steps.length > 0
        ? [{ action: () => tour.back(), text: 'Back' }]
        : []),
      {
        action: () => tour.next(),
        disabled: () => !allowContinue,
        text: 'Next',
        classes: 'tutorial-next-button',
      },
    ],
  });

  if (canContinue) {
    allowContinue = canContinue();
    watch(
      () => cpu.value,
      () => {
        allowContinue = canContinue();
        if (tour.currentStep === step) {
          document
            .querySelector(`[data-shepherd-step-id="${id}"]`)
            ?.querySelector('.tutorial-next-button')
            ?.toggleAttribute('disabled', !allowContinue);
        }
      },
    );
  }
}
</script>

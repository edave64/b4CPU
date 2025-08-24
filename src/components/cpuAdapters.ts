import { updateCpu, CpuAccessor } from '../engine/cpu';
import type { CpuState } from '../engine/cpu';
import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';

export function accessorComputed<K extends 'RegA' | 'RegB' | 'Pc'>(
  key: K,
  cpuVal: Ref<CpuState>,
): ComputedRef<number>;
export function accessorComputed<K extends 'FlagO' | 'FlagZ'>(
  key: K,
  cpuVal: Ref<CpuState>,
): ComputedRef<boolean>;
export function accessorComputed<
  K extends 'InstructionsOp' | 'InstructionsAddr' | 'InstructionsData' | 'Ram',
>(key: K, cpuVal: Ref<CpuState>, index: number): ComputedRef<number>;
export function accessorComputed(
  key: string,
  cpuVal: Ref<CpuState>,
  ...args: unknown[]
) {
  return computed({
    get() {
      //@ts-expect-error Not bothering with proper automatic typing here
      return CpuAccessor[`get${key}`](cpuVal.value, ...args);
    },
    set(value) {
      cpuVal.value = updateCpu(cpuVal.value, (cpu) => {
        //@ts-expect-error Not bothering with proper automatic typing here
        CpuAccessor[`set${key}`](cpu, ...args, value);
      });
    },
  });
}

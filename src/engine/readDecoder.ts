import { AllGates, type IDecoderState } from '../interfaces/decoder';
import type { Gates } from '../interfaces/decoder';
import { CpuStage } from './cpu';

export function readDecoder(decoderJson: IDecoderJson): IDecoderState {
  return {
    instructions: decoderJson.instructions.map((i) => ({
      name: i.name,
      gates: new Set(i.gates),
    })),
    timingMasks: {
      [CpuStage.Fetch]: new Set(decoderJson.timingMasks.fetch),
      [CpuStage.Decode]: new Set(decoderJson.timingMasks.decode),
      [CpuStage.Read]: new Set(decoderJson.timingMasks.read),
      [CpuStage.Execute]: new Set(decoderJson.timingMasks.exec),
      [CpuStage.Write]: new Set(decoderJson.timingMasks.write),
    },
  };
}

export interface IDecoderJson {
  instructions: Array<{ name: string; gates: Gates[] }>;
  timingMasks: {
    fetch: Gates[];
    decode: Gates[];
    read: Gates[];
    exec: Gates[];
    write: Gates[];
  };
}

export function verifyDecoder(
  decoderJson: unknown,
): decoderJson is IDecoderJson {
  if (typeof decoderJson !== 'object') return false;
  if (decoderJson === null) return false;
  if (!('instructions' in decoderJson)) return false;
  if (!Array.isArray(decoderJson.instructions)) return false;
  if (
    !decoderJson.instructions.every((instruction) => {
      if (typeof instruction !== 'object') return false;
      if (instruction === null) return false;
      if (!('name' in instruction)) return false;
      if (typeof instruction.name !== 'string') return false;
      if (!('gates' in instruction)) return false;
      if (!Array.isArray(instruction.gates)) return false;
      if (
        !instruction.gates.every(
          (gate: unknown) => typeof gate === 'string' && AllGates.has(gate),
        )
      )
        return false;
      return true;
    })
  )
    return false;
  if (!('timingMasks' in decoderJson)) return false;
  if (typeof decoderJson.timingMasks !== 'object') return false;
  if (decoderJson.timingMasks === null) return false;
  if (!('fetch' in decoderJson.timingMasks)) return false;
  if (!verifyMask(decoderJson.timingMasks.fetch)) return false;
  if (!('decode' in decoderJson.timingMasks)) return false;
  if (!verifyMask(decoderJson.timingMasks.decode)) return false;
  if (!('read' in decoderJson.timingMasks)) return false;
  if (!verifyMask(decoderJson.timingMasks.read)) return false;
  if (!('exec' in decoderJson.timingMasks)) return false;
  if (!verifyMask(decoderJson.timingMasks.exec)) return false;
  if (!('write' in decoderJson.timingMasks)) return false;
  if (!verifyMask(decoderJson.timingMasks.write)) return false;
  return true;
}

function verifyMask(mask: unknown): mask is Gates[] {
  if (!Array.isArray(mask)) return false;
  if (
    !mask.every(
      (gate: unknown) => typeof gate === 'string' && AllGates.has(gate),
    )
  )
    return false;
  return true;
}

import { type IDecoderState } from '../interfaces/decoder';
import { Gate } from './cpu';
import { CpuStage } from './cpu';

export function readDecoder(decoderJson: IDecoderJson): IDecoderState {
  return {
    instructions: decoderJson.instructions.map((i) => ({
      name: i.name,
      gates: i.gates.reduce(readGates, 0),
    })),
    timingMasks: {
      [CpuStage.Fetch]: decoderJson.timingMasks.fetch.reduce(readGates, 0),
      [CpuStage.Decode]: decoderJson.timingMasks.decode.reduce(readGates, 0),
      [CpuStage.Read]: decoderJson.timingMasks.read.reduce(readGates, 0),
      [CpuStage.Execute]: decoderJson.timingMasks.exec.reduce(readGates, 0),
      [CpuStage.Write]: decoderJson.timingMasks.write.reduce(readGates, 0),
    },
  };
}

function readGates(acc: number, gate: string): number {
  if (!(gate in Gate)) throw new Error('Invalid gate');
  return Gate[gate as keyof typeof Gate] | acc;
}

export interface IDecoderJson {
  instructions: Array<{ name: string; gates: string[] }>;
  timingMasks: {
    fetch: string[];
    decode: string[];
    read: string[];
    exec: string[];
    write: string[];
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
          (gate: unknown) => typeof gate === 'string' && gate in Gate,
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

function verifyMask(mask: unknown): mask is Gate[] {
  if (!Array.isArray(mask)) return false;
  if (!mask.every((gate: unknown) => typeof gate === 'string' && gate in Gate))
    return false;
  return true;
}

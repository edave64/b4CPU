import type { CpuStage } from '../engine/cpu';

export type Gates =
  | 'JN'
  | 'JZ'
  | 'JO'
  | 'AR'
  | 'AW'
  | 'BR'
  | 'BW'
  | 'ALU1'
  | 'ALU2'
  | 'RR'
  | 'RW';

export const AllGates: Set<string> = new Set([
  'JN',
  'JZ',
  'JO',
  'RR',
  'RW',
  'AR',
  'AW',
  'BR',
  'BW',
  'ALU1',
  'ALU2',
]);

export interface IInstruction {
  name: string;
  gates: Set<Gates>;
}

export interface IDecoderState {
  instructions: IInstruction[];
  timingMasks: Record<CpuStage, Set<Gates>>;
}

import type { CpuStage } from '../engine/cpu';
import { Gate } from '../engine/cpu';

export const AllGates: Set<Gate> = new Set([
  Gate.JN,
  Gate.JZ,
  Gate.JO,
  Gate.RR,
  Gate.RW,
  Gate.AR,
  Gate.AW,
  Gate.BR,
  Gate.BW,
  Gate.ALU1,
  Gate.ALU2,
]);

export interface IInstruction {
  name: string;
  gates: number;
}

export interface IDecoderState {
  instructions: IInstruction[];
  timingMasks: Record<CpuStage, number>;
}

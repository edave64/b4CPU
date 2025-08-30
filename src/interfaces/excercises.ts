import type { CpuState } from '../engine/cpu';
import type { IDecoderState } from './decoder';

export interface IExcerciseState {
  initial: CpuState;
  mask: CpuState;
  decoder: IDecoderState;
  initialAssignments?: Record<Target, InitialAssignments>;
  goal: Goal;
}

type Number =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;
type Target = 'a' | 'b' | `ram${Number}`;
type InitialAssignments = `random[${number}]`;

type Goal = {
  join: 'and' | 'or' | 'xor' | 'gt' | 'lt' | 'eq';
  goalA: Goal | Target | InitialAssignments;
  goalB: Goal | Target | InitialAssignments;
  not?: boolean;
};

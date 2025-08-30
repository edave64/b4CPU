import type { IDecoderJson } from '../engine/readDecoder';
import { type CpuState } from '../engine/cpu';
import type { IDecoderState } from './decoder';

export interface IExcerciseState {
  initial: CpuState;
  mask: CpuState;
  decoder: IDecoderState;
  initialAssignments?: Record<Target, InitialAssignments>;
  random: Uint8Array;
  testGoal: (cpu: CpuState, state: IExcerciseState) => boolean;
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

type GoalJSON = {
  join: 'and' | 'or' | 'xor' | 'gt' | 'lt' | 'eq';
  goalA: GoalJSON | Target | InitialAssignments | number;
  goalB: GoalJSON | Target | InitialAssignments | number;
  not?: boolean;
};

export function compileGoal(
  goal: GoalJSON,
): (cpu: CpuState, state: IExcerciseState) => number {
  const vars = new Set<Target | InitialAssignments>();
  const goalStr = compileGoalRec(goal, vars);
  let preamble = '';
  for (const varName of vars) {
    if (varName.startsWith('ram')) {
      preamble += `const ${varName} = CpuAccessor.getRam(cpu, ${varName.slice(3)});\n`;
    } else if (varName === 'a') {
      preamble += `const ${varName} = CpuAccessor.getRegA(cpu);\n`;
    } else if (varName === 'b') {
      preamble += `const ${varName} = CpuAccessor.getRegB(cpu);\n`;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function('cpu', 'goal', `${preamble}\nreturn ${goalStr};`) as (
    cpu: CpuState,
    goal: IExcerciseState,
  ) => number;
}

function compileGoalRec(
  goal: GoalJSON | Target | InitialAssignments | number,
  vars: Set<Target | InitialAssignments>,
): string {
  if (typeof goal === 'string') {
    if (!goal.match(/^(ram[0-9]|ram1[0-5]|a|b|random\[\d+\])$/)) {
      // vars will be directly inserted into the evaled code
      // So to prevent injection, we only allow a limited set of variables
      throw new Error(`Invalid target: ${goal}`);
    }
    vars.add(goal);
    if (goal.startsWith('random[')) {
      return `goal.${goal}`;
    }
    return goal;
  } else if (typeof goal === 'number') {
    return goal.toString();
  } else {
    const { goalA, goalB, join, not } = goal;
    const joiner = (
      {
        and: ' && ',
        or: ' || ',
        xor: ' ^ ',
        gt: ' > ',
        lt: ' < ',
        eq: ' == ',
      } as Record<GoalJSON['join'], string>
    )[join];
    if (!joiner) {
      throw new Error(`Invalid join: ${join}`);
    }

    return `(${not ? '~' : ''}(${compileGoalRec(goalA, vars)} ${joiner} ${compileGoalRec(goalB, vars)}) & 15)`;
  }
}

export interface IExcerciseJSON {
  cpu: Array<number>;
  mask: Array<number>;
  decoder: IDecoderJson;
  initialAssignments?: Record<Target, InitialAssignments>;
  goal: GoalJSON;
}

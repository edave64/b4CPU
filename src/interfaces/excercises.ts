import { readDecoder, type IDecoderJson } from '../engine/readDecoder';
import { CpuAccessor, type CpuState } from '../engine/cpu';
import type { IDecoderState } from './decoder';
import { markRaw } from 'vue';

export interface IExcerciseState {
  cpu: CpuState;
  mask: CpuState;
  decoder: IDecoderState;
  random: Uint8Array;
  testGoal: (cpu: CpuState, state: IExcerciseState) => boolean;
}
export interface IExcerciseEditingState {
  initial: CpuState;
  mask: CpuState;
  decoder: IDecoderState;
  initialAssignments: Partial<Record<Target, InitialAssignments>>;
  description: string;
  goal: GoalJSON;
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
export type Target = 'a' | 'b' | `ram${Number}`;
type InitialAssignments = `random[${number}]`;

export type GoalJSON = {
  join: 'and' | 'or' | 'xor' | 'gt' | 'lt' | 'eq';
  goalA: GoalJSON | Target | InitialAssignments | number;
  goalB: GoalJSON | Target | InitialAssignments | number;
  not?: boolean;
};

export function compileGoal(
  goal: GoalJSON,
): (cpu: CpuState, state: IExcerciseState) => boolean {
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
  return new Function(
    'CpuAccessor',
    'cpu',
    'goal',
    `${preamble}\nreturn (${goalStr}) > 0;`,
  ).bind(null, CpuAccessor) as (
    cpu: CpuState,
    goal: IExcerciseState,
  ) => boolean;
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
  initialAssignments?: Partial<Record<Target, InitialAssignments>>;
  goal: GoalJSON;
}

export function initTask(json: IExcerciseJSON): IExcerciseState {
  const random = new Uint8Array(18);
  for (let i = 0; i < 18; i++) {
    random[i] = Math.floor(Math.random() * 16);
  }
  const cpu = new Uint8Array(json.cpu);
  for (const target in json.initialAssignments) {
    const targetT = target as Target;
    if (!Object.prototype.hasOwnProperty.call(json.initialAssignments, target))
      continue;
    if (!json.initialAssignments[targetT]) continue;
    if (json.initialAssignments[targetT].startsWith('random[')) {
      const idx = parseInt(json.initialAssignments[targetT].slice(7, -1));
      if (idx < 0 || idx >= 18) continue;
      if (targetT === 'a') {
        CpuAccessor.setRegA(cpu, random[idx] ?? 0);
      } else if (targetT === 'b') {
        CpuAccessor.setRegB(cpu, random[idx] ?? 0);
      } else if (targetT.startsWith('ram[')) {
        const ramIdx = parseInt(targetT.slice(4));
        if (ramIdx < 0 || ramIdx >= 16) continue;
        CpuAccessor.setRam(cpu, ramIdx, random[idx] ?? 0);
      } else {
        throw new Error(`Invalid target: ${targetT}`);
      }
    }
  }
  return {
    cpu: markRaw(cpu),
    mask: markRaw(new Uint8Array(json.mask)),
    decoder: readDecoder(json.decoder),
    random: random,
    testGoal: compileGoal(json.goal),
  };
}

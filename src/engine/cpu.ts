import type { IDecoderState } from '../interfaces/decoder';

export const CpuStage = {
  Fetch: 0,
  Decode: 1,
  Read: 2,
  Execute: 3,
  Write: 4,
} as const;
export type CpuStage = (typeof CpuStage)[keyof typeof CpuStage];

export const Gate = {
  JN: 1,
  JZ: 1 << 1,
  JO: 1 << 2,
  RR: 1 << 3,
  RW: 1 << 4,
  AR: 1 << 5,
  AW: 1 << 6,
  BR: 1 << 7,
  BW: 1 << 8,
  ALU1: 1 << 9,
  ALU2: 1 << 10,
};
export type Gate = (typeof Gate)[keyof typeof Gate];
const GateReverse: Record<Gate, string> = Object.fromEntries(
  Object.entries(Gate).map(([key, value]) => [value, key]),
);

export const AluOp = {
  None: 0,
  And: 1,
  Add: 2,
  Sub: 3,
} as const;
export type AluOp = (typeof AluOp)[keyof typeof AluOp];

export type CpuState = Uint8Array;

const NextStage = {
  [CpuStage.Fetch]: CpuStage.Decode,
  [CpuStage.Decode]: CpuStage.Read,
  [CpuStage.Read]: CpuStage.Execute,
  [CpuStage.Execute]: CpuStage.Write,
  [CpuStage.Write]: CpuStage.Fetch,
} as const;

export function makeCpuState(): CpuState {
  return new Uint8Array(84).fill(0);
}

export const CpuAccessor = {
  validateState(state: CpuState): void {
    if (state.length !== 2) {
      throw new Error('State must be of length 2');
    }
  },

  getRegA(state: CpuState): number {
    return state[0]! & 0b1111;
  },
  setRegA(state: CpuState, value: number): void {
    state[0] = value & 0b1111;
  },

  getRegB(state: CpuState): number {
    return state[1]! & 0b1111;
  },
  setRegB(state: CpuState, value: number): void {
    state[1] = value & 0b1111;
  },

  getPc(state: CpuState): number {
    return state[2]! & 0b1111;
  },
  setPc(state: CpuState, value: number): void {
    state[2] = value & 0b1111;
  },

  getFlagZ(state: CpuState): boolean {
    return !!(state[3]! & 0b1000);
  },
  setFlagZ(state: CpuState, value: boolean): void {
    state[3] = (state[3]! & 0b0111) | (value ? 0b1000 : 0b0000);
  },

  getFlagO(state: CpuState): boolean {
    return !!(state[3]! & 0b0100);
  },
  setFlagO(state: CpuState, value: boolean): void {
    state[3] = (state[3]! & 0b1011) | (value ? 0b0100 : 0b0000);
  },

  getRam(state: CpuState, index: number): number {
    return state[4 + (index & 0b1111)]! & 0b1111;
  },
  setRam(state: CpuState, index: number, value: number): void {
    state[4 + (index & 0b1111)] = value & 0b1111;
  },

  getInstructionsOp(state: CpuState, index: number): number {
    return state[20 + (index & 0b1111)]! & 0b1111;
  },
  setInstructionsOp(state: CpuState, index: number, value: number): void {
    state[20 + (index & 0b1111)] = value & 0b1111;
  },

  getInstructionsAddr(state: CpuState, index: number): number {
    return state[36 + (index & 0b1111)]! & 0b1111;
  },
  setInstructionsAddr(state: CpuState, index: number, value: number): void {
    state[36 + (index & 0b1111)] = value & 0b1111;
  },

  getInstructionsData(state: CpuState, index: number): number {
    return state[52 + (index & 0b1111)]! & 0b1111;
  },
  setInstructionsData(state: CpuState, index: number, value: number): void {
    state[52 + (index & 0b1111)] = value & 0b1111;
  },

  getStage(state: CpuState): CpuStage {
    return (state[68]! & 0b1111) as CpuStage;
  },
  setStage(state: CpuState, value: CpuStage): void {
    state[68] = value & 0b1111;
  },

  getLastDecodedGates(state: CpuState, stage: CpuStage): number {
    const index = 69 + stage * 2;
    return (state[index]! << 8) | state[index + 1]!;
  },
  setLastDecodedGates(state: CpuState, stage: CpuStage, value: number): void {
    const index = 69 + stage * 2;
    state[index] = (value >> 8) & 0xff;
    state[index + 1] = value & 0xff;
  },

  getLatchedRegA(state: CpuState): number {
    return state[79]! & 0b1111;
  },
  setLatchedRegA(state: CpuState, value: number): void {
    state[79] = value & 0b1111;
  },

  getLatchedRegB(state: CpuState): number {
    return state[80]! & 0b1111;
  },
  setLatchedRegB(state: CpuState, value: number): void {
    state[80] = value & 0b1111;
  },

  getLatchedRamOut(state: CpuState): number {
    return state[81]! & 0b1111;
  },
  setLatchedRamOut(state: CpuState, value: number): void {
    state[81] = value & 0b1111;
  },

  getLatchedAluInA(state: CpuState): number {
    return state[82]! & 0b1111;
  },
  setLatchedAluInA(state: CpuState, value: number): void {
    state[82] = value & 0b1111;
  },

  getLatchedAluInB(state: CpuState): number {
    return state[83]! & 0b1111;
  },
  setLatchedAluInB(state: CpuState, value: number): void {
    state[83] = value & 0b1111;
  },

  execAluOp(state: CpuState): number {
    const stage = CpuAccessor.getStage(state);
    const gates = CpuAccessor.getLastDecodedGates(state, stage);
    const aluOp = getAluOp(gates);
    const regA = CpuAccessor.getLatchedAluInA(state);
    const regB = CpuAccessor.getLatchedAluInB(state);
    switch (aluOp) {
      case AluOp.Add:
        return regA + regB;
      case AluOp.Sub:
        return regA - regB;
      case AluOp.And:
        return regA & regB;
      default:
        return 0;
    }
  },

  getDataBus(state: CpuState): number {
    const stage = CpuAccessor.getStage(state);
    const gates = CpuAccessor.getLastDecodedGates(state, stage);
    const pc = CpuAccessor.getPc(state);
    let value = CpuAccessor.getInstructionsData(state, pc);
    if (gates & Gate.AR) {
      value |= CpuAccessor.getLatchedRegA(state);
    }
    if (gates & Gate.BR) {
      value |= CpuAccessor.getLatchedRegB(state);
    }
    if (gates & Gate.RR) {
      value |= CpuAccessor.getLatchedRamOut(state);
    }
    if (gates & Gate.ALU1 || gates & Gate.ALU2) {
      value |= CpuAccessor.execAluOp(state) & 0b1111;
    }
    return value;
  },
};

export function getAluOp(gates: number): AluOp {
  return ((gates & Gate.ALU1 ? 1 : 0) + (gates & Gate.ALU2 ? 2 : 0)) as AluOp;
}

export function cpuStep(
  decoderState: IDecoderState,
  state: CpuState,
): CpuState {
  const newState = state.slice();

  const oldStage = CpuAccessor.getStage(newState);
  const currentStage = NextStage[oldStage];
  const pc = CpuAccessor.getPc(newState);

  if (currentStage === CpuStage.Decode) {
    const instructionsOp = CpuAccessor.getInstructionsOp(newState, pc);
    const instructionGates = decoderState.instructions[instructionsOp]!.gates;
    const masks = decoderState.timingMasks;

    for (const stage of Object.values(CpuStage)) {
      CpuAccessor.setLastDecodedGates(
        newState,
        stage,
        instructionGates & masks[stage],
      );
    }
  }

  CpuAccessor.setStage(newState, currentStage);
  const oldGates = CpuAccessor.getLastDecodedGates(newState, oldStage);
  const currentGates = CpuAccessor.getLastDecodedGates(newState, currentStage);
  const gatesActivated = (currentGates ^ oldGates) & currentGates;

  if (gatesActivated & Gate.AR) {
    CpuAccessor.setLatchedRegA(newState, CpuAccessor.getRegA(newState));
  }
  if (gatesActivated & Gate.BR) {
    CpuAccessor.setLatchedRegB(newState, CpuAccessor.getRegB(newState));
  }
  if (gatesActivated & Gate.RR) {
    const address = CpuAccessor.getInstructionsAddr(newState, pc);
    CpuAccessor.setLatchedRamOut(
      newState,
      CpuAccessor.getRam(newState, address),
    );
  }

  if (gatesActivated & Gate.AW) {
    CpuAccessor.setRegA(newState, CpuAccessor.getDataBus(newState));
  }
  if (gatesActivated & Gate.BW) {
    CpuAccessor.setRegB(newState, CpuAccessor.getDataBus(newState));
  }
  if (gatesActivated & Gate.RW) {
    const address = CpuAccessor.getInstructionsAddr(newState, pc);
    CpuAccessor.setRam(newState, address, CpuAccessor.getDataBus(newState));
  }

  if (gatesActivated & Gate.ALU1 || gatesActivated & Gate.ALU2) {
    const regA = CpuAccessor.getRegA(newState);
    const regB = CpuAccessor.getRegB(newState);
    CpuAccessor.setLatchedAluInA(newState, regA);
    CpuAccessor.setLatchedAluInB(newState, regB);

    const value = CpuAccessor.execAluOp(newState);

    CpuAccessor.setFlagZ(newState, (value & 0b1111) === 0);
    CpuAccessor.setFlagO(newState, value > 0b1111 || value < 0);
  }

  if (currentStage === CpuStage.Fetch) {
    const jmpNot = !!(currentGates & Gate.JN);
    const jmpOverflow = !!(currentGates & Gate.JO);
    const jmpZero = !!(currentGates & Gate.JZ);

    const nextPC = doJump(jmpNot, jmpOverflow, jmpZero, newState)
      ? CpuAccessor.getInstructionsAddr(newState, pc)
      : pc + 1;
    CpuAccessor.setPc(newState, nextPC);
  }

  return newState;
}

export function runInstruction(
  decoderState: IDecoderState,
  state: CpuState,
): CpuState {
  do {
    state = cpuStep(decoderState, state);
  } while (CpuAccessor.getStage(state) !== CpuStage.Fetch);
  return state;
}

function doJump(
  jmpNot: boolean,
  jmpOverflow: boolean,
  jmpZero: boolean,
  cpuState: CpuState,
): boolean {
  if (!jmpOverflow && !jmpZero) {
    return jmpNot;
  }

  const conditions =
    (jmpZero ? CpuAccessor.getFlagZ(cpuState) : true) &&
    (jmpOverflow ? CpuAccessor.getFlagO(cpuState) : true);
  return jmpNot ? !conditions : conditions;
}

export function gateSetToStrAry(gates: number): string[] {
  const ary: string[] = [];
  for (const key of Object.values(Gate)) {
    if (gates & key) {
      ary.push(GateReverse[key]!);
    }
  }
  return ary;
}

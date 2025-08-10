import type { Gates, IDecoderState } from '../interfaces/decoder';
import type { DeepReadonly, Ref } from 'vue';
import { computed, reactive, ref, watch } from 'vue';
import { readDecoder, type IDecoderJson } from './readDecoder';

export enum CpuStage {
  Fetch,
  Decode,
  Read,
  Execute,
  Write,
}

export class Cpu {
  public static NextStage = {
    [CpuStage.Fetch]: CpuStage.Decode,
    [CpuStage.Decode]: CpuStage.Read,
    [CpuStage.Read]: CpuStage.Execute,
    [CpuStage.Execute]: CpuStage.Write,
    [CpuStage.Write]: CpuStage.Fetch,
  } as { [key: number]: CpuStage };

  private readonly _stage = ref(CpuStage.Fetch);
  public readonly pc = ref(0);
  public readonly address = computed(
    () => this.instructionsAddr[this.pc.value]!,
  );
  public readonly regA = ref(0);
  public readonly regB = ref(0);
  public readonly flagZ = ref(false);
  public readonly flagO = ref(false);

  private readonly _pcJump = computed(() => {
    const jmpNot = this._jmpNot.value;
    const jmpOverflow = this._jmpOverflow.value;
    const jmpZero = this._jmpZero.value;

    if (!jmpOverflow && !jmpZero) {
      return jmpNot;
    }

    const conditions =
      (jmpZero ? this.flagZ.value : true) &&
      (jmpOverflow ? this.flagO.value : true);
    return jmpNot ? !conditions : conditions;
  });
  private readonly _jmpNot = ref(false);
  private readonly _jmpZero = ref(false);
  private readonly _jmpOverflow = ref(false);
  private readonly _regAWrite = ref(false);
  private readonly _regARead = ref(false);
  private readonly _regBWrite = ref(false);
  private readonly _regBRead = ref(false);
  private readonly _ramWrite = ref(false);
  private readonly _ramRead = ref(false);
  private readonly _aluOp1 = ref(false);
  private readonly _aluOp2 = ref(false);
  private readonly _aluOp = computed(
    () => (this._aluOp1.value ? 1 : 0) + (this._aluOp2.value ? 2 : 0),
  );

  private readonly _aluInA = ref(0);
  private readonly _aluInB = ref(0);

  private readonly _regAOut = ref(0);
  private readonly _regBOut = ref(0);
  private readonly _aluOut = ref(0);
  private readonly _ramOut = ref(0);

  public readonly data = computed(() => {
    return (
      (this._regARead.value ? this._regAOut.value : 0) |
      (this._regBRead.value ? this._regBOut.value : 0) |
      (this._aluOp.value ? this._aluOut.value : 0) |
      (this._ramRead.value ? this._ramOut.value : 0) |
      this.instructionsData[this.pc.value]!
    );
  });

  public readonly aluInA = computed(() => {
    if (this._aluOp.value === 0) return this.regA.value;
    return this._aluInA.value;
  });

  public readonly aluInB = computed(() => {
    if (this._aluOp.value === 0) return this.regB.value;
    return this._aluInB.value;
  });

  public get pcJump() {
    return this._pcJump.value;
  }

  public get stage() {
    return this._stage.value;
  }

  public set stage(newStage: CpuStage) {
    if (newStage === this._stage.value) return;
    switch (newStage) {
      case CpuStage.Fetch: {
        const targetAddr = this.pcJump
          ? this.address.value
          : (this.pc.value + 1) & 0b1111;
        this.pc.value = targetAddr;
        break;
      }
      case CpuStage.Decode:
        this.decodedStages = this.decodeStages(this.pc.value);
        break;
    }
    this._stage.value = newStage;
  }

  public get jmpNot() {
    return this._jmpNot.value;
  }
  public get jmpZero() {
    return this._jmpZero.value;
  }
  public get jmpOverflow() {
    return this._jmpOverflow.value;
  }
  public get regAWrite() {
    return this._regAWrite.value;
  }
  public get regARead() {
    return this._regARead.value;
  }
  public get regBWrite() {
    return this._regBWrite.value;
  }
  public get regBRead() {
    return this._regBRead.value;
  }
  public get ramWrite() {
    return this._ramWrite.value;
  }
  public get ramRead() {
    return this._ramRead.value;
  }
  public get aluOp() {
    return this._aluOp.value;
  }

  public readonly ram = reactive(Array(16).fill(0) as number[]);
  public readonly instructionsOp = reactive(Array(16).fill(0) as number[]);
  public readonly instructionsAddr = reactive(Array(16).fill(0) as number[]);
  public readonly instructionsData = reactive(Array(16).fill(0) as number[]);

  protected execAluOp() {
    const aluOp = this.aluOp;
    const regA = this.regA.value;
    const regB = this.regB.value;
    switch (aluOp) {
      case 1:
        return regA & regB;
      case 2:
        return regA + regB;
      case 3:
        return regA - regB;
    }
    return 0;
  }

  public constructor(
    public readonly decoderState: DeepReadonly<IDecoderState>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).cpu = this;

    watch(
      () => this.instructionsOp[this.pc.value],
      () => {
        if (this.stage === CpuStage.Decode) {
          this.decodedStages = this.decodeStages(this.pc.value);
        }
      },
    );
    this.decodedStages = this.decodeStages(this.pc.value);
  }

  public nextStage() {
    const stage = this.stage;
    const nextStage = Cpu.NextStage[stage]!;
    const oldGates = this.decodedStages[stage];
    const newGates = this.decodedStages[nextStage];

    for (const key of Object.keys(this.gateMap) as Gates[]) {
      const gate = this.gateMap[key];
      gate.value = newGates.has(key);
    }

    const gatesActivated = newGates.difference(oldGates);
    this.processGateActivations(gatesActivated);

    // Setting stage to fetch handles pc update
    this.stage = nextStage;
  }

  processGateActivations(gatesActivated: Set<Gates>) {
    if (gatesActivated.has('AR')) {
      this._regAOut.value = this.regA.value;
    }
    if (gatesActivated.has('BR')) {
      this._regBOut.value = this.regB.value;
    }
    if (gatesActivated.has('RR')) {
      this._ramOut.value = this.ram[this.address.value]!;
    }

    if (gatesActivated.has('AW')) {
      this.regA.value = this.data.value;
    }
    if (gatesActivated.has('BW')) {
      this.regB.value = this.data.value;
    }
    if (gatesActivated.has('RW')) {
      this.ram[this.address.value] = this.data.value;
    }

    if (gatesActivated.has('ALU1') || gatesActivated.has('ALU2')) {
      const value = this.execAluOp();
      this._aluInA.value = this.regA.value;
      this._aluInB.value = this.regB.value;
      this._aluOut.value = value & 0b1111;
      this.flagZ.value = this._aluOut.value === 0;
      this.flagO.value = value > 0b1111 || value < 0;
    }
  }

  public step() {
    do {
      this.nextStage();
    } while (this.stage !== CpuStage.Fetch);
  }

  private decodedStages: Record<CpuStage, Set<Gates>>;

  private decodeStage(op: number, stage: CpuStage): Set<Gates> {
    const gates = this.decoderState.instructions[op]!.gates;
    const mask = this.decoderState.timingMasks[stage];
    return gates.intersection(mask);
  }

  public saveState(): ICpuState {
    return {
      regA: this.regA.value,
      regB: this.regB.value,
      pc: this.pc.value,
      instructionsOp: Array.from(this.instructionsOp),
      instructionsAddr: Array.from(this.instructionsAddr),
      instructionsData: Array.from(this.instructionsData),
      ram: Array.from(this.ram),
      stage: this.stage,

      flagZ: this.flagZ.value,
      flagO: this.flagO.value,

      aluInA: this._aluInA.value,
      aluInB: this._aluInB.value,
      regAOut: this._regAOut.value,
      regBOut: this._regBOut.value,
      aluOut: this._aluOut.value,
      ramOut: this._ramOut.value,

      decoderState: this.saveDecoder(),
    };
  }

  public saveDecoder(): IDecoderJson {
    return {
      timingMasks: {
        fetch: Array.from(this.decoderState.timingMasks[CpuStage.Fetch]),
        decode: Array.from(this.decoderState.timingMasks[CpuStage.Decode]),
        read: Array.from(this.decoderState.timingMasks[CpuStage.Read]),
        exec: Array.from(this.decoderState.timingMasks[CpuStage.Execute]),
        write: Array.from(this.decoderState.timingMasks[CpuStage.Write]),
      },
      instructions: this.decoderState.instructions.map((x) => ({
        name: x.name,
        gates: Array.from(x.gates),
      })),
    };
  }

  public static loadState(state: ICpuState): Cpu {
    const cpu = new Cpu(readDecoder(state.decoderState));
    cpu.regA.value = state.regA;
    cpu.regB.value = state.regB;
    cpu.pc.value = state.pc;
    for (let i = 0; i < 16; i++) {
      cpu.instructionsOp[i] = state.instructionsOp[i] ?? 0;
      cpu.instructionsAddr[i] = state.instructionsAddr[i] ?? 0;
      cpu.instructionsData[i] = state.instructionsData[i] ?? 0;
      cpu.ram[i] = state.ram[i] ?? 0;
    }
    cpu.decodedStages = cpu.decodeStages(cpu.pc.value);
    cpu.stage = state.stage;

    const newGates = cpu.decodedStages[state.stage];

    for (const key of Object.keys(cpu.gateMap) as Gates[]) {
      const gate = cpu.gateMap[key];
      gate.value = newGates.has(key);
    }

    cpu.flagZ.value = state.flagZ;
    cpu.flagO.value = state.flagO;

    cpu._aluInA.value = state.aluInA;
    cpu._aluInB.value = state.aluInB;
    cpu._regAOut.value = state.regAOut;
    cpu._regBOut.value = state.regBOut;
    cpu._aluOut.value = state.aluOut;
    cpu._ramOut.value = state.ramOut;

    return cpu;
  }

  public withNewDecoder(decoderState: IDecoderState) {
    const cpu = new Cpu(decoderState);
    cpu.regA.value = this.regA.value;
    cpu.regB.value = this.regB.value;
    cpu.pc.value = this.pc.value;
    for (let i = 0; i < 16; i++) {
      cpu.instructionsOp[i] = this.instructionsOp[i] ?? 0;
      cpu.instructionsAddr[i] = this.instructionsAddr[i] ?? 0;
      cpu.instructionsData[i] = this.instructionsData[i] ?? 0;
      cpu.ram[i] = this.ram[i] ?? 0;
    }
    cpu.decodedStages = cpu.decodeStages(cpu.pc.value);
    cpu.stage = this.stage;

    const newGates = cpu.decodedStages[this.stage];

    for (const key of Object.keys(cpu.gateMap) as Gates[]) {
      const gate = cpu.gateMap[key];
      gate.value = newGates.has(key);
    }

    cpu.flagZ.value = this.flagZ.value;
    cpu.flagO.value = this.flagO.value;

    cpu._aluInA.value = this._aluInA.value;
    cpu._aluInB.value = this._aluInB.value;
    cpu._regAOut.value = this._regAOut.value;
    cpu._regBOut.value = this._regBOut.value;
    cpu._aluOut.value = this._aluOut.value;
    cpu._ramOut.value = this._ramOut.value;

    return cpu;
  }

  private decodeStages(pc: number): Record<CpuStage, Set<Gates>> {
    const gates =
      this.decoderState.instructions[this.instructionsOp[pc]!]!.gates;
    const masks = this.decoderState.timingMasks;
    return {
      [CpuStage.Fetch]: gates.intersection(masks[CpuStage.Fetch]),
      [CpuStage.Decode]: gates.intersection(masks[CpuStage.Decode]),
      [CpuStage.Read]: gates.intersection(masks[CpuStage.Read]),
      [CpuStage.Execute]: gates.intersection(masks[CpuStage.Execute]),
      [CpuStage.Write]: gates.intersection(masks[CpuStage.Write]),
    };
  }

  private gateMap = {
    JN: this._jmpNot,
    JZ: this._jmpZero,
    JO: this._jmpOverflow,
    RR: this._ramRead,
    RW: this._ramWrite,
    AR: this._regARead,
    AW: this._regAWrite,
    BR: this._regBRead,
    BW: this._regBWrite,
    ALU1: this._aluOp1,
    ALU2: this._aluOp2,
  } as Record<Gates, Ref<boolean>>;
}

export interface ICpuState {
  regA: number;
  regB: number;
  pc: number;
  instructionsOp: number[];
  instructionsAddr: number[];
  instructionsData: number[];
  ram: number[];
  stage: CpuStage;

  flagZ: boolean;
  flagO: boolean;

  aluInA: number;
  aluInB: number;
  regAOut: number;
  regBOut: number;
  aluOut: number;
  ramOut: number;

  decoderState: IDecoderJson;
}

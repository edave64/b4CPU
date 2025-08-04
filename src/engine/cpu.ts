import type { Gates, IDecoderState } from '../interfaces/decoder';
import type { Ref } from 'vue';
import { computed, reactive, ref, watch } from 'vue';

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
    () => this.instructionsAddr[this.pc.value],
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
  private readonly _aluOp = ref(0);

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
      (this._aluOp ? this._aluOut.value : 0) |
      (this._ramRead.value ? this._ramOut.value : 0) |
      this.instructionsData[this.pc.value]
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
    if (newStage === CpuStage.Fetch) {
      // process jumps
      const targetAddr = this.pcJump
        ? this.address.value
        : (this.pc.value + 1) & 0b1111;
      this._stage.value = CpuStage.Fetch;
      this.pc.value = targetAddr;
    } else {
      this._stage.value = newStage;
    }
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

  public readonly ram = reactive(Array(16).fill(0));
  public readonly instructionsOp = reactive(Array(16).fill(0));
  public readonly instructionsAddr = reactive(Array(16).fill(0));
  public readonly instructionsData = reactive(Array(16).fill(0));

  public readonly aluOut = computed(() => {
    const aluOp = this.aluOp;
    const stage = this.stage;
    const regA = this.regA.value;
    const regB = this.regB.value;
    if (stage !== CpuStage.Execute) return 0;
    switch (aluOp) {
      case 1:
        return regA & regB;
      case 2:
        return regA + regB;
      case 3:
        return regA - regB;
    }
    return 0;
  });

  public constructor(public readonly decoderState: IDecoderState) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).cpu = this;

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
    // Setting stage to fetch handles pc update
    this.stage = nextStage;
    const oldGates = this.decodedStages[stage];
    const newGates = this.decodedStages[nextStage];

    for (const key of Object.keys(this.gateMap) as Gates[]) {
      const gate = this.gateMap[key];
      gate.value = newGates.has(key);
    }

    const gatesActivated = newGates.difference(oldGates);
    this.processGateActivations(gatesActivated);

    if (this.stage === CpuStage.Decode) {
      this.decodedStages = this.decodeStages(this.pc.value);
      console.log('decoded stages', this.decodedStages);
    }
  }

  processGateActivations(gatesActivated: Set<Gates>) {
    console.log('gates activated', gatesActivated);
    if (gatesActivated.has('AR')) {
      this._regAOut.value = this.regA.value;
    }
    if (gatesActivated.has('BR')) {
      this._regBOut.value = this.regB.value;
    }

    if (gatesActivated.has('AW')) {
      this.regA.value = this.data.value;
    }
    if (gatesActivated.has('BW')) {
      this.regB.value = this.data.value;
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

  private decodeStages(pc: number): Record<CpuStage, Set<Gates>> {
    const gates =
      this.decoderState.instructions[this.instructionsOp[pc]]!.gates;
    const masks = this.decoderState.timingMasks;
    console.log('gates', gates);
    console.log('masks', masks);
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

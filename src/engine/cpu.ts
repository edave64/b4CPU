import type { Gates, IDecoderState } from '../interfaces/decoder';
import { computed, reactive, ref, watch } from 'vue';
import { UnreachableCaseError } from 'ts-essentials';

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

  private readonly _stage = ref(CpuStage.Decode);
  public readonly pc = ref(0);
  public readonly address = computed(
    () => this.instructionsAddr[this.pc.value],
  );
  public readonly data = computed(
    () =>
      this.instructionsData[this.pc.value] |
      (this.regARead ? this.regA.value : 0) |
      (this.regBRead ? this.regB.value : 0) |
      (this.regCRead ? this.regC.value : 0) |
      (this.ramRead &&
      (this.stage === CpuStage.Read || this.stage === CpuStage.Execute)
        ? this.ram[this.address.value]
        : 0),
  );
  public readonly regA = ref(0);
  public readonly regB = ref(0);
  public readonly regC = ref(0);
  public readonly flagZ = ref(false);
  public readonly flagO = ref(false);

  private readonly _pcAdvance = ref(false);
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
  private readonly _regCWrite = ref(false);
  private readonly _regCRead = ref(false);
  private readonly _ramWrite = ref(false);
  private readonly _ramRead = ref(false);
  private readonly _aluOp = ref(0);

  public get pcAdvance() {
    return this._pcAdvance.value;
  }
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
      const targetAddr =
        (this.pcAdvance ? (this.pc.value + 1) & 0b1111 : 0) |
        (this.pcJump ? this.address.value : 0);
      this._stage.value = CpuStage.Fetch;
      this.pc.value = targetAddr;
    } else {
      this._stage.value = newStage;
    }
    this.processStage();
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
  public get regCWrite() {
    return this._regCWrite.value;
  }
  public get regCRead() {
    return this._regCRead.value;
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

  public constructor(private readonly decoderState: IDecoderState) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).cpu = this;

    watch(
      () => this.instructionsOp[this.pc.value],
      () => this.decodeStage(),
    );
    this.decodeStage();
  }

  public nextStage() {
    const stage = this.stage;
    const nextStage = Cpu.NextStage[stage]!;
    // Setting stage to fetch handles pc update
    this.stage = nextStage;
  }

  public step() {
    do {
      this.nextStage();
    } while (this.stage !== CpuStage.Fetch);
  }

  private processStage() {
    const stage = this.stage;
    switch (stage) {
      case CpuStage.Fetch:
        break;
      case CpuStage.Decode:
        this.decodeStage();
        break;
      case CpuStage.Read:
        this.readStage();
        break;
      case CpuStage.Execute:
        this.executeStage();
        break;
      case CpuStage.Write:
        this.writeStage();
        break;
      default:
        throw new UnreachableCaseError(stage);
    }
  }

  private decodeStage() {
    const pc = this.pc.value;
    const op = this.instructionsOp[pc];

    if (!this.decoderState.instructions[op]) {
      console.error(`Unregistered op ${op}`);
      return;
    }
    this.writeState(this.decoderState.instructions[op].gates);
  }

  private readStage() {
    if (this.regAWrite) {
      this.regA.value = this.data.value;
    }
    if (this.regBWrite) {
      this.regB.value = this.data.value;
    }
  }

  private executeStage() {
    if (this._regCWrite) {
      this.regC.value = this.aluOut.value;
    }
  }

  private writeStage() {
    if (this.ramWrite) {
      this.ram[this.address.value] = this.data.value;
    }
  }

  private writeState(gates: Set<Gates>) {
    this._pcAdvance.value = gates.has('PA');
    this._jmpNot.value = gates.has('JN');
    this._jmpOverflow.value = gates.has('JO');
    this._jmpZero.value = gates.has('JZ');
    this._ramRead.value = gates.has('RR');
    this._ramWrite.value = gates.has('RW');
    this._regARead.value = gates.has('AR');
    this._regAWrite.value = gates.has('AW');
    this._regBRead.value = gates.has('BR');
    this._regBWrite.value = gates.has('BW');
    this._regCRead.value = gates.has('CR');
    this._regCWrite.value = gates.has('CW');
    this._aluOp.value = +gates.has('ALU1') | (+gates.has('ALU2') << 1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gates = gates;
  }
}

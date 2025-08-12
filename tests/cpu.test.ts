import { expect, test } from 'vitest';
import type { CpuState } from '../src/engine/cpu';
import {
  Gate,
  runInstruction,
  makeCpuState,
  CpuStage,
  CpuAccessor,
} from '../src/engine/cpu';
import type { IDecoderState } from '../src/interfaces/decoder';

const sharedConfig: IDecoderState = {
  instructions: [
    {
      name: 'NOP',
      gates: 0,
    },
    {
      name: 'LDA',
      gates: Gate.AW,
    },
    {
      name: 'LRA',
      gates: Gate.AW | Gate.RR,
    },
    {
      name: 'LDB',
      gates: Gate.BW,
    },
    {
      name: 'LRB',
      gates: Gate.BW | Gate.RR,
    },
    {
      name: 'LDB,A',
      gates: Gate.AR | Gate.BW,
    },
    {
      name: 'LDA,B',
      gates: Gate.AW | Gate.BR,
    },
    {
      name: 'STA',
      gates: Gate.AR | Gate.RW,
    },
    {
      name: 'STB',
      gates: Gate.BR | Gate.RW,
    },
    {
      name: 'AND',
      gates: Gate.AW | Gate.ALU1,
    },
    {
      name: 'ADD',
      gates: Gate.AW | Gate.ALU2,
    },
    {
      name: 'SUB',
      gates: Gate.AW | Gate.ALU1 | Gate.ALU2,
    },
    {
      name: 'JMP',
      gates: Gate.JN,
    },
    {
      name: 'JMZ',
      gates: Gate.JZ,
    },
    {
      name: 'JMO',
      gates: Gate.JO,
    },
    {
      name: 'JNZ',
      gates: Gate.JN | Gate.JZ,
    },
  ],
  timingMasks: {
    [CpuStage.Fetch]: Gate.JN | Gate.JZ | Gate.JO,
    [CpuStage.Decode]: 0,
    [CpuStage.Read]: Gate.AR | Gate.BR | Gate.RR,
    [CpuStage.Execute]: Gate.AR | Gate.BR | Gate.RR | Gate.ALU1 | Gate.ALU2,
    [CpuStage.Write]:
      Gate.AR |
      Gate.BR |
      Gate.RR |
      Gate.ALU1 |
      Gate.ALU2 |
      Gate.AW |
      Gate.BW |
      Gate.RW,
  },
};

test('LDA', () => {
  let cpu = makeCpuState();
  // LDA 12
  CpuAccessor.setInstructionsOp(cpu, 0, 1);
  CpuAccessor.setInstructionsData(cpu, 0, 12);
  cpu = runInstruction(sharedConfig, cpu);

  expect(CpuAccessor.getRegA(cpu)).toBe(12);
});

test('LRA', () => {
  let cpu = makeCpuState();

  for (let i = 0; i < 16; i++) {
    CpuAccessor.setRam(cpu, i, 16 - i);
  }

  // LRA
  for (let i = 0; i < 16; i++) {
    CpuAccessor.setPc(cpu, 0);
    CpuAccessor.setInstructionsOp(cpu, 0, 2);
    CpuAccessor.setInstructionsAddr(cpu, 0, i);
    cpu = runInstruction(sharedConfig, cpu);
    expect(CpuAccessor.getRegA(cpu)).toBe(16 - i);
  }
});

test('LDB', () => {
  let cpu = makeCpuState();
  // LDB 12
  CpuAccessor.setInstructionsOp(cpu, 0, 3);
  CpuAccessor.setInstructionsData(cpu, 0, 12);
  cpu = runInstruction(sharedConfig, cpu);

  expect(CpuAccessor.getRegB(cpu)).toBe(12);
});

test('LRB', () => {
  let cpu = makeCpuState();

  for (let i = 0; i < 16; i++) {
    CpuAccessor.setRam(cpu, i, 16 - i);
  }

  // LRB
  for (let i = 0; i < 16; i++) {
    CpuAccessor.setPc(cpu, 0);
    CpuAccessor.setInstructionsOp(cpu, 0, 2);
    CpuAccessor.setInstructionsAddr(cpu, 0, i);
    cpu = runInstruction(sharedConfig, cpu);
    expect(CpuAccessor.getRegA(cpu)).toBe(16 - i);
  }
});

test('LDB A', () => {
  let cpu = makeCpuState();
  // LDB A
  CpuAccessor.setRegA(cpu, 12);
  CpuAccessor.setInstructionsOp(cpu, 0, 5);
  cpu = runInstruction(sharedConfig, cpu);

  expect(CpuAccessor.getRegA(cpu)).toBe(12);
  expect(CpuAccessor.getRegB(cpu)).toBe(12);
});

test('LDA B', () => {
  let cpu = makeCpuState();
  // LDA B
  CpuAccessor.setRegB(cpu, 12);
  CpuAccessor.setInstructionsOp(cpu, 0, 6);
  cpu = runInstruction(sharedConfig, cpu);

  expect(CpuAccessor.getRegA(cpu)).toBe(12);
  expect(CpuAccessor.getRegB(cpu)).toBe(12);
});

test('STA', () => {
  let cpu = makeCpuState();

  // STA
  CpuAccessor.setRegA(cpu, 12);
  CpuAccessor.setInstructionsOp(cpu, 0, 7);
  CpuAccessor.setInstructionsAddr(cpu, 0, 0);

  expect(CpuAccessor.getRam(cpu, 0)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRam(cpu, 0)).toBe(12);
});

test('STB', () => {
  let cpu = makeCpuState();

  // STB
  CpuAccessor.setRegB(cpu, 12);
  CpuAccessor.setInstructionsOp(cpu, 0, 8);
  CpuAccessor.setInstructionsAddr(cpu, 0, 0);

  expect(CpuAccessor.getRam(cpu, 0)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRam(cpu, 0)).toBe(12);
});

test('AND', () => {
  let cpu = makeCpuState();

  // AND
  CpuAccessor.setInstructionsOp(cpu, 0, 9);
  CpuAccessor.setRegA(cpu, 0b1110);
  CpuAccessor.setRegB(cpu, 0b0111);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b1110);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0111);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b0110);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0111);
});

test('AND Z', () => {
  let cpu = makeCpuState();

  // AND
  CpuAccessor.setInstructionsOp(cpu, 0, 9);
  CpuAccessor.setRegA(cpu, 0b1100);
  CpuAccessor.setRegB(cpu, 0b0011);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b1100);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0011);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b0000);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0011);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(true);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
});

test('ADD', () => {
  let cpu = makeCpuState();

  // ADD
  CpuAccessor.setInstructionsOp(cpu, 0, 10);
  CpuAccessor.setRegA(cpu, 0b0111);
  CpuAccessor.setRegB(cpu, 0b0111);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b0111);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0111);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b1110);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0111);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
});

test('ADD O', () => {
  let cpu = makeCpuState();

  // ADD
  CpuAccessor.setInstructionsOp(cpu, 0, 10);
  CpuAccessor.setRegA(cpu, 0b1111);
  CpuAccessor.setRegB(cpu, 0b0010);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b1111);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0010);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b0001);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0010);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(true);
});

test('ADD OZ', () => {
  let cpu = makeCpuState();

  // ADD
  CpuAccessor.setInstructionsOp(cpu, 0, 10);
  CpuAccessor.setRegA(cpu, 0b1111);
  CpuAccessor.setRegB(cpu, 0b0001);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b1111);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0001);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b0000);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0001);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(true);
  expect(CpuAccessor.getFlagO(cpu)).toBe(true);
});

test('SUB', () => {
  let cpu = makeCpuState();

  // SUB
  CpuAccessor.setInstructionsOp(cpu, 0, 11);
  CpuAccessor.setRegA(cpu, 0b0111);
  CpuAccessor.setRegB(cpu, 0b0011);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b0111);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0011);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b0100);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0011);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
});

test('SUB Z', () => {
  let cpu = makeCpuState();

  // SUB
  CpuAccessor.setInstructionsOp(cpu, 0, 11);
  CpuAccessor.setRegA(cpu, 0b0111);
  CpuAccessor.setRegB(cpu, 0b0111);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b0111);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0111);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b0000);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0111);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(true);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
});

test('SUB O', () => {
  let cpu = makeCpuState();

  // SUB
  CpuAccessor.setInstructionsOp(cpu, 0, 11);
  CpuAccessor.setRegA(cpu, 0b0001);
  CpuAccessor.setRegB(cpu, 0b0011);

  expect(CpuAccessor.getRegA(cpu)).toBe(0b0001);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0011);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(false);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getRegA(cpu)).toBe(0b1110);
  expect(CpuAccessor.getRegB(cpu)).toBe(0b0011);
  expect(CpuAccessor.getFlagZ(cpu)).toBe(false);
  expect(CpuAccessor.getFlagO(cpu)).toBe(true);
});

test('JMP', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 12);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(10);
});

test('JMZ No Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 13);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(1);
});

test('JMZ Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 13);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  CpuAccessor.setFlagZ(cpu, true);
  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(10);
});

test('JMO No Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 14);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(1);
});

test('JMO Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 14);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  CpuAccessor.setFlagO(cpu, true);
  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(10);
});

test('JNZ No Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 15);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  CpuAccessor.setFlagZ(cpu, true);
  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(1);
});

test('JNZ Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 15);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(10);
});

test('JNZ Jump', () => {
  let cpu = makeCpuState();

  CpuAccessor.setInstructionsOp(cpu, 0, 15);
  CpuAccessor.setInstructionsAddr(cpu, 0, 10);

  expect(CpuAccessor.getPc(cpu)).toBe(0);
  cpu = runInstruction(sharedConfig, cpu);
  expect(CpuAccessor.getPc(cpu)).toBe(10);
});

test('Sorter', () => {
  let cpu = makeCpuState();
  parseInstructions(
    cpu,
    `
00 LRA 0
01 LRB 1
02 SUB
03 JMO 07
04 LRA 0
05 STB 0
06 STA 1
07 LRA 1
08 LRB 2
09 SUB
10 JMO 00
11 LRA 1
12 STB 1
13 STA 2
    `,
  );

  CpuAccessor.setRam(cpu, 0, 10);
  CpuAccessor.setRam(cpu, 1, 5);
  CpuAccessor.setRam(cpu, 2, 3);

  for (let i = 0; i < 23; i++) {
    cpu = runInstruction(sharedConfig, cpu);
  }

  expect(CpuAccessor.getRam(cpu, 0)).toBe(3);
  expect(CpuAccessor.getRam(cpu, 1)).toBe(5);
  expect(CpuAccessor.getRam(cpu, 2)).toBe(10);
});

function parseInstructions(cpu: CpuState, instructions: string): void {
  const lines = instructions.split('\n');
  for (const line of lines) {
    const parts = line.split(' ');

    if (parts.length === 0) continue;
    const i = parseInt(parts[0] ?? '0', 10);
    const op = sharedConfig.instructions.findIndex((x) => x.name === parts[1]);
    const addr = parseInt(parts[2] ?? '0', 10);
    const data = parseInt(parts[3] ?? '0', 2);
    CpuAccessor.setInstructionsOp(cpu, i, op);
    CpuAccessor.setInstructionsAddr(cpu, i, addr);
    CpuAccessor.setInstructionsData(cpu, i, data);
  }
}

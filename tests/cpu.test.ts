import { expect, test } from 'vitest';
import { Cpu, CpuStage } from '../src/engine/cpu';
import type { IDecoderState } from '../src/interfaces/decoder';

const sharedConfig: IDecoderState = {
  instructions: [
    {
      name: 'NOP',
      gates: new Set([]),
    },
    {
      name: 'LD A',
      gates: new Set(['AW']),
    },
    {
      name: 'LR A',
      gates: new Set(['AW', 'RR']),
    },
    {
      name: 'LD B',
      gates: new Set(['BW']),
    },
    {
      name: 'LR B',
      gates: new Set(['BW', 'RR']),
    },
    {
      name: 'LD B, A',
      gates: new Set(['AR', 'BW']),
    },
    {
      name: 'LD A, B',
      gates: new Set(['AW', 'BR']),
    },
    {
      name: 'ST A',
      gates: new Set(['AR', 'RW']),
    },
    {
      name: 'ST B',
      gates: new Set(['BR', 'RW']),
    },
    {
      name: 'AND',
      gates: new Set(['AW', 'ALU1']),
    },
    {
      name: 'ADD',
      gates: new Set(['AW', 'ALU2']),
    },
    {
      name: 'SUB',
      gates: new Set(['AW', 'ALU1', 'ALU2']),
    },
    {
      name: 'JMP',
      gates: new Set(['JN']),
    },
    {
      name: 'JMZ',
      gates: new Set(['JZ']),
    },
    {
      name: 'JMO',
      gates: new Set(['JO']),
    },
    {
      name: 'JNZ',
      gates: new Set(['JN', 'JZ']),
    },
  ],
  timingMasks: {
    [CpuStage.Fetch]: new Set(['JN', 'JZ', 'JO']),
    [CpuStage.Decode]: new Set([]),
    [CpuStage.Read]: new Set(['AR', 'BR', 'RR']),
    [CpuStage.Execute]: new Set(['AR', 'BR', 'RR', 'ALU1', 'ALU2']),
    [CpuStage.Write]: new Set([
      'AR',
      'BR',
      'RR',
      'ALU1',
      'ALU2',
      'AW',
      'BW',
      'RW',
    ]),
  },
};

test('LDA', () => {
  const cpu = new Cpu(sharedConfig);
  // LDA 12
  cpu.instructionsOp[0] = 1;
  cpu.instructionsData[0] = 12;
  cpu.step();

  expect(cpu.regA.value).toBe(12);
});

test('LRA', () => {
  const cpu = new Cpu(sharedConfig);

  for (let i = 0; i < 16; i++) {
    cpu.ram[i] = 16 - i;
  }

  // LRA
  for (let i = 0; i < 16; i++) {
    cpu.pc.value = 0;
    cpu.instructionsOp[0] = 2;
    cpu.instructionsAddr[0] = i;
    cpu.step();
    expect(cpu.regA.value).toBe(16 - i);
  }
});

test('LDB', () => {
  const cpu = new Cpu(sharedConfig);
  // LDB 12
  cpu.instructionsOp[0] = 3;
  cpu.instructionsData[0] = 12;
  cpu.step();

  expect(cpu.regB.value).toBe(12);
});

test('LRB', () => {
  const cpu = new Cpu(sharedConfig);

  for (let i = 0; i < 16; i++) {
    cpu.ram[i] = 16 - i;
  }

  // LRB
  for (let i = 0; i < 16; i++) {
    cpu.pc.value = 0;
    cpu.instructionsOp[0] = 2;
    cpu.instructionsAddr[0] = i;
    cpu.step();
    expect(cpu.regA.value).toBe(16 - i);
  }
});

test('LDB A', () => {
  const cpu = new Cpu(sharedConfig);
  // LDB A
  cpu.regA.value = 12;
  cpu.instructionsOp[0] = 5;
  cpu.step();

  expect(cpu.regA.value).toBe(12);
  expect(cpu.regB.value).toBe(12);
});

test('LDA B', () => {
  const cpu = new Cpu(sharedConfig);
  // LDA B
  cpu.regB.value = 12;
  cpu.instructionsOp[0] = 6;
  cpu.step();

  expect(cpu.regA.value).toBe(12);
  expect(cpu.regB.value).toBe(12);
});

test('STA', () => {
  const cpu = new Cpu(sharedConfig);

  // STA
  cpu.regA.value = 12;
  cpu.instructionsOp[0] = 7;
  cpu.instructionsAddr[0] = 0;

  expect(cpu.ram[0]).toBe(0);
  cpu.step();
  expect(cpu.ram[0]).toBe(12);
});

test('STB', () => {
  const cpu = new Cpu(sharedConfig);

  // STB
  cpu.regB.value = 12;
  cpu.instructionsOp[0] = 8;
  cpu.instructionsAddr[0] = 0;

  expect(cpu.ram[0]).toBe(0);
  cpu.step();
  expect(cpu.ram[0]).toBe(12);
});

test('AND', () => {
  const cpu = new Cpu(sharedConfig);

  // AND
  cpu.instructionsOp[0] = 9;
  cpu.regA.value = 0b1110;
  cpu.regB.value = 0b0111;

  expect(cpu.regA.value).toBe(0b1110);
  expect(cpu.regB.value).toBe(0b0111);
  cpu.step();
  expect(cpu.regA.value).toBe(0b0110);
  expect(cpu.regB.value).toBe(0b0111);
});

test('AND Z', () => {
  const cpu = new Cpu(sharedConfig);

  // AND
  cpu.instructionsOp[0] = 9;
  cpu.regA.value = 0b1100;
  cpu.regB.value = 0b0011;

  expect(cpu.regA.value).toBe(0b1100);
  expect(cpu.regB.value).toBe(0b0011);
  cpu.step();
  expect(cpu.regA.value).toBe(0b0000);
  expect(cpu.regB.value).toBe(0b0011);
  expect(cpu.flagZ.value).toBe(true);
  expect(cpu.flagO.value).toBe(false);
});

test('ADD', () => {
  const cpu = new Cpu(sharedConfig);

  // ADD
  cpu.instructionsOp[0] = 10;
  cpu.regA.value = 0b0111;
  cpu.regB.value = 0b0111;

  expect(cpu.regA.value).toBe(0b0111);
  expect(cpu.regB.value).toBe(0b0111);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
  cpu.step();
  expect(cpu.regA.value).toBe(0b1110);
  expect(cpu.regB.value).toBe(0b0111);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
});

test('ADD O', () => {
  const cpu = new Cpu(sharedConfig);

  // ADD
  cpu.instructionsOp[0] = 10;
  cpu.regA.value = 0b1111;
  cpu.regB.value = 0b0010;

  expect(cpu.regA.value).toBe(0b1111);
  expect(cpu.regB.value).toBe(0b0010);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
  cpu.step();
  expect(cpu.regA.value).toBe(0b0001);
  expect(cpu.regB.value).toBe(0b0010);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(true);
});

test('ADD OZ', () => {
  const cpu = new Cpu(sharedConfig);

  // ADD
  cpu.instructionsOp[0] = 10;
  cpu.regA.value = 0b1111;
  cpu.regB.value = 0b0001;

  expect(cpu.regA.value).toBe(0b1111);
  expect(cpu.regB.value).toBe(0b0001);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
  cpu.step();
  expect(cpu.regA.value).toBe(0b0000);
  expect(cpu.regB.value).toBe(0b0001);
  expect(cpu.flagZ.value).toBe(true);
  expect(cpu.flagO.value).toBe(true);
});

test('SUB', () => {
  const cpu = new Cpu(sharedConfig);

  // SUB
  cpu.instructionsOp[0] = 11;
  cpu.regA.value = 0b0111;
  cpu.regB.value = 0b0011;

  expect(cpu.regA.value).toBe(0b0111);
  expect(cpu.regB.value).toBe(0b0011);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
  cpu.step();
  expect(cpu.regA.value).toBe(0b0100);
  expect(cpu.regB.value).toBe(0b0011);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
});

test('SUB Z', () => {
  const cpu = new Cpu(sharedConfig);

  // SUB
  cpu.instructionsOp[0] = 11;
  cpu.regA.value = 0b0111;
  cpu.regB.value = 0b0111;

  expect(cpu.regA.value).toBe(0b0111);
  expect(cpu.regB.value).toBe(0b0111);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
  cpu.step();
  expect(cpu.regA.value).toBe(0b0000);
  expect(cpu.regB.value).toBe(0b0111);
  expect(cpu.flagZ.value).toBe(true);
  expect(cpu.flagO.value).toBe(false);
});

test('SUB O', () => {
  const cpu = new Cpu(sharedConfig);

  // SUB
  cpu.instructionsOp[0] = 11;
  cpu.regA.value = 0b0001;
  cpu.regB.value = 0b0011;

  expect(cpu.regA.value).toBe(0b0001);
  expect(cpu.regB.value).toBe(0b0011);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(false);
  cpu.step();
  expect(cpu.regA.value).toBe(0b1110);
  expect(cpu.regB.value).toBe(0b0011);
  expect(cpu.flagZ.value).toBe(false);
  expect(cpu.flagO.value).toBe(true);
});

test('JMP', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 12;
  cpu.instructionsAddr[0] = 10;

  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(10);
});

test('JMZ No Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 13;
  cpu.instructionsAddr[0] = 10;

  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(1);
});

test('JMZ Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 13;
  cpu.instructionsAddr[0] = 10;

  cpu.flagZ.value = true;
  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(10);
});

test('JMO No Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 14;
  cpu.instructionsAddr[0] = 10;

  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(1);
});

test('JMO Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 14;
  cpu.instructionsAddr[0] = 10;

  cpu.flagO.value = true;
  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(10);
});

test('JNZ No Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 15;
  cpu.instructionsAddr[0] = 10;

  cpu.flagZ.value = true;
  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(1);
});

test('JNZ Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 15;
  cpu.instructionsAddr[0] = 10;

  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(10);
});

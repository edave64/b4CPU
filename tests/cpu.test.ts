import { expect, test } from 'vitest';
import { Cpu, CpuStage, Gate } from '../src/engine/cpu';
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

test('JNZ Jump', () => {
  const cpu = new Cpu(sharedConfig);

  cpu.instructionsOp[0] = 15;
  cpu.instructionsAddr[0] = 10;

  expect(cpu.pc.value).toBe(0);
  cpu.step();
  expect(cpu.pc.value).toBe(10);
});

test('Sorter', () => {
  const cpu = new Cpu(sharedConfig);
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

  cpu.ram[0] = 10;
  cpu.ram[1] = 5;
  cpu.ram[2] = 3;

  for (let i = 0; i < 23; i++) {
    cpu.step();
  }

  expect(cpu.ram[0]).toBe(3);
  expect(cpu.ram[1]).toBe(5);
  expect(cpu.ram[2]).toBe(10);
});

function parseInstructions(cpu: Cpu, instructions: string): void {
  const lines = instructions.split('\n');
  for (const line of lines) {
    const parts = line.split(' ');

    if (parts.length === 0) continue;
    const i = parseInt(parts[0] ?? '0', 10);
    const op = sharedConfig.instructions.findIndex((x) => x.name === parts[1]);
    const addr = parseInt(parts[2] ?? '0', 10);
    const data = parseInt(parts[3] ?? '0', 2);
    cpu.instructionsOp[i] = op;
    cpu.instructionsAddr[i] = addr;
    cpu.instructionsData[i] = data;
  }
}

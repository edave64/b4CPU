export type Gates =
  | 'N'
  | 'JN'
  | 'JZ'
  | 'JO'
  | 'AR'
  | 'AW'
  | 'BR'
  | 'BW'
  | 'CR'
  | 'CW'
  | 'ALU1'
  | 'ALU2'
  | 'RR'
  | 'RW'
  | 'PA';

export interface IInstruction {
  name: string;
  gates: Set<Gates>;
}

export interface IDecoderState {
  instructions: IInstruction[];
  timingMasks: {
    fetch: Set<Gates>;
    read: Set<Gates>;
    exec: Set<Gates>;
    write: Set<Gates>;
  };
}

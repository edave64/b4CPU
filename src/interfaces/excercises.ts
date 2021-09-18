export interface IWord {
  value: number;
  blocked: boolean;
}

export interface IMemoryState {
  0: IWord;
  1: IWord;
  2: IWord;
  3: IWord;
  4: IWord;
  5: IWord;
  6: IWord;
  7: IWord;
  8: IWord;
  9: IWord;
  10: IWord;
  11: IWord;
  12: IWord;
  13: IWord;
  14: IWord;
  15: IWord;
}

export interface IExcerciseState {
  dataMemoryState: IMemoryState;
  instructionMemoryState: {
    instructions: IMemoryState;
    addresses: IMemoryState;
    data: IMemoryState;
  };
}

declare module '@/scripts/wortle-game' {
  export class WortleGame {
    constructor();
    initializeGame(): Promise<void>;
    setupEventListeners(): void;
    handleInput(value: string): void;
    addLetter(letter: string): void;
    deleteLetter(): void;
    submitGuess(): Promise<void>;
    validateWord(word: string): Promise<boolean>;
    resetGame(): Promise<void>;
  }
  
  export function initUIHandlers(): void;
}

declare module '@/scripts/login' {
  export function initLogin(): Promise<void>;
}

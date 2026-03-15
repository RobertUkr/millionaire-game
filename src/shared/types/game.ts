export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  prize: string;
  answers: Answer[];
}

export interface GameConfig {
  questions: Question[];
}

export type AnswerState = "idle" | "selected" | "correct" | "wrong";

export type GameStatus = "idle" | "playing" | "won" | "lost";

export interface GameState {
  status: GameStatus;
  questions: Question[];
  currentIndex: number;
  totalPrize: number;
}

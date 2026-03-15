export const STORAGE_KEY = "millionaire-game-state";

export const ANSWER_RESULT = {
  CORRECT: "correct",
  WRONG: "wrong",
} as const;

export const GAME_STATUS = {
  IDLE: "idle",
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
} as const;

export const LETTERS = ["A", "B", "C", "D"] as const;

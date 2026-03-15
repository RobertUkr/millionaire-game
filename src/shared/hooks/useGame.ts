import { useEffect, useState } from "react";

import { ANSWER_RESULT, GAME_STATUS, STORAGE_KEY } from "@/constants";
import gameConfig from "@/shared/content/game.json";
import type { GameConfig, GameStatus, Question } from "@/shared/types/game";

const { questions } = gameConfig as GameConfig;

interface GameState {
  status: GameStatus;
  currentIndex: number;
  selectedAnswerId: string | null;
  answerResult: "correct" | "wrong" | null;
  earnedPrize: string;
}

const initialState: GameState = {
  status: "idle",
  currentIndex: 0,
  selectedAnswerId: null,
  answerResult: null,
  earnedPrize: "0",
};

const loadState = (): GameState | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GameState) : null;
  } catch {
    return null;
  }
};

const saveState = (state: GameState) => {
  try {
    if (state.status === GAME_STATUS.IDLE) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // ignore storage errors
  }
};

const useGame = () => {
  const [state, setState] = useState<GameState>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore state from sessionStorage after mount
  useEffect(() => {
    const saved = loadState();

    if (saved) {
      setState(saved);
    }

    setIsHydrated(true);
  }, []);

  // Persist state to sessionStorage on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const currentQuestion: Question | null =
    state.status === GAME_STATUS.PLAYING ? questions[state.currentIndex] : null;

  const startGame = () => {
    setIsLoading(true);
    setTimeout(() => {
      setState({ ...initialState, status: GAME_STATUS.PLAYING });
      setIsLoading(false);
    }, 2000);
  };

  const resetGame = () => setState(initialState);

  const nextQuestion = () => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= questions.length) {
        return { ...prev, status: GAME_STATUS.WON };
      }

      return {
        ...prev,
        currentIndex: nextIndex,
        selectedAnswerId: null,
        answerResult: null,
      };
    });
  };

  const selectAnswer = (answerId: string) => {
    if (
      !currentQuestion ||
      state.selectedAnswerId !== null ||
      state.answerResult !== null
    ) {
      return;
    }

    const isCorrect =
      currentQuestion.answers.find((a) => a.id === answerId)?.isCorrect ??
      false;

    // t=0ms: show "selected" state
    setState((prev) => ({ ...prev, selectedAnswerId: answerId }));

    // t=500ms: reveal result
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        answerResult: isCorrect ? ANSWER_RESULT.CORRECT : ANSWER_RESULT.WRONG,
        earnedPrize: isCorrect ? currentQuestion.prize : prev.earnedPrize,
      }));

      if (isCorrect) {
        // t=1500ms: advance to next question
        setTimeout(nextQuestion, 1000);
      } else {
        // t=2000ms: go to lost screen
        setTimeout(() => {
          setState((prev) => ({ ...prev, status: GAME_STATUS.LOST }));
        }, 1500);
      }
    }, 500);
  };

  return {
    isHydrated,
    isLoading,
    status: state.status,
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: questions.length,
    questions,
    selectedAnswerId: state.selectedAnswerId,
    answerResult: state.answerResult,
    earnedPrize: state.earnedPrize,
    startGame,
    resetGame,
    selectAnswer,
  };
};

export default useGame;

"use client";

import cn from "classnames";
import { notFound } from "next/navigation";
import { useState } from "react";

import AnswerList from "@/components/AnswerList";
import HeroScreen from "@/components/HeroScreen";
import PrizeLadder from "@/components/PrizeLadder";
import { GAME_STATUS } from "@/constants";
import useGame from "@/shared/hooks/useGame";
import CloseIcon from "../../assets/icons/close.svg";
import BurgerMenuIcon from "../../assets/icons/menu.svg";

import Loader from "../Loader";
import styles from "./Game.module.scss";

const Game = () => {
  const [isPrizeOpen, setIsPrizeOpen] = useState(false);

  const {
    isHydrated,
    isLoading,
    status,
    currentQuestion,
    currentIndex,
    totalQuestions,
    questions,
    selectedAnswerId,
    answerResult,
    earnedPrize,
    startGame,
    resetGame,
    selectAnswer,
  } = useGame();

  if (!isHydrated || isLoading) {
    return <Loader />;
  }

  if (status === GAME_STATUS.IDLE) {
    return (
      <HeroScreen
        title="Who wants to be a millionaire?"
        buttonLabel="Start"
        onAction={startGame}
      />
    );
  }

  if (status === GAME_STATUS.WON || status === GAME_STATUS.LOST) {
    return (
      <HeroScreen
        subtitle="Total score:"
        title={`$${earnedPrize.toLocaleString()} earned`}
        buttonLabel="Try again"
        onAction={resetGame}
        className={cn({
          [styles.finishScreen]: status === GAME_STATUS.LOST || GAME_STATUS.WON,
        })}
      />
    );
  }

  if (!currentQuestion) return notFound();

  return (
    <main className={styles.game}>
      <div
        className={cn(styles.prizeDrawer, { [styles.prizeOpen]: isPrizeOpen })}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setIsPrizeOpen(false)}
        >
          <CloseIcon />
        </button>
        <PrizeLadder questions={questions} currentIndex={currentIndex} />
      </div>

      <section className={styles.questionSection}>
        <button className={styles.burger} onClick={() => setIsPrizeOpen(true)}>
          <BurgerMenuIcon />
        </button>

        <h2 className={styles.question}>{currentQuestion.text}</h2>

        <div className={styles.answersWrap}>
          <AnswerList
            answers={currentQuestion.answers}
            selectedAnswerId={selectedAnswerId}
            answerResult={answerResult}
            onSelect={selectAnswer}
          />
        </div>
      </section>
    </main>
  );
};

export default Game;

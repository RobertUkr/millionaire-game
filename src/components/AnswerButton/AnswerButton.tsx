import cn from "classnames";
import styles from "./AnswerButton.module.scss";

interface AnswerButtonProps {
  text: string;
  letter?: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  isActive?: boolean;
  isEarned?: boolean;
  answerResult?: "correct" | "wrong" | null;
  selectedAnswerId?: string | number | null;
  onClick?: () => void;
}

const AnswerButton = ({
  letter,
  text,
  isCorrect,
  isSelected,
  isActive,
  isEarned,
  answerResult = null,
  selectedAnswerId = null,
  onClick,
}: AnswerButtonProps) => {
  const isDisabled = isEarned || selectedAnswerId !== null || !onClick;

  return (
    <div className={styles.wrapper}>
      <button
        disabled={isDisabled}
        onClick={onClick}
        className={cn(styles.answer, {
          [styles.correct]: !isEarned && answerResult !== null && isCorrect,
          [styles.wrong]: isSelected && answerResult === "wrong",
          [styles.selected]: isActive || (isSelected && answerResult === null),
          [styles.disabled]: isEarned,
        })}
      >
        {letter && <span className={styles.letter}>{letter}</span>}
        <span className={styles.text}>{text}</span>
      </button>
    </div>
  );
};

export default AnswerButton;

import { LETTERS } from "@/constants";
import type { Answer } from "@/shared/types/game";
import AnswerButton from "../AnswerButton";
import styles from "./AnswerList.module.scss";

interface Props {
  answers: Answer[];
  selectedAnswerId: string | null;
  answerResult: "correct" | "wrong" | null;
  onSelect: (answerId: string) => void;
}

const AnswerList = ({
  answers,
  selectedAnswerId,
  answerResult,
  onSelect,
}: Props) => (
  <ul className={styles.list}>
    {answers.map((answer, index) => (
      <li key={answer.id}>
        <AnswerButton
          letter={LETTERS[index]}
          text={answer.text}
          isCorrect={answer.isCorrect}
          isSelected={selectedAnswerId === answer.id}
          answerResult={answerResult}
          selectedAnswerId={selectedAnswerId}
          onClick={() => onSelect(answer.id)}
        />
      </li>
    ))}
  </ul>
);

export default AnswerList;

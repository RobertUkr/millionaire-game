import AnswerButton from "@/components/AnswerButton";
import type { Question } from "@/shared/types/game";
import styles from "./PrizeLadder.module.scss";

interface Props {
  questions: Question[];
  currentIndex: number;
}

const PrizeLadder = ({ questions, currentIndex }: Props) => (
  <aside className={styles.aside}>
    <ul className={styles.list}>
      {[...questions].reverse().map((q, i) => {
        const questionIndex = questions.length - 1 - i;
        return (
          <li key={q.id}>
            <AnswerButton
              text={`$${q.prize.toLocaleString()}`}
              isActive={questionIndex === currentIndex}
              isEarned={questionIndex < currentIndex}
            />
          </li>
        );
      })}
    </ul>
  </aside>
);

export default PrizeLadder;

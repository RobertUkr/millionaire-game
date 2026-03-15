import Image from "next/image";

import cn from "classnames";

import Button from "@/components/Button";
import styles from "./HeroScreen.module.scss";

interface Props {
  subtitle?: string;
  title: string;
  buttonLabel: string;
  onAction: () => void;
  className?: string;
}

const HeroScreen = ({
  subtitle,
  title,
  buttonLabel,
  onAction,
  className,
}: Props) => (
  <main className={cn(styles.heroScreen, className)}>
    <div className={styles.heroScreenInner}>
      <div className={styles.imageBlock}>
        <Image src="/images/hand.png" alt="hand" width={624} height={367} />
      </div>

      <div className={styles.textBlock}>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <h1>{title}</h1>
        <div className={styles.buttonWrapper}>
          <Button onClick={onAction}>{buttonLabel}</Button>
        </div>
      </div>
    </div>
  </main>
);

export default HeroScreen;

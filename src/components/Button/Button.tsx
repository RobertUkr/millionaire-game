import cn from "classnames";

import styles from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ onClick, disabled, className, children }: Props) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(styles.button, className)}
  >
    {children}
  </button>
);

export default Button;

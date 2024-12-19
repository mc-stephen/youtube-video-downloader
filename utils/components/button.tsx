import styles from "./styles/button.module.css";
import { MouseEventHandler, ReactNode } from "react";

export default function Button({
  label,
  style,
  onClick,
}: {
  style?: string;
  label: string | ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button className={`${styles.button} ${style}`} onClick={onClick}>
      {label}
    </button>
  );
}

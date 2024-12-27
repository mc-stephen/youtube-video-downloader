import styles from "./styles/button.module.css";
import { MouseEventHandler, ReactNode } from "react";

/**
 * This variable defines the default type of an element.
 * @default "button"
 */
export default function Button({
  type,
  label,
  style,
  onClick,
}: {
  style?: string;
  label: string | ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button
      className={`${styles.button} ${style}`}
      onClick={onClick}
      type={type ?? "button"}
    >
      {label}
    </button>
  );
}

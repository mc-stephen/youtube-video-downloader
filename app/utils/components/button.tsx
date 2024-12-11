import { ReactNode } from "react";
import styles from "./styles/button.module.css";

export default function Button({
  icon,
  label,
  style,
}: {
  style?: string;
  icon?: string | undefined;
  label: string | ReactNode;
}) {
  return (
    <button className={`${styles.button} ${style}`}>
      {label}
      {icon && <i className={`fa fa-arrow`} />}
    </button>
  );
}

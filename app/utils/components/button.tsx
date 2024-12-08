import styles from "./styles/button.module.css";

export default function Button({
  icon,
  label,
  style,
}: {
  label: string;
  icon?: string | undefined;
  style?: { readonly [key: string]: string };
}) {
  return (
    <button className={`${styles.button} ${style}`}>
      {label}
      {icon && <i className={`fa fa-arrow`} />}
    </button>
  );
}

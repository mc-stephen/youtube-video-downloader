import styles from "./styles/head-component.module.css";

export default function HeaderComponent({ title }: { title: string }) {
  return (
    <section className={styles.headSection}>
      <div className={styles.frontLayer}>
        <h1>{title}</h1>
      </div>
    </section>
  );
}

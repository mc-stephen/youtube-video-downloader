import styles from "./page.module.css";
import ComingSoon from "@/utils/components/coming-soon";
import HeaderComponent from "@/utils/components/head-component";

export default function ContactUs() {
  return (
    <>
      <HeaderComponent title="Versioning History" />
      <section className={styles.contactSection}>
        <ComingSoon />
      </section>
    </>
  );
}

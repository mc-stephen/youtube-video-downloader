import Markdown from "react-markdown";
import styles from "./page.module.css";
import { getLocalFile } from "@/utils/services/getLocalFiles";
import HeaderComponent from "@/utils/components/head-component";

export default function PrivacyPolicy() {
  const markdownPath = "./app/privacy-policy/privacy-policy.md";
  const content = getLocalFile(markdownPath);

  return (
    <>
      <HeaderComponent title="Privacy Policy" />
      <Markdown className={styles.markdown}>{content}</Markdown>
    </>
  );
}

import Markdown from "react-markdown";
import styles from "./page.module.css";
import { getLocalFile } from "@/utils/services/getLocalFiles";
import HeaderComponent from "@/utils/components/head-component";

export default function Version() {
  const markdownPath = "./app/versions/version.md";
  const content = getLocalFile(markdownPath);

  return (
    <>
      <HeaderComponent title="Versioning History" />
      <Markdown className={styles.markdown}>{content}</Markdown>
    </>
  );
}

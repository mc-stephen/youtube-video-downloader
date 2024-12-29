"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import Routes from "@/utils/services/route";
import SvgBgFooter from "../../svg-bg-footer";
import LineBg from "@/public/images/line.png";
import ArrowDown from "@/public/icons/arrow_down.png";
import { useCallback, useEffect, useState } from "react";
import Variables from "@/utils/services/variable";

export default function Footer() {
  const maxWidth = 1800;
  const [boxW, setBoxW] = useState<number>(1700);
  const currentYear = new Date().getFullYear();
  const [openFaqId, setOpenFaqId] = useState<number>(3);
  const boxH: number = 900; // if value is changes also looked at it css
  const faq = [
    {
      title: `What is ${process.env.NEXT_PUBLIC_APP_NAME} Downloader?`,
      content:
        "VideoMax Downloader is an online tool that allows users to download videos and music from various platforms directly to their devices. It supports high-quality downloads and is compatible with multiple formats, making it convenient for offline viewing or listening.",
    },
    {
      title: `Is ${process.env.NEXT_PUBLIC_APP_NAME} Downloader free?`,
      content:
        "Yes, VideoMax Downloader is completely free to use. It allows users to download videos and music from various platforms, such as YouTube, without any cost or subscription fees. The tool offers high-quality downloads and supports multiple formats, making it a convenient and accessible option for anyone looking to save content for offline use.",
    },
    {
      title: "Where are the video stored?",
      content:
        'When you use VideoMax Downloader, downloaded videos are stored directly on your device, typically in the default "Downloads" folder. The exact location may vary depending on your device and browser settings. Check your browser\'s download preferences to confirm or customize the save location.',
    },
    {
      title: "Can we download unlimited?",
      content:
        "Yes, VideoMax Downloader allows unlimited downloads, so you can save as many videos or music files as you want without any restrictions. There are no caps on the number of downloads or the file size, making it a convenient tool for extensive use.",
    },
  ];

  const calculateBoxWidth = useCallback(() => {
    const width = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
    setBoxW(width);
  }, []);

  useEffect(() => {
    calculateBoxWidth();
    window.addEventListener("resize", () => calculateBoxWidth());
    return () => window.removeEventListener("resize", () => {});
  }, [calculateBoxWidth]);

  return (
    <section className={styles.footerSection}>
      <div className={styles.svgBg}>
        <SvgBgFooter boxH={boxH} boxW={boxW - 40} />
      </div>
      <div className={styles.frontLayer}>
        <Image
          src={LineBg}
          alt="Ling Bg Pattern"
          className={styles.bgPattern}
        />
        <div className={styles.titleCont}>
          <span>Frequently</span>
          <b>
            Asked <span>Questions</span>
          </b>
        </div>
        <div className={styles.faqCont}>
          {faq.map((val, i) => {
            const isOpened = openFaqId == i && styles.opened;
            return (
              <div key={i} className={`${styles.faq} ${isOpened}`}>
                <div
                  className={styles.titleCont}
                  onClick={() => setOpenFaqId(i)}
                >
                  <span className={styles.order}>0{i + 1}.</span>
                  <b className={styles.title}>{val.title}</b>
                  <Image
                    src={ArrowDown}
                    alt="Arrow Down"
                    className={`${styles.arrowIcon} ${isOpened}`}
                  />
                </div>
                <span className={styles.content}>{val.content}</span>
              </div>
            );
          })}
        </div>
        <footer className={styles.footer}>
          <span>@ 2024-{currentYear} YouTube Downloader</span>
          <div className={styles.middleCont}>
            <Image
              width="100"
              height="100"
              alt="code-fork"
              className={styles.img}
              src="https://img.icons8.com/ios/100/versions.png"
            />
            <Link href={Routes.versions} className={styles.version}>
              {Variables.currentVersion}
            </Link>
          </div>
          <ul>
            <li>
              <Link href={Routes.privacy_policy} className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={Routes.terms_of_services} className={styles.link}>
                Terms of Services
              </Link>
            </li>
            <li>
              <Link href={Routes.contact_us} className={styles.link}>
                Contact Us
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
}

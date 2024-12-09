"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Apple from "../public/icons/apple.png";
import Linux from "../public/icons/linux.png";
import LineBg from "../public/images/line.png";
import Woman from "../public/images/woman.png";
import Button from "./utils/components/button";
import LinkIcon from "../public/icons/link.png";
import Window from "../public/icons/window.png";
import Android from "../public/icons/android.png";
import React, { useEffect, useState } from "react";
import SvgSquareBg from "./utils/components/svg-bg";
import SvgBg from "./utils/components/svg-bg-header";
import JagaJaga from "../public/images/jaga-jaga.png";
import ArrowDown from "../public/icons/arrow_down.png";
import SvgBgFooter from "./utils/components/svg-bg-footer";
import GetVideoData from "./utils/services/get-video-data";

export default function Home() {
  const boxH: number = 1150; // if value is changes also looked at it css
  const currentYear = new Date().getFullYear();
  const [boxW, setBoxW] = useState<number>(1860);
  const [openFaqId, setOpenFaqId] = useState<number>(3);
  async function GetVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the form from refreshing the page
    
    console.log("is loading...");
    let result = await GetVideoData();
    console.log(result);
    console.log("Loading stop!");
    // console.log(result);
  }

  useEffect(() => {
    setBoxW(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", () => {
      setBoxW(window.innerWidth);
    });

    // Cleanup on unmount
    return () => window.removeEventListener("resize", () => {});
  }, []);

  //==================
  //
  //==================
  function HeadSection() {
    return (
      <section style={{ height: `${boxH}px` }} className={styles.head}>
        {/*  */}
        <div className={styles.imgLayer}>
          <SvgBg boxH={boxH} boxW={boxW} />
          <div className={styles.imgCover}></div>
        </div>

        {/*  */}
        <Image
          src={LineBg}
          alt="Ling Bg Pattern"
          className={styles.bgPattern}
        />

        {/*  */}
        <div className={styles.frontLayer}>
          <nav>
            <div className={styles.logo}></div>
            <div className={styles.other}></div>
          </nav>

          {/*  */}
          <div className={styles.sliderCont}>
            <div className={styles.card}>
              <Image src={JagaJaga} alt="jaga-jaga" className={styles.logo} />
              <span className={styles.subTitle}>Online Video</span>
              <b className={styles.title}>Downloader</b>
              <span className={styles.content}>
                Do Not Look Below! Explore Our <b>VideoMax</b> Video Downloader,
                A Free Solution To Quickly Download Videos Or Music With Just
                One Click
              </span>
            </div>

            {/*  */}
            <div className={styles.indicator}>
              <div></div>
              <div className={styles.selected}></div>
              <div></div>
            </div>
          </div>

          {/*  */}
          <div className={styles.searchCont}>
            <form onSubmit={GetVideo}>
              <Image src={LinkIcon} alt="Link Icon" className={styles.img} />
              <input
                type="text"
                placeholder="Insert Youtube Video Link Here ..."
              />
              <Button label="Download" />
              {/* <button>Download</button> */}
            </form>
            <div>
              <span>Supported Platforms :</span>
              <div className={styles.platformsIcon}>
                <Image
                  src={Window}
                  alt="Window OS Icon"
                  className={styles.img}
                />
                <hr />
                <Image src={Apple} alt="Apple OS Icon" className={styles.img} />
                <hr />
                <Image
                  src={Android}
                  alt="Android Icon"
                  className={styles.img}
                />
                <hr />
                <Image src={Linux} alt="Linux Icon" className={styles.img} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  //==================
  //
  //==================
  function LearnMoreSection() {
    return (
      <section className={styles.learnMore}>
        <span className={styles.subTitle}>
          Free <span>Youtube</span>
        </span>
        <b className={styles.title}>Video Downloader</b>
        <span className={styles.content}>
          With this platform, you can easily download any video from YouTube for
          free
        </span>
        <div className={styles.row}>
          <Button label="Contact Us" style={styles} />
          <Button label="Learn More" icon="fa fa-arrow-right" style={styles} />
        </div>
      </section>
    );
  }

  //==================
  //
  //==================
  function HowToUseSection() {
    const steps = [
      {
        title: "Find Video",
        content:
          "Find the video you want from among the videos available on YouTube and copy its links.",
      },
      {
        title: "Paste Video",
        content:
          "Paste the copied link in the desired box and then wait for the system to display the desired video download links in different formats and sizes.",
      },
      {
        title: "Download Video",
        content:
          "And in the last step, click on download from the displayed list and download the desired video and save it on your device.",
      },
    ];
    return (
      <section className={styles.howToSection}>
        <div className={styles.imgCont}>
          <SvgSquareBg />
          <Image src={Woman} alt="" className={styles.woman} />
        </div>
        <div className={styles.stepsCont}>
          <b>How To Use</b>
          <h2>
            YouTube <span>Downloader</span>
          </h2>
          <div className={styles.cardCont}>
            {steps.map((val, i) => {
              return (
                <div key={i} className={styles.card}>
                  <div className={styles.indicator}>0{i + 1}</div>
                  <div className={styles.column}>
                    <b className={styles.title}>{val.title}</b>
                    <span className={styles.content}>{val.content}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  //==================
  //
  //==================
  function FeaturesSection() {
    const features = [
      "With this platform, you can easily download any video from YouTube for free",
      "With this platform, you can easily download any video from YouTube for free",
      "With this platform, you can easily download any video from YouTube for free",
    ];
    return (
      <section className={styles.featuresSection}>
        {features.map((val, i) => {
          return (
            <div key={i} className={styles.card}>
              <b>0{i + 1}</b>
              <span>{val}</span>
            </div>
          );
        })}
      </section>
    );
  }

  //==================
  //
  //==================
  function WhyUseUsSection() {
    const features = [
      {
        icon: Linux,
        title: "High Quality",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum voluptatum maxime pariatur officia fuga provident eaque suscipit ipsa nobis ipsam consequuntur ratione, earum, harum voluptate qui non ab a.",
      },
      {
        icon: Window,
        title: "Fast Downloading",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum voluptatum maxime pariatur officia fuga provident eaque suscipit ipsa nobis ipsam consequuntur ratione, earum, harum voluptate qui non ab a.",
      },
      {
        icon: Apple,
        title: "Ultimate Download",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum voluptatum maxime pariatur officia fuga provident eaque suscipit ipsa nobis ipsam consequuntur ratione, earum, harum voluptate qui non ab a.",
      },
      {
        icon: Android,
        title: "Support All Devices",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum voluptatum maxime pariatur officia fuga provident eaque suscipit ipsa nobis ipsam consequuntur ratione, earum, harum voluptate qui non ab a.",
      },
    ];
    return (
      <section className={styles.whyUseUsSection}>
        <span>Why to choose</span>
        <b>
          VideoMax <span>Downloader</span>
        </b>
        <div className={styles.row}>
          {features.map((val, i) => {
            return (
              <div key={i} className={styles.card}>
                <Image src={val.icon} alt={val.title} className={styles.img} />
                <b className={styles.title}>{val.title}</b>
                <span className={styles.content}>{val.content}</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  //==================
  //
  //==================
  function FooterSection() {
    const faq = [
      {
        title: "What is X YouTube Downloader?",
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea sapiente esse fugit, repellendus officiis, facere nobis ut rem, fuga vero id a quia exercitationem ratione quibusdam aliquam! Sit, tempore tempora.",
      },
      {
        title: "Is X YouTube Downloader free?",
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea sapiente esse fugit, repellendus officiis, facere nobis ut rem, fuga vero id a quia exercitationem ratione quibusdam aliquam! Sit, tempore tempora.",
      },
      {
        title: "Where are the video stored?",
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea sapiente esse fugit, repellendus officiis, facere nobis ut rem, fuga vero id a quia exercitationem ratione quibusdam aliquam! Sit, tempore tempora.",
      },
      {
        title: "Can we download unlimited?",
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea sapiente esse fugit, repellendus officiis, facere nobis ut rem, fuga vero id a quia exercitationem ratione quibusdam aliquam! Sit, tempore tempora.",
      },
    ];
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
            <span>@ 2022-{currentYear} YouTube Downloader</span>
            <div className={styles.logo}></div>
            <ul>
              <li>
                <Link href="" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="" className={styles.link}>
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link href="" className={styles.link}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </footer>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <HeadSection />
      <LearnMoreSection />
      <HowToUseSection />
      <FeaturesSection />
      <WhyUseUsSection />
      <FooterSection />
    </React.Fragment>
  );
}

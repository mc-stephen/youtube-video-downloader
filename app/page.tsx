"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// import Image from "next/image";
import styles from "./page.module.css";
import SvgBg from "./utils/components/svg-bg";
import Button from "./utils/components/button";
import React, { useEffect, useState } from "react";

export default function Home() {
  const boxH: number = 1150;
  const [boxW, setBoxW] = useState<number>(1860);
  useEffect(() => {
    setBoxW(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", () => {
      setBoxW(window.innerWidth);
    });

    // Cleanup on unmount
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <React.Fragment>
      <HeadSection boxH={boxH} boxW={boxW - 40} />
      <LearnMoreSection />
      <HowToUseSection />
      <FeaturesSection />
      <WhyUseUsSection />
    </React.Fragment>
  );
}

//==================
//
//==================
function HeadSection({ boxW, boxH }: { boxW: number; boxH: number }) {
  return (
    <section style={{ height: `${boxH}px` }} className={styles.head}>
      {/*  */}
      <div style={{ height: `${boxH}px` }} className={styles.imgLayer}>
        <SvgBg boxH={boxH} boxW={boxW} />
        <div className={styles.imgCover}></div>
      </div>
      {/*  */}
      <div style={{ height: `${boxH}px` }} className={styles.frontLayer}>
        {/*  */}
        <nav>
          <div className={styles.logo}></div>
          <div className={styles.other}></div>
        </nav>
        {/*  */}
        <div className={styles.sliderCont}>
          <div className={styles.card}>
            <div className={styles.logo}></div>
            <span className={styles.subTitle}>Online Video</span>
            <b className={styles.title}>Downloader</b>
            <span className={styles.content}>
              Do Not Look Below! Explore Our <b>VideoMax</b> Video Downloader, A
              Free Solution To Quickly Download Videos Or Music With Just One
              Click
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
          <form>
            <i className="" />
            <input
              type="text"
              placeholder="Insert Youtube Video Link Here ..."
            />
            <Button label="Download" />
            {/* <button>Download</button> */}
          </form>
          <div>
            <span>Supported Platforms :</span>
            <ul>
              <li>x</li>
              <hr />
              <li>x</li>
              <hr />
              <li>x</li>
              <hr />
              <li>x</li>
            </ul>
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
      <div className={styles.imgCont}>{/* Img goes here */}</div>
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
  return <section className={styles.whyUseUsSection}>
    <span>Why to choose</span>
    <b></b>
  </section>;
}

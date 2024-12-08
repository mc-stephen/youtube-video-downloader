"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// import Image from "next/image";
import styles from "./page.module.css";
import Button from "./utils/components/button";
import SvgBg from "./utils/components/svg-bg";
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
            <Button label="Download"/>
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
  return (
    <section>
      <div></div>
      <div></div>
    </section>
  );
}

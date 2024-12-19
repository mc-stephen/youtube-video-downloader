"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import LineBg from "../public/images/line.png";
import Woman from "../public/images/woman.png";
import Button from "../utils/components/button";
import LinkIcon from "../public/icons/link.png";
import SvgSquareBg from "../utils/components/svg-bg";
import SvgBg from "../utils/components/svg-bg-header";
import JagaJaga from "../public/images/jaga-jaga.png";
import VideoFormats from "../utils/types/video-format";
import ArrowDown from "../public/icons/arrow_down.png";
import RenderTurnstile from "../utils/services/turnstile";
import SvgBgFooter from "../utils/components/svg-bg-footer";
import DownloadModal from "../utils/components/download_modal";
import GetVideoData from "../utils/services/ytdlp-get-video-data";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LoadingAnimatedIcon from "../public/icons/animated/animated_loader.svg";
import {
  TwitterSvg,
  FacebookSvg,
  LinkedInSvg,
  WhatsappSvg,
  InstagramSvg,
} from "../utils/components/social-medial-icons";

export default function IndexClient() {
  const maxWidth = 1800;
  const [boxW, setBoxW] = useState<number>(1700);

  useEffect(() => {
    const windowWidthIsMore = window.innerWidth > maxWidth;
    const width = windowWidthIsMore ? maxWidth : window.innerWidth;
    setBoxW(width);
    window.addEventListener("resize", () => {
      const windowWidthIsMore = window.innerWidth > maxWidth;
      const width = windowWidthIsMore ? maxWidth : window.innerWidth;
      return setBoxW(width);
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);
  return (
    <React.Fragment>
      <HeadSection boxW={boxW} />
      <LearnMoreSection />
      <HowToUseSection />
      <FeaturesSection />
      <WhyUseUsSection />
      <FooterSection boxW={boxW} />
    </React.Fragment>
  );
}

//==================
//
//==================
function HeadSection({ boxW }: { boxW: number }) {
  const boxH: number = 900; // if value is changes also looked at it css
  // const turnstileValue = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showTurnstile, setShowTurnstile] = useState<boolean>(false);
  const [allVideoData, setAllVideoData] = useState<VideoFormats[]>([]);
  const socials = [
    {
      icon: <LinkedInSvg />,
      link: "https://www.linkedin.com/in/mc-stephen",
    },
    {
      icon: <TwitterSvg />,
      link: "https://x.com/mc_stephen123",
    },
    {
      icon: <FacebookSvg />,
      link: "https://web.facebook.com/mc1stephen",
    },
    {
      icon: <InstagramSvg />,
      link: "https://www.instagram.com/mc_stephen212/",
    },
    {
      icon: <WhatsappSvg />,
      link: "https://api.whatsapp.com/send/?phone=2347042845314",
    },
  ];

  //======================================
  // useCallback make it render only once
  //======================================
  const GetVideo = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const videoUrl = formData.get("video_url")?.valueOf().toString() ?? "";

      // 01 (video url is empty) ================
      if (videoUrl.length == 0) return;

      // 02 (video already exist) ================
      const videoAlreadyExist = allVideoData.find((val) => val.url == videoUrl);
      if (videoAlreadyExist) {
        setShowDialog(true);
        return;
      }

      // 03 ====================
      setShowTurnstile(!showTurnstile);
    },
    [allVideoData, showTurnstile]
  );

  //==========================
  //
  //==========================
  useEffect(() => {
    RenderTurnstile(async (token: string) => {
      const formElement = formRef.current;
      if (formElement) {
        setIsLoading(true);
        setShowTurnstile(false);
        const formData = new FormData(formElement);
        const videoUrl = formData.get("video_url")!.valueOf().toString();
        try {
          const result = await GetVideoData({
            vidUrl: videoUrl,
            turnstileClientToken: token,
          });
          if (result) {
            console.log(result);
            setIsLoading(false);
            setShowDialog(true);
            setAllVideoData([result, ...allVideoData]);
          }
        } catch (error) {
          console.error("[Client Error] Getting Video Data", error);
        }
      }
    });
  }, [allVideoData]);

  return (
    <>
      <DownloadModal
        active={showDialog}
        videoData={allVideoData}
        onclick={function (): void {
          setShowDialog(false);
        }}
      />
      <section style={{ height: `${boxH}px` }} className={styles.head}>
        {/*  */}
        <div className={styles.imgLayer}>
          <SvgBg boxH={boxH} boxW={boxW - 40} />
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
            <form onSubmit={GetVideo} ref={formRef}>
              <Image src={LinkIcon} alt="Link Icon" className={styles.img} />
              <input
                type="text"
                name="video_url"
                placeholder="Insert Youtube Video Link Here ..."
                // defaultValue="https://www.youtube.com/watch?v=0TnO1GzKWPc"
              />
              <Button
                style={`${styles.button} ${isLoading && styles.nonactive}`}
                label={
                  !isLoading ? (
                    <>
                      <span>Download</span>
                      <div
                        id="turnstile-container"
                        className={`${styles.cloudflareTurnstile} ${
                          showTurnstile && styles.show
                        }`}
                      />
                    </>
                  ) : (
                    <Image
                      src={LoadingAnimatedIcon}
                      alt="Animated loader"
                      className={styles.loader}
                    />
                  )
                }
              />
            </form>
            <div>
              <span>
                Made with ❤️ by{" "}
                <Link
                  href={`${process.env.NEXT_PUBLIC_AUTHOR_PROFILE}`}
                  className={styles.link}
                >
                  mc-stephen:
                </Link>
              </span>
              <div className={styles.platformsIcon}>
                {socials.map((val, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Link
                        href={val.link}
                        target="_blank"
                        className={styles.link}
                      >
                        {val.icon}
                      </Link>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
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
        <Button label="Contact Us" />
        <Button label="Learn More" />
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
    "Download videos from a variety of platforms, including playlists, series, and more",
    "Support for multiple sites ensures you can grab favorite content anywhere it’s hosted",
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
      imgUrl: "https://img.icons8.com/ios/100/warranty--v1.png",
      title: "High Quality",
      content:
        "Enjoy crystal-clear video quality with every download, ensuring your viewing experience is as vibrant and detailed as the original. Say goodbye to pixelated videos and hello to sharp, high-definition content.",
    },
    {
      imgUrl: "https://img.icons8.com/dotty/100/download.png",
      title: "Fast Downloading",
      content:
        "Experience lightning-fast downloads that save you time and keep you entertained without delays. Our optimized servers ensure you get your videos in seconds, even for large files.",
    },
    {
      imgUrl: "https://img.icons8.com/wired/100/download--v1.png",
      title: "Ultimate Download",
      content:
        "Unlock the ultimate downloading experience with versatile options tailored to your needs. Whether it's quality, format, or compatibility, our platform delivers exactly what you want effortlessly.",
    },
    {
      imgUrl: "https://img.icons8.com/dotty/100/multiple-devices.png",
      title: "Support All Devices",
      content:
        "Access your favorite videos seamlessly on any device—smartphones, tablets, laptops, or TVs. Our downloads are designed to work flawlessly across all platforms and operating systems.",
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
              <Image
                width={50}
                height={50}
                src={val.imgUrl}
                alt={val.title}
                className={styles.img}
              />
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
function FooterSection({ boxW }: { boxW: number }) {
  const currentYear = new Date().getFullYear();
  const [openFaqId, setOpenFaqId] = useState<number>(3);
  const boxH: number = 900; // if value is changes also looked at it css
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

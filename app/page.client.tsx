"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Routes from "@/utils/services/route";
import LineBg from "../public/images/line.png";
import Woman from "../public/images/woman.png";
import Button from "../utils/components/button";
import LinkIcon from "../public/icons/link.png";
import menuIcon from "../public/icons/menu.png";
import SvgSquareBg from "../utils/components/svg-bg";
import SvgBg from "../utils/components/svg-bg-header";
import JagaJaga from "../public/images/jaga-jaga.png";
import VideoFormats from "../utils/types/video-format";
import ArrowDown from "../public/icons/arrow_down.png";
import RenderTurnstile from "../utils/services/turnstile";
import SvgBgFooter from "../utils/components/svg-bg-footer";
import DownloadModal from "../utils/components/download_modal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GetVideoData from "../utils/services/yt-dlp/ytdlp-get-video-data";
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

  const calculateBoxWidth = useCallback(() => {
    const width = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
    setBoxW(width);
  }, []);

  useEffect(() => {
    calculateBoxWidth();
    window.addEventListener("resize", () => calculateBoxWidth());
    return () => window.removeEventListener("resize", () => {});
  }, [calculateBoxWidth]);

  // if (!boxW) return <>Loading</>;

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
  const formRef = useRef<HTMLFormElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const turnstileToken = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTurnstile, setShowTurnstile] = useState<boolean>(false);
  const [allVideoData, setAllVideoData] = useState<VideoFormats[]>([]);
  const nav: Record<string, string>[] = [
    {
      label: "Donate",
      path: Routes.donate,
    },
    {
      label: "About Us",
      path: Routes.about_us,
    },
    {
      label: "Extensions",
      path: Routes.extension,
    },
    {
      label: "More Tools",
      path: Routes.more_tools,
    },
    {
      label: "Special Thanks",
      path: Routes.special_thanks,
    },
  ];
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
        dialog.current?.showModal();
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
  const sendRequest = useCallback(() => {
    const formElement = formRef.current;
    const formData = new FormData(formElement!);
    const videoUrl = formData.get("video_url")!.valueOf().toString();
    const urlRegex =
      /^(https?:\/\/)?(www\.)?([\w\-]+\.)+[\w]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    if (turnstileToken.current != null) {
      if (urlRegex.test(videoUrl)) {
        setIsLoading(true);
        setShowTurnstile(false);
        const request = GetVideoData({
          vidUrl: videoUrl,
          turnstileClientToken: turnstileToken.current,
        });
        request
          .then((res) => {
            if (res) {
              console.log(res);
              setIsLoading(false);
              dialog.current?.showModal();
              setAllVideoData([...allVideoData, res]);
            }
          })
          .catch((err) => {
            console.error("[Client Error] Getting Video Data", err);
          });
      }
    }
  }, [allVideoData]);

  //==========================
  //
  //==========================
  useEffect(() => {
    RenderTurnstile((token: string) => {
      turnstileToken.current = token;
      sendRequest();
    });
  }, [sendRequest]);

  return (
    <>
      <DownloadModal
        ref={dialog}
        videoData={allVideoData}
        onClose={() => dialog.current?.close()}
      />
      <section style={{ height: `${boxH}px` }} className={styles.head}>
        {/*==============================*/}
        {/* BG Layer */}
        {/*==============================*/}
        <div className={styles.imgLayer}>
          <SvgBg boxH={boxH} boxW={boxW - 40} />
          <div className={styles.imgCover}></div>
        </div>

        {/*==============================*/}
        {/* FRONT Layer */}
        {/*==============================*/}
        <div className={styles.frontLayer}>
          <header>
            <div className={styles.logo}>
              <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
            </div>
            <ul className={styles.other}>
              {nav.map((val, i) => {
                return (
                  <li key={i}>
                    <Link href={val.path} className={styles.link}>
                      {val.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </header>

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
              />
              <div className={styles.row}>
                <Button
                  type="submit"
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
                <Button
                  onClick={() => dialog.current?.showModal()}
                  label={
                    <Image
                      src={menuIcon}
                      alt="Link Icon"
                      className={styles.img}
                    />
                  }
                />
              </div>
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

        {/*==============================*/}
        {/* Pattern Img */}
        {/*==============================*/}
        <Image
          src={LineBg}
          alt="Ling Bg Pattern"
          className={styles.bgPattern}
        />
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
          {process.env.NEXT_PUBLIC_APP_NAME} <span>Downloader</span>
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
              2024.12.20
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

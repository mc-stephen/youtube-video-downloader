"use client";

import Button from "./button";
import Image from "next/image";
import AdComponent from "./ads/ds";
import CloseIcon from "./close-icon";
import VideoFormats from "../types/video-format";
import styles from "./styles/download_modal.module.css";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import DownloadVideoYtdlp from "../services/yt-dlp/ytdlp-download-video";
import LoadingAnimatedIcon from "@/public/icons/animated/animated_loader.svg";
import Helper from "../services/helper";

export default function DownloadModal({ onClose, videoData, ref }: cc) {
  const currentVideoTitle = useRef("");
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  //===============================
  // Download Video
  //===============================
  const DownloadVideo = useCallback(
    async ({ i, event }: vv) => {
      event.preventDefault();

      const def = "default";
      const formData = new FormData(event.target as HTMLFormElement);
      // const caption = formData.get("subtitle")!.toString();
      // const subtitle = formData.get("subtitle")!.toString();
      const videoUrl = formData.get("video_url")!.toString();
      const audioFormatId = formData.get("audio_format")?.toString() ?? def;
      const videoFormatId = formData.get("video_format")!.toString();

      // console.log(formData.get("audio_format")!.valueOf());

      // return;

      if (!loadingIds.includes(i)) {
        setLoadingIds([...loadingIds, i]);
        // if (audioFormatId != def && videoFormatId != def) {
        // setIsDownloading(true);

        // Download caption is selected
        // if (caption != def) {
        //   console.info("Download Caption");
        // }

        // Download subtitle if selected
        // if (subtitle != def) {
        //   console.info("Download Subtitle");
        // }

        // now download video is audio/video format selected
        try {
          console.log([videoUrl, audioFormatId, videoFormatId]);
          const videoPath = await DownloadVideoYtdlp({
            videoUrl: videoUrl,
            videoTitle: currentVideoTitle.current,
            audioFormatId: audioFormatId == def ? null : audioFormatId,
            videoFormatId: videoFormatId == def ? null : videoFormatId,
          });
          if (videoPath) {
            const { origin } = window.location;
            const anchor = document.createElement("a");
            const fileName = videoPath!.trim().split("/").pop();
            const encodedFilePath = encodeURIComponent(videoPath.trim());
            const filePath = `${origin}/api/download?file=${encodedFilePath}`;
            //
            anchor.href = filePath;
            anchor.target = "_blank";
            anchor.download = fileName!;
            anchor.rel = "noopener noreferrer";
            anchor.click();
          }
        } catch (error) {
          console.error(`[Client Error] Download Video Failed:  ${error}`);
        } finally {
          const cc = loadingIds.filter((val) => val != i);
          setLoadingIds(cc);
        }
        // }
      }
    },
    [loadingIds]
  );

  return (
    <dialog ref={ref} className={styles.dialog}>
      {/*  */}
      <div className={styles.head}>
        <b>Download Videos</b>
        <div className={styles.iconBtn} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>

      {/*  */}
      <div className={styles.cardCont}>
        <AdComponent />
        {videoData.length == 0 ? (
          <NoVideoDisplayed />
        ) : (
          videoData.map((val, i) => {
            const img = `/api/proxy-image?url=${encodeURIComponent(
              val.thumbnail
            )}`;
            return (
              <div className={styles.card} key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={val.title} className={styles.img} />
                <form
                  className={styles.frontLayer}
                  onSubmit={(event) => DownloadVideo({ event: event, i: i })}
                >
                  <b className={styles.title}>
                    {Helper.sanitizeFileName(val.title)}
                  </b>
                  <input name="video_url" defaultValue={val.url} hidden />
                  <div className={styles.configuration}>
                    {/*  */}
                    <select name="audio_format" defaultValue="default">
                      <option value="default" disabled hidden>
                        Audio Format
                      </option>
                      {val.audio_formats.map((val, i) => (
                        <option value={val["format_id"]} key={i}>
                          {val["format"]}
                        </option>
                      ))}
                    </select>
                    {/*  */}
                    <select name="video_format" defaultValue="" required>
                      <option value="" disabled hidden>
                        Video Format
                      </option>
                      {val.video_formats.map((val, i) => (
                        <option value={val["format_id"]} key={i}>
                          {val["format"]}
                        </option>
                      ))}
                    </select>
                    {/*  */}
                    {/* <select name="subtitle" defaultValue="default" id="vid">
                      <option value="default" hidden>
                        Subtitle
                      </option>
                    </select> */}
                    {/*  */}
                    {/* <select name="caption" defaultValue="default" id="vid">
                      <option value="default" hidden>
                        Caption
                      </option>
                      {val.captions.map((val, i) => (
                        <option value={i} key={i}>
                          {val["ext"]} / {val["name"]}
                        </option>
                      ))}
                    </select> */}
                  </div>
                  <div className={styles.row}>
                    <Button
                      type="submit"
                      style={`${loadingIds.includes(i) && styles.inactive}`}
                      onClick={() => {
                        currentVideoTitle.current = val.title;
                      }}
                      label={
                        !loadingIds.includes(i) ? (
                          "Download"
                        ) : (
                          <Image
                            src={LoadingAnimatedIcon}
                            alt="Animated loader"
                            className={styles.loader}
                          />
                        )
                      }
                    />
                  </div>
                </form>
              </div>
            );
          })
        )}
      </div>
    </dialog>
  );
}

//===============================
//
//===============================
function NoVideoDisplayed() {
  return <div></div>;
}

type vv = {
  i: number;
  event: React.FormEvent<HTMLFormElement>;
};

type cc = {
  videoData: VideoFormats[];
  onClose: MouseEventHandler<HTMLDivElement>;
  ref: React.RefObject<HTMLDialogElement | null>;
};

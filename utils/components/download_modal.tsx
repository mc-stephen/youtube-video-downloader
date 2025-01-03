"use client";

import Button from "./button";
import Image from "next/image";
import CloseIconSvg from "./close-icon";
import Helper from "../services/helper";
import AdComponent from "./ads/ads_728x90";
import VideoFormats from "../types/video-format";
import styles from "./styles/download_modal.module.css";
import React, { MouseEventHandler, useCallback, useState } from "react";
import LoadingAnimatedIcon from "@/public/icons/animated/animated_loader.svg";

export default function DownloadModal({ onClose, videoData, ref }: cc) {
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  //===============================
  // Download Video
  //===============================
  const DownloadVideo = useCallback(
    async ({ i, event }: vv) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const params = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        params.append(key, value.toString());
      }

      if (!loadingIds.includes(i)) {
        // try {
        setLoadingIds([...loadingIds, i]);
        const origin = window.location.origin;
        const eventSource = new EventSource(
          `${origin}/api/yt-dlp/download-video?${params.toString()}`
        );

        // Handle an open event
        eventSource.onopen = (e) => {
          console.log("Connection to server opened", e);
        };

        // Handle a message event
        eventSource.onmessage = (e) => {
          const data = JSON.parse(e.data);
          console.log("New message from server:", data);
        };

        // Handle errors
        eventSource.onerror = (error) => {
          console.error("Connection Closed:", error);
          eventSource.close();
          const cc = loadingIds.filter((val) => val != i);
          setLoadingIds(cc);
        };

        // const videoPath = await DownloadVideoYtdlp({
        //   videoUrl: videoUrl,
        //   videoTitle: currentVideoTitle.current,
        //   audioFormatId: audioFormatId == def ? null : audioFormatId,
        //   videoFormatId: videoFormatId == def ? null : videoFormatId,
        // });
        // if (videoPath) {
        //   const { origin } = window.location;
        //   const anchor = document.createElement("a");
        //   const fileName = videoPath!.trim().split("/").pop();
        //   const encodedFilePath = encodeURIComponent(videoPath.trim());
        //   const filePath = `${origin}/api/download?file=${encodedFilePath}`;
        //   //
        //   anchor.href = filePath;
        //   anchor.target = "_blank";
        //   anchor.download = fileName!;
        //   anchor.rel = "noopener noreferrer";
        //   anchor.click();
        // }
        // } catch (error) {
        //   console.error(`[Client Error] Download Video Failed:  ${error}`);
        // } finally {
        // const cc = loadingIds.filter((val) => val != i);
        // setLoadingIds(cc);
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
        <div className={styles.iconBtn} onClick={onClose} autoFocus={true}>
          <CloseIconSvg />
        </div>
      </div>

      {/*  */}
      <div className={styles.cardCont}>
        {videoData.length == 0 ? (
          <NoVideoDisplayed />
        ) : (
          videoData.map((val, i) => {
            const isTrue = loadingIds.includes(i);
            const img = `/api/proxy-image?url=${encodeURIComponent(
              val.thumbnail
            )}`;
            return (
              <React.Fragment key={i}>
                <AdComponent />
                <div className={styles.card}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={val.title} className={styles.img} />
                  <form
                    className={styles.frontLayer}
                    onSubmit={(event) => {
                      return DownloadVideo({ i: i, event: event });
                    }}
                  >
                    <b className={styles.title}>
                      {Helper.sanitizeFileName(val.title)}
                    </b>
                    <input name="video_url" defaultValue={val.url} hidden />
                    <input name="video_title" defaultValue={val.title} hidden />
                    <div className={styles.configuration}>
                      {/*  */}
                      {val.audio_formats.length > 0 && (
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
                      )}
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
                    </div>
                    <div className={`${styles.row} ${isTrue && styles.busy}`}>
                      <Button
                        type="submit"
                        style={`${isTrue && styles.inactive}`}
                        label={
                          !isTrue ? (
                            <span>Download</span>
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
              </React.Fragment>
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
  return <div style={{ textAlign: "center" }}>No Video Displayed Yet!</div>;
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

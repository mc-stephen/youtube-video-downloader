"use server";

import Variables from "../../variable";
import { execSync } from "child_process";
import logger from "../../../config/logger";
import VideoFormats from "../../../types/video-format";

export default async function GetVideoDataUsingYtDlp({
  vidUrl,
}: {
  vidUrl: string;
}): Promise<VideoFormats | null> {
  const flag: string = ["-j"].join(" ");

  try {
    const output = execSync(`${Variables.ytdlp_path} ${flag} ${vidUrl}`, {
      encoding: "utf-8",
    });

    //
    const splitted = output.split(/\r?\n/);
    const filtered = splitted.filter((e) => e !== "");
    const videoMetaData = JSON.parse(filtered[0]);

    logger.info(videoMetaData);

    //
    const formats = videoMetaData["formats"];
    const data: VideoFormats = {
      url: vidUrl,
      title: videoMetaData["title"],
      thumbnail: videoMetaData["thumbnail"],
      duration: videoMetaData["duration_string"],
      video_formats: formats
        .filter((format: { video_ext: string }) => {
          return format.video_ext && format.video_ext !== "none";
        })
        .map((format: { format_id: string; video_ext: string }) => ({
          ...format,
          format_id: `${format.format_id}+`, // Append '+' to the id key
        })) as Record<string, string>[],
      audio_formats: formats.filter((format: { audio_ext: string }) => {
        return format.audio_ext && format.audio_ext !== "none";
      }),
    };

    return data;
  } catch (error) {
    logger.error(`Error Getting Video Data: ${error}`);
    return null;
  }
}

// "-F", // Get Available Audio and Video Formats
// "--newline",
// "-j", // Get Video Metadata


// TODO
// add a logic to the default, that adds best for video and audio selection, so all can use it and this will be removed

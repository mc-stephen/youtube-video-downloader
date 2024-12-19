"use server";

import logger from "../config/logger";
import { execSync } from "child_process";

export default async function DownloadVideoYtdlp({
  videoUrl,
  audioFormatId,
  videoFormatId,
}: {
  videoUrl: string;
  audioFormatId: string | null;
  videoFormatId: string | null;
}): Promise<string | null> {
  const ytdlp: string = "./utils/command/yt-dlp";
  let flag: string = [
    "--max-filesize 500M",
    `-f "${videoFormatId}${audioFormatId}"`,
  ].join(" ");

  try {
    // download video
    logger.info(`[Download Video] Flag => ${flag}`);
    const output = execSync(`${ytdlp} ${flag} ${videoUrl}`, {
      encoding: "utf-8",
    });

    // get video path
    flag = [`--print "${"%(filename)s"}"`, `${flag}`].join(" ");
    const outputPath = execSync(`${ytdlp} ${flag} ${videoUrl}`, {
      encoding: "utf-8",
    });

    const splitted = output.split(/\r?\n/);
    const filtered = splitted.filter((e) => e !== "");

    filtered.map((val) => {
      logger.info(val);
    });

    logger.info(`path: ${outputPath}`);

    return outputPath;
  } catch (error) {
    logger.error(`Error Getting Video Data ${error}`);
    return null;
  }
}

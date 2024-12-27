"use server";

import Helper from "../helper";
import logger from "../../config/logger";
import { execSync } from "child_process";
import Variables from "../variable";

export default async function DownloadVideoYtdlp({
  videoUrl,
  videoTitle,
  audioFormatId,
  videoFormatId,
}: vv): Promise<string | null> {
  //
  const sanitizedTitle = Helper.sanitizeFileName(videoTitle);

  let flag: string = [
    "--max-filesize 500M",
    `-f "${videoFormatId}${audioFormatId ?? "best"}"`,
    `-o "./public/downloads/${sanitizedTitle}-%(height)sp-%(format_id)s.%(ext)s"`, // this override the value in .conf
  ].join(" ");

  try {
    // download video
    logger.info(`[Download Video] Flag => ${flag}`);
    const output = execSync(`${Variables.ytdlp_path} ${flag} ${videoUrl}`, {
      encoding: "utf-8",
    });

    // get video path
    flag = [`--print "${"%(filename)s"}"`, `${flag}`].join(" ");
    const outputPath = execSync(`${Variables.ytdlp_path} ${flag} ${videoUrl}`, {
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

//=========================
//
//=========================
type vv = {
  videoUrl: string;
  videoTitle: string;
  audioFormatId: string | null;
  videoFormatId: string | null;
};

/// !TODO
// pass the video file size back to the client.
// find a way to get file full path and name without running a second command "get video path"
// add a way to display generation progress to the client, instead of just a loading animated icon

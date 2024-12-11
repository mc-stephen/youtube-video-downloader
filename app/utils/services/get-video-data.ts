/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { exec, execSync } from "child_process";

// https://www.youtube.com/watch?v=0TnO1GzKWPc

export default async function GetVideoData({
  vidUrl,
}: {
  vidUrl: string;
}): Promise<string | string[]> {
  const ytdlp: string = "./app/utils/command/yt-dlp/yt-dlp";
  const options: string = [
    "-j", // Get Video Metadata
    "-F", // Get Available Audio and Video Formats
    "--newline",
  ].join(" ");
  
  try {
    const output = execSync(`${ytdlp} ${options} ${vidUrl}`, {
      encoding: "utf-8",
    });
    const splitted = output.split(/\r?\n/);
    const filtered = splitted.filter((e) => {
      return e !== "";
    });

    console.log("Server: CMD output =>", filtered);

    return filtered;
  } catch (error) {
    console.error("Error =>", error);
    return "";
  }
}

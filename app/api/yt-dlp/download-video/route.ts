/* eslint-disable @typescript-eslint/no-unused-vars */

import { spawn } from "child_process";
import logger from "@/utils/config/logger";
import Helper from "@/utils/services/helper";
import Variables from "@/utils/services/variable";
import { NextRequest, NextResponse } from "next/server";

// This is required to enable streaming
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

//===============================================
// THIS USES SSE AND NOT PLAIN HTTP OR WEBSOCKET
//===============================================
export async function GET(req: NextRequest) {
  const abortSignal = req.signal; // Access the request's signal for abort detection
  const encoder = new TextEncoder();
  const command = Variables.ytdlp_path;
  const responseStream = new TransformStream();
  const searchParams = req.nextUrl.searchParams;
  const videoUrl = searchParams.get("video_url");
  const videoTitle = searchParams.get("video_title");
  const writer = responseStream.writable.getWriter();
  const videoFormatId = searchParams.get("video_format");
  const audioFormatId = searchParams.get("audio_format");
  const title = Helper.sanitizeFileName(videoTitle ?? "");
  const process = spawn(command, [
    "--newline",
    ...["--max-filesize", "500M"],
    ...["-f", `${videoFormatId ?? "best"}${audioFormatId ?? "best"}`],
    ...["-o", `./public/downloads/${title}-%(height)sp-%(format_id)s.%(ext)s`],
    videoUrl ?? "",
  ]);

  //=============================
  // Early validation error return
  //=============================
  const validate = !videoUrl || !videoTitle || !videoFormatId || !audioFormatId;
  if (validate) {
    const status = !videoUrl || !videoTitle;
    const message = status
      ? "Video URL / Title params missing"
      : "Video / Audio format ID params missing";
    return NextResponse.json({ status: false, message: message });
  }

  //========================================
  // [Terminal] Listen for real-time output
  //========================================
  process.stdout.on("data", async (data: Buffer) => {
    const dataStr = data.toString();
    const regex = /\[download\].*%/; // check if this output is the download output
    logger.info(`Command Output: ${data}`);
    if (regex.test(dataStr)) {
      const newRegex = /\[download\]\s+([\d.]+)%\s+of\s+([\d.]+)([KMG]iB)/; // get the percentage and the video size
      const match = dataStr.match(newRegex);
      if (match) {
        const size = match[2]; // video size
        const unit = match[3]; // mib or kib
        const percentage = match[1]; // percentage downloaded
        sendResponse({
          status: true,
          data: {
            video_size: size,
            video_unit: unit,
            generated_percentage: percentage,
          },
        });
      }
    }
  });

  //============================
  // [Terminal] Error occur
  //============================
  process.stderr.on("data", (data) => {
    logger.error(`Error: ${data}`);
    sendResponse({ message: "Process Ended with Error" });
    writer.close();
  });

  //=============================
  // [Terminal] Detect when the process exits
  //=============================
  process.on("close", (code) => {
    logger.info(`Process exited with code: ${code}`);
    if (code == 0) {
      sendResponse({
        status: true,
        data: {
          video_url: "",
        },
      });
    } else {
      sendResponse({ message: "Process Closed with Error" });
    }
    writer.close();
  });

  //==================================
  // Function to send data to the client
  //==================================
  async function sendResponse({ status = false, message = "", data = {} }) {
    await writer.write(
      encoder.encode(
        `data: ${JSON.stringify({
          status: status,
          message: message,
          data: data,
        })}\n\n`
      )
    );
  }

  //==================================
  // Listen to SSE connect get aborted
  //==================================
  abortSignal.addEventListener("abort", () => {
    logger.info("Client disconnected");
    writer.close(); // Close the writable stream
  });

  //=====================================
  // Headers for Server-Sent Events (SSE)
  //=====================================
  return new Response(responseStream.readable, {
    headers: {
      Connection: "keep-alive",
      // "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      // "Content-Type": "text/event-stream; charset=utf-8",
      "Content-Type": "text/event-stream",
    },
  });
}

//   // get video path
//   flag = [`--print "${"%(filename)s"}"`, `${flag}`].join(" ");
//   const outputPath = execSync(`${Variables.ytdlp_path} ${flag} ${videoUrl}`, {
//     encoding: "utf-8",
//   });

//   const splitted = output.split(/\r?\n/);
//   const filtered = splitted.filter((e) => e !== "");

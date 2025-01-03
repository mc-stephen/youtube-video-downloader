import logger from "@/utils/config/logger";
import VideoFormats from "@/utils/types/video-format";
import { NextRequest, NextResponse } from "next/server";
import GetYoutubeVideoData from "@/utils/services/yt-dlp/youtube";
import GetVideoDataUsingYtDlp from "@/utils/services/yt-dlp/default";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("videoUrl");
  const turnstileClientToken = searchParams.get("turnstileClientToken");

  //=========================
  //
  //=========================
  if (videoUrl == null && turnstileClientToken == null) {
    return NextResponse.json({
      status: false,
      message: "VideoUrl or turnstile client token are missing",
    });
  }

  //=========================
  //
  //=========================
  return await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        response: turnstileClientToken,
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      }),
    }
  )
    .then(async (val) => {
      const outcome = await val.json();

      if (outcome.success) {
        let data: VideoFormats | null;

        if (videoUrl!.includes("youtube.com")) {
          data = await GetYoutubeVideoData({ vidUrl: videoUrl! });
        } else {
          data = await GetVideoDataUsingYtDlp({ vidUrl: videoUrl! });
        }

        return NextResponse.json({ status: true, data: data });
      } else {
        const message = `[Turnstile] Token verification failed: ${outcome}`;
        logger.error(message);
        return NextResponse.json({ status: false, message: message });
      }
    })
    .catch((err) => {
      const message = `[Turnstile] Fetch error: ${err}`;
      logger.error(message);
      return NextResponse.json({ status: false, message: message });
    });
}

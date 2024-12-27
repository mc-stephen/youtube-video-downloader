"use server";

import logger from "../../config/logger";
import VideoFormats from "../../types/video-format";
import GetYoutubeVideoData from "./platforms/youtube";
import GetVideoDataUsingYtDlp from "./platforms/default";

export default async function GetVideoData({
  vidUrl,
  turnstileClientToken,
}: request): returnType {
  const verifyTurnstileToken = fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        response: turnstileClientToken,
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      }),
    }
  );
  return await verifyTurnstileToken
    .then(async (val) => {
      const outcome = await val.json();

      if (outcome.success) {
        let data: VideoFormats | null;

        if (vidUrl.includes("youtube.com")) {
          data = await GetYoutubeVideoData({ vidUrl: vidUrl });
        } else {
          data = await GetVideoDataUsingYtDlp({ vidUrl: vidUrl });
        }

        return data;
      } else {
        logger.error(`[Turnstile] Token verification failed: ${outcome}`);
        return null;
      }
    })
    .catch((err) => {
      logger.error(`[Turnstile] Fetch error => ${err}`);
      return null;
    });
}

type returnType = Promise<VideoFormats | null>;
type request = {
  vidUrl: string;
  turnstileClientToken: string;
};

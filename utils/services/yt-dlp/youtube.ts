"use server";

import logger from "../../config/logger";
import VideoFormats from "../../types/video-format";

export default async function GetYoutubeVideoData({
  vidUrl,
}: {
  vidUrl: string;
}): Promise<VideoFormats | null> {
  const videoId = extractVideoId(vidUrl);
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = "https://www.googleapis.com/youtube/v3/videos?";
  const params = `part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(`${url}${params}`);
    const { items } = await response.json();
    const vidData = items[0];
    return {
      url: vidUrl,
      title: vidData["snippet"]["title"],
      thumbnail: vidData["snippet"]["thumbnails"]["default"]["url"],
      duration: parseDuration(vidData["contentDetails"]["duration"]).toString,
      audio_formats: [
        { format: "160kbps", format_id: "ba[abr<=160]" },
        { format: "192kbps", format_id: "ba[abr<=192]" },
        { format: "256kbps", format_id: "ba[abr<=256]" },
        { format: "320kbps", format_id: "ba[abr<=320]" },
        { format: "Best (Recommended)", format_id: "ba" },
      ],
      video_formats: [
        { format: "360p", format_id: "bv[height<=360]+" },
        { format: "480p", format_id: "bv[height<=480]+" },
        { format: "720p", format_id: "bv[height<=720]+" },
        { format: "1080p HD (Recommended)", format_id: "bv[height<=1080]+" }, // hd
        { format: "1440p 2k", format_id: "bv[height<=1440]+" }, // 2k
        { format: "2160p 4k", format_id: "bv[height<=2160]+" }, // 4k
        { format: "4320p 8k", format_id: "bv[height<=4320]+" }, // 8k
      ],
    };
  } catch (error) {
    logger.error(`"[Youtube] Failed to get video data =>" ${error}`);
    return null;
  }
}

//==================================
//
//==================================
function extractVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Check for youtu.be short URL (standard YouTube video)
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // Return the part after "/"
    }

    // Check for youtube.com URL (standard YouTube video)
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      // Check if it's a regular video URL (youtube.com/watch?v=videoId)
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v"); // Return the "v" parameter
      }

      // Check if it's a YouTube Shorts URL (youtube.com/shorts/videoId)
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2]; // Extract videoId from "/shorts/videoId"
      }
    }

    // If the URL doesn't match any valid patterns
    throw new Error("Invalid YouTube URL");
  } catch (err) {
    logger.error(`Error extracting video ID: ${err}`);
    return null;
  }
}

//==================================
//
//==================================
function parseDuration(isoDuration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/; // Regex to match ISO 8601 duration format
  const matches = isoDuration.match(regex);

  const hours = parseInt((matches ?? ["", "", "", ""])[1] || "0", 10); // Extract hours (if present)
  const minutes = parseInt((matches ?? ["", "", "", ""])[2] || "0", 10); // Extract minutes (if present)
  const seconds = parseInt((matches ?? ["", "", "", ""])[3] || "0", 10); // Extract seconds (if present)
  const toString = `${hours}:${minutes}`;

  return { hours, minutes, seconds, toString };
}

import logger from "@/utils/config/logger";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Parse the URL from the request
  const { searchParams } = new URL(req.url);

  // Get the 'url' query parameter from the request URL
  const url = searchParams.get("url");

  // Check if the 'url' query parameter is provided and valid
  if (!url || typeof url !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing or invalid image URL" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Fetch the image from the provided URL
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Add necessary headers to mimic a browser request
        "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0",
        Referer: url,
      },
    });

    // Check if the response is okay (status 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    // Read the response as a buffer (arraybuffer)
    const buffer = await response.arrayBuffer();

    // Return the image with correct content type
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    logger.error(`Error fetching image: => ${error}`);
    return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

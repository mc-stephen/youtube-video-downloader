import fs from "fs";
import path from "path";
import logger from "@/utils/config/logger";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiePath = "./utils/cookies.txt";
  const cookiesFile = path.join(__dirname, cookiePath);

  // Check if the file exists
  if (!fs.existsSync(cookiesFile)) {
    logger.error(`Cookies file not found: ${cookiesFile}`);
    return;
  }

  // Read the file content
  const content = fs.readFileSync(cookiesFile, "utf-8");
  const lines = content.split("\n");
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since epoch

  let expired = false;

  for (const line of lines) {
    // Skip comments and empty lines
    if (line.startsWith("#") || line.trim() === "") {
      continue;
    }

    // Split the line into fields (Tab-separated)
    const fields = line.split("\t");
    if (fields.length < 7) {
      continue; // Skip malformed lines
    }

    // Extract the expiry timestamp (5th field)
    const expiry: string | undefined = fields[4];
    if (expiry && !isNaN(Number(expiry))) {
      const expiryTime: number = parseInt(expiry, 10);
      if (expiryTime < currentTime) {
        console.warn("Cookies have expired!");
        expired = true;
        break;
      }
    }
  }

  if (!expired) {
    console.log("Cookies are still valid.");
  }

  //
  return NextResponse.json({
    status: true,
    message: `Found ${expired} expired cookies`,
  });
}

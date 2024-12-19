import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const folderPath = "./public/downloads/";
  if (!fs.existsSync(folderPath)) {
    throw new Error(`Folder does not exist: ${folderPath}`);
  }

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively delete subfolders
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      // Delete file
      fs.unlinkSync(filePath);
    }
  }

  return NextResponse.json({
    status: true,
    message: "All video cleared successfully!",
  });
}

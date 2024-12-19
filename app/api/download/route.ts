import path from "path";
import { NextRequest } from "next/server";
import { createReadStream, existsSync } from "fs";
import { Readable } from "stream";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return new Response(
      JSON.stringify({ error: "File parameter is missing" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Define the dynamic file path
  const filePath = path.join(process.cwd(), file.replace("./", ""));

  // Check if the file exists
  if (!existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Set headers for the browser to download the file
  const encodedFileName = encodeURIComponent(path.basename(file));
  const headers = new Headers({
    "Content-Disposition": `attachment; filename*=UTF-8''${encodedFileName}`,
    "Content-Type": "application/octet-stream",
  });

  // Convert Node.js readable stream to a Web ReadableStream
  const nodeStream = createReadStream(filePath);
  const webStream = Readable.toWeb(nodeStream); // Node.js built-in utility (v16.5+)

  return new Response(webStream as ReadableStream, { headers });
}

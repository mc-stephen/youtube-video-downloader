import fs from "fs";
import path from "path";
import logger from "../config/logger";

/**
 * Reads the content of a file and returns it as a string.
 * @param filePath - The absolute path to the file.
 * @returns The content of the file as a string.
 * @throws Error if the file cannot be read.
 */
export function getLocalFile(filePath: string): string {
  try {
    const resolvedPath = path.resolve(process.cwd(), filePath); // Resolve the file path
    const fileContents = fs.readFileSync(resolvedPath, "utf-8"); // Read the file as UTF-8
    return fileContents;
  } catch (error) {
    logger.error(`[Get Local File] Error getting file => ${error}`);
    return "";
  }
}

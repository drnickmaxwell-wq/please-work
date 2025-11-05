import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BRAND_DIR = path.join(process.cwd(), "public", "brand");
const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=60",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
} as const;

function jsonError(status: number, message: string) {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: BASE_HEADERS,
  });
}

function isValidName(name: string) {
  if (!name.endsWith(".json")) {
    return false;
  }
  if (name.includes("..") || path.isAbsolute(name) || name.includes("/") || name.includes("\\")) {
    return false;
  }
  return true;
}

export async function GET(_: Request, context: { params: { name?: string } }) {
  const name = context.params?.name;
  if (!name || typeof name !== "string" || !isValidName(name)) {
    return jsonError(400, "invalid manifest name");
  }

  const manifestPath = path.join(BRAND_DIR, name);

  try {
    const fileContents = await fs.readFile(manifestPath, "utf8");
    const parsed = JSON.parse(fileContents);
    return new NextResponse(JSON.stringify(parsed), {
      status: 200,
      headers: BASE_HEADERS,
    });
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return jsonError(404, "not found");
    }
    if (error instanceof SyntaxError) {
      return jsonError(500, "invalid json");
    }
    return jsonError(500, "unable to read manifest");
  }
}

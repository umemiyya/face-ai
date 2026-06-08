import { NextRequest, NextResponse } from "next/server";
import { RealityDefender } from "@realitydefender/realitydefender";
import fs from "fs";
import path from "path";
import os from "os";

export const runtime = "nodejs";

const rd = new RealityDefender({
  apiKey: 'rd_f594ed76e85941b8_2e14eff5bb185348e1b1b7428e11a469',
});

export async function POST(req: NextRequest) {
  let tempPath: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    tempPath = path.join(
      os.tmpdir(),
      `${Date.now()}-${file.name}`
    );

    fs.writeFileSync(tempPath, buffer);

    console.log("Temporary file created:", tempPath);

    const result = await rd.detect({
      filePath: tempPath,
    });

    console.log("Reality Defender Result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Reality Defender Error:", error);

    return NextResponse.json(
      {
        error: "Detection failed",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  } finally {
    if (tempPath && fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch (cleanupError) {
        console.error(
          "Failed to delete temp file:",
          cleanupError
        );
      }
    }
  }
}
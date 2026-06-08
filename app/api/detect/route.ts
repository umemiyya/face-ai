import { NextRequest, NextResponse } from "next/server";
import { RealityDefender } from "@realitydefender/realitydefender";
import fs from "fs";
import path from "path";

const rd = new RealityDefender({
  apiKey: 'rd_f594ed76e85941b8_2e14eff5bb185348e1b1b7428e11a469',
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempPath = path.join(
      process.cwd(),
      "tmp",
      file.name
    );

    fs.mkdirSync(path.dirname(tempPath), {
      recursive: true,
    });

    fs.writeFileSync(tempPath, buffer);

    const result = await rd.detect({
      filePath: tempPath,
    });

    fs.unlinkSync(tempPath);

    console.log("Detection result:", result);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Detection failed" },
      { status: 500 }
    );
  }
}
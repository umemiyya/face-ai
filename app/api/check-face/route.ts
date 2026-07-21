import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mediaType = file.type || "image/jpeg";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType as
                  | "image/jpeg"
                  | "image/png"
                  | "image/webp"
                  | "image/gif",
                data: base64,
              },
            },
            {
              type: "text",
              text: `Lihat gambar ini dan tentukan apakah gambar tersebut memuat wajah manusia yang jelas dan bisa dianalisis (foto orang, selfie, potret, dsb).

Jawab HANYA dalam format JSON tanpa markdown, tanpa backtick, tanpa teks tambahan, dengan struktur persis seperti ini dan jika bukan gambar wajah HANYA tampilkan "Gambar tidak terdeteksi!" tidak ada tambahan informasi lain.:
{"isFace": true atau false, "reason": "Gambar tidak terdeteksi!"}`,
            },
          ],
        },
      ],
    });

    // @ts-ignore
    const textBlock = response.content.find((block) => block.type === "text");
    const rawText = textBlock && "text" in textBlock ? textBlock.text : "";

    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed: { isFace: boolean; reason: string };

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Gagal memvalidasi gambar, silakan coba lagi" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan saat memvalidasi gambar" },
      { status: 500 }
    );
  }
}
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Shield,
  Loader2,
  AlertTriangle,
  CheckCircle,
  RefreshCcw,
} from "lucide-react";

export function DetectCard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSelectFile = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal melakukan analisis");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const score =
    (result?.resultsSummary?.metadata?.finalScore || result?.score || 0) *
    100;

  const status = result?.resultsSummary?.status || result?.status || "TIDAK DIKETAHUI";

  const isAuthentic = status === "AUTHENTIC";

  return (
    <div className="relative min-h-screen overflow-hidden rounded-2xl bg-[#F3E7D3]">
      {/* Motif batik kawung sebagai latar belakang halus */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="kawung-detect"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#6B3226" strokeWidth="1.5">
              <ellipse cx="15" cy="15" rx="12" ry="8" transform="rotate(45 15 15)" />
              <ellipse cx="45" cy="15" rx="12" ry="8" transform="rotate(-45 45 15)" />
              <ellipse cx="15" cy="45" rx="12" ry="8" transform="rotate(-45 15 45)" />
              <ellipse cx="45" cy="45" rx="12" ry="8" transform="rotate(45 45 45)" />
              <circle cx="30" cy="30" r="4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kawung-detect)" />
      </svg>

      {/* Garis prada emas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#C89B3C] via-[#E4C879] to-[#C89B3C]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7A2E2E]/10 px-4 py-2 text-sm font-medium text-[#7A2E2E]">
            <Shield className="h-4 w-4" />
            Deteksi Wajah Palsu Berbasis AI
          </div>

          <h1 className="mt-6 font-serif text-3xl text-[#3A2417]">
            Deteksi Keaslian Wajah
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#6B5A47]">
            Unggah gambar untuk menganalisis apakah foto merupakan gambar asli
            atau hasil manipulasi AI menggunakan teknologi Deteksi Deepfake.
          </p>
        </div>

        {/* Kartu Utama */}
        <div className="rounded-3xl border border-[#C89B3C]/30 bg-[#FBF4E8] p-8 shadow-sm">
          {!preview ? (
            <label htmlFor="file" className="block cursor-pointer">
              <div className="rounded-3xl border-2 border-dashed border-[#C89B3C]/50 p-20 text-center transition-all duration-300 hover:border-[#7A2E2E] hover:bg-[#F3E7D3]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#7A2E2E]/10">
                  <UploadCloud className="h-10 w-10 text-[#7A2E2E]" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#3A2417]">
                  Unggah Gambar
                </h3>

                <p className="mt-2 text-[#6B5A47]">Klik untuk memilih gambar</p>

                <p className="mt-2 text-sm text-[#8A6A3B]">
                  Mendukung JPG, PNG, WEBP
                </p>
              </div>

              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];

                  if (selected) {
                    handleSelectFile(selected);
                  }
                }}
              />
            </label>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Preview */}
              <div>
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#C89B3C]/30 shadow-lg">
                  <Image
                    src={preview}
                    alt="Pratinjau"
                    fill
                    className="object-cover"
                  />
                </div>

                <button
                  onClick={() => {
                    setFile(null);
                    setPreview("");
                    setResult(null);
                    setError("");
                  }}
                  className="mt-4 flex items-center gap-2 text-sm text-[#6B5A47] transition hover:text-[#7A2E2E]"
                >
                  <RefreshCcw size={16} />
                  Ganti Gambar
                </button>
              </div>

              {/* Aksi */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#C89B3C]/40 bg-[#F3E7D3] px-4 py-2">
                  <Shield className="h-4 w-4 text-[#7A2E2E]" />
                  <span className="text-sm font-medium text-[#7A2E2E]">
                    Siap Dianalisis
                  </span>
                </div>

                <h2 className="mt-6 font-serif text-3xl text-[#3A2417]">
                  Analisis Deepfake
                </h2>

                <p className="mt-3 leading-relaxed text-[#6B5A47]">
                  Sistem akan memeriksa pola visual, artefak AI, serta indikasi
                  manipulasi digital untuk menentukan tingkat keaslian gambar.
                </p>

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="mt-8 flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#7A2E2E] font-semibold text-[#F3E7D3] shadow-lg transition-all hover:bg-[#5F2323] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      Mulai Analisis
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-[#7A2E2E]/30 bg-[#7A2E2E]/10 p-4">
            <p className="text-[#7A2E2E]">{error}</p>
          </div>
        )}

        {/* Hasil */}
        {result && (
          <div className="mt-10 rounded-3xl border border-[#C89B3C]/30 bg-[#FBF4E8] p-8 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-serif text-3xl text-[#3A2417]">
                Hasil Analisis
              </h2>

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 font-medium ${
                  isAuthentic
                    ? "bg-[#4B6B3A]/10 text-[#4B6B3A]"
                    : "bg-[#7A2E2E]/10 text-[#7A2E2E]"
                }`}
              >
                {isAuthentic ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertTriangle size={18} />
                )}

                {isAuthentic ? "Gambar Asli" : "Terindikasi Deepfake"}
              </div>
            </div>

            {/* Skor */}
            <div className="mt-8">
              <div className="mb-3 flex justify-between">
                <span className="text-[#6B5A47]">Tingkat Kepalsuan</span>

                <span className="font-bold text-[#3A2417]">
                  {score.toFixed(2)}%
                </span>
              </div>

              <div className="h-4 w-full overflow-hidden rounded-full bg-[#EADFC8]">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isAuthentic
                      ? "bg-gradient-to-r from-[#4B6B3A] to-[#6B8A52]"
                      : "bg-gradient-to-r from-[#7A2E2E] to-[#9C4A3E]"
                  }`}
                  style={{
                    width: `${score}%`,
                  }}
                />
              </div>
            </div>

            {/* Statistik */}
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-[#C89B3C]/30 bg-[#F3E7D3] p-5">
                <p className="text-sm text-[#8A6A3B]">Status</p>

                <p className="mt-2 text-xl font-bold text-[#3A2417]">
                  {isAuthentic ? "Gambar Asli" : "Terindikasi Deepfake"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#C89B3C]/30 bg-[#F3E7D3] p-5">
                <p className="text-sm text-[#8A6A3B]">Skor Deepfake</p>

                <p className="mt-2 text-xl font-bold text-[#3A2417]">
                  {score.toFixed(2)}%
                </p>
              </div>

              <div className="rounded-2xl border border-[#C89B3C]/30 bg-[#F3E7D3] p-5">
                <p className="text-sm text-[#8A6A3B]">Nama File</p>

                <p className="mt-2 truncate text-sm font-medium text-[#3A2417]">
                  {file?.name}
                </p>
              </div>
            </div>

            {/* Ringkasan */}
            <div className="mt-8 rounded-2xl border border-[#C89B3C]/30 bg-[#F3E7D3] p-6">
              <h3 className="mb-3 font-semibold text-[#3A2417]">
                Ringkasan Analisis
              </h3>

              <p className="leading-relaxed text-[#6B5A47]">
                {isAuthentic
                  ? "Gambar tidak menunjukkan indikasi manipulasi berbasis AI yang signifikan. Berdasarkan hasil analisis sistem, gambar ini kemungkinan besar merupakan foto asli."
                  : "Sistem menemukan pola visual yang sering muncul pada gambar hasil generasi AI atau manipulasi digital. Disarankan untuk melakukan verifikasi tambahan sebelum menggunakan gambar ini sebagai sumber informasi penting."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
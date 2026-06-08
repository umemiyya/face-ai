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
    (result?.resultsSummary?.metadata?.finalScore ||
      result?.score ||
      0) * 100;

  const status =
    result?.resultsSummary?.status ||
    result?.status ||
    "UNKNOWN";

  const isAuthentic = status === "AUTHENTIC";

  return (
    <div className="min-h-screen bg-gradient-to-b rounded-2xl from-slate-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Shield className="h-4 w-4" />
            Deepfake Detection AI
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Deteksi Keaslian Wajah
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Unggah gambar untuk menganalisis apakah foto merupakan gambar asli
            atau hasil manipulasi AI menggunakan teknologi Deepfake Detection.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border-slate-200 p-8">
          {!preview ? (
            <label htmlFor="file" className="cursor-pointer block">
              <div className="border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 rounded-3xl p-20 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
                  <UploadCloud className="h-10 w-10 text-blue-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Upload Gambar
                </h3>

                <p className="text-slate-500 mt-2">
                  Klik untuk memilih gambar
                </p>

                <p className="text-sm text-slate-400 mt-2">
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
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Preview */}
              <div>
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                  <Image
                    src={preview}
                    alt="Preview"
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
                  className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
                >
                  <RefreshCcw size={16} />
                  Ganti Gambar
                </button>
              </div>

              {/* Action */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 w-fit">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-700 text-sm font-medium">
                    Siap Dianalisis
                  </span>
                </div>

                <h2 className="mt-6 text-3xl font-bold text-slate-900">
                  Analisis Deepfake
                </h2>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  Sistem akan memeriksa pola visual, artefak AI, serta indikasi
                  manipulasi digital untuk menentukan tingkat keaslian gambar.
                </p>

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="mt-8 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-10 bg-white border border-slate-200 rounded-3xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl font-bold text-slate-900">
                Hasil Analisis
              </h2>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium w-fit ${
                  isAuthentic
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isAuthentic ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertTriangle size={18} />
                )}

                {isAuthentic
                  ? "Gambar Asli"
                  : "Terindikasi Deepfake"}
              </div>
            </div>

            {/* Score */}
            <div className="mt-8">
              <div className="flex justify-between mb-3">
                <span className="text-slate-600">
                  Tingkat Kepalsuan 
                </span>

                <span className="font-bold text-slate-900">
                  {score.toFixed(2)}%
                </span>
              </div>

              <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isAuthentic
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gradient-to-r from-red-500 to-rose-500"
                  }`}
                  style={{
                    width: `${score}%`,
                  }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-sm text-slate-500">Status</p>

                <p className="text-xl font-bold text-slate-900 mt-2">
                  {isAuthentic
                  ? "Gambar Asli"
                  : "Terindikasi Deepfake"}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-sm text-slate-500">
                  Deepfake Score
                </p>

                <p className="text-xl font-bold text-slate-900 mt-2">
                  {score.toFixed(2)}%
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-sm text-slate-500">
                  Nama File
                </p>

                <p className="text-sm font-medium text-slate-900 mt-2 truncate">
                  {file?.name}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">
                Ringkasan Analisis
              </h3>

              <p className="text-slate-600 leading-relaxed">
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
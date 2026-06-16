import Link from "next/link";
import { SignInButton, Show } from "@clerk/nextjs";
import {
  Shield,
  Zap,
  BarChart3,
  Lock,
  ArrowRight,
  Mail,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: "Deteksi Deepfake",
      desc: "Mendeteksi wajah hasil manipulasi AI dan face swap dengan akurasi tinggi.",
    },
    {
      icon: Zap,
      title: "Analisis Cepat",
      desc: "Hasil analisis tersedia dalam hitungan detik.",
    },
    {
      icon: BarChart3,
      title: "Laporan Detail",
      desc: "Confidence score dan hasil analisis yang mudah dipahami.",
    },
    {
      icon: Lock,
      title: "Privasi Aman",
      desc: "Data diproses dengan standar keamanan modern.",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Upload Gambar",
      desc: "Unggah foto yang ingin diperiksa.",
    },
    {
      num: 2,
      title: "AI Menganalisis",
      desc: "Model AI melakukan pemeriksaan mendalam.",
    },
    {
      num: 3,
      title: "Lihat Hasil",
      desc: "Dapatkan hasil deteksi dan confidence score.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-md text-slate-900">
              DeepShield AI
            </span>
          </div>

          <div className="hidden text-sm md:flex gap-8">
            <a
              href="#fitur"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              Fitur
            </a>

            <a
              href="#cara-kerja"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              Cara Kerja
            </a>
          </div>

          <div className="relative flex gap-3">
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded bg-blue-400 text-white text-sm font-semibold"
              >
                Dashboard
              </Link>
            </Show>
            <Show when="signed-out">
              <SignInButton  />
            </Show>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-4xl text-sm mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Teknologi AI Deepfake Detection
            </div>

            <h1 className="mt-8 text-4xl font-bold text-slate-900 leading-tight">
              Deteksi
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Deepfake Secara Akurat
              </span>
            </h1>

            <p className="mt-8 text-base text-slate-600 max-w-3xl mx-auto">
              Lindungi diri dari gambar palsu dan manipulasi digital dengan
              teknologi AI modern yang mampu mengenali konten deepfake secara
              cepat dan akurat.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link
                href="/dashboard"
                className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                Mulai Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#fitur"
                className="h-14 px-8 rounded-2xl border border-slate-300 flex items-center justify-center hover:bg-slate-50"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Fitur Unggulan
            </h2>

            <p className="mt-4 text-slate-600">
              Teknologi deteksi modern untuk mengenali manipulasi digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-3xl p-8 transition"
                >
                  <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
            Cara Kerja
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
              >
                <div className="h-14 w-14 rounded-2xl bg-blue-300 flex items-center justify-center text-white font-bold mb-5">
                  {step.num}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded bg-blue-300 p-12 text-center text-white">
            <h2 className="text-3xl font-bold">
              Siap Mendeteksi Deepfake?
            </h2>

            <p className="mt-5 text-blue-100 text-base">
              Mulai gunakan DeepShield AI dan lindungi diri dari konten palsu.
            </p>

            <Link
              href="/signup"
              className="inline-flex mt-8 px-8 py-4 rounded-2xl bg-white text-blue-300 font-semibold hover:bg-slate-100"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* Gunakan Footer modern yang sudah saya berikan sebelumnya */}
    </main>
  );
}
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
      desc: "Skor keyakinan dan hasil analisis yang mudah dipahami.",
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
      desc: "Dapatkan hasil deteksi dan skor keyakinan.",
    },
  ];

  // Tekstur motif kawung tipis sebagai latar, konsisten dengan halaman SignIn, Dashboard & Admin
  const kawungPattern =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C89B3C' stroke-width='1' opacity='0.35'%3E%3Cellipse cx='20' cy='20' rx='14' ry='9' transform='rotate(45 20 20)'/%3E%3Cellipse cx='60' cy='20' rx='14' ry='9' transform='rotate(-45 60 20)'/%3E%3Cellipse cx='20' cy='60' rx='14' ry='9' transform='rotate(-45 20 60)'/%3E%3Cellipse cx='60' cy='60' rx='14' ry='9' transform='rotate(45 60 60)'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E";

  return (
    <main
      className="min-h-screen bg-[#FBF4E8]"
      style={{
        backgroundImage: `url("${kawungPattern}")`,
        backgroundRepeat: "repeat",
      }}
    >
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FBF4E8]/80 backdrop-blur-xl border-b border-[#C89B3C]/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-md font-serif text-[#7A2E2E]">
              DeepShield AI
            </span>
          </div>

          <div className="hidden text-sm md:flex gap-8">
            <a
              href="#fitur"
              className="text-[#5B4636]/80 hover:text-[#7A2E2E] transition"
            >
              Fitur
            </a>

            <a
              href="#cara-kerja"
              className="text-[#5B4636]/80 hover:text-[#7A2E2E] transition"
            >
              Cara Kerja
            </a>
          </div>

          <div className="relative flex gap-3">
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded bg-[#7A2E2E] hover:bg-[#5f2424] text-white text-sm font-semibold"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3E7D3] via-[#FBF4E8] to-[#FBF4E8]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-4xl text-sm mx-auto text-center">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3E7D3] text-[#7A2E2E] border border-[#C89B3C]/40">
              <span className="h-2 w-2 rounded-full bg-[#7A2E2E] animate-pulse" />
              Teknologi AI Deteksi Wajah Palsu
            </div> */}

            <h1 className="mt-8 text-4xl font-bold font-serif text-slate-900 leading-tight">
              Deteksi
              <span className="block bg-gradient-to-r from-[#7A2E2E] to-[#C89B3C] bg-clip-text text-transparent">
                Deepfake Secara Akurat
              </span>
            </h1>

            <p className="mt-8 text-base text-[#5B4636]/80 max-w-3xl mx-auto">
              Lindungi diri dari gambar palsu dan manipulasi digital dengan
              teknologi AI modern yang mampu mengenali konten deepfake secara
              cepat dan akurat.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link
                href="/dashboard"
                className="h-14 px-8 rounded-2xl bg-[#7A2E2E] hover:bg-[#5f2424] text-white flex items-center justify-center gap-2"
              >
                Mulai Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#fitur"
                className="h-14 px-8 rounded-2xl border border-[#C89B3C]/50 flex items-center justify-center hover:bg-[#F3E7D3]"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" className="py-24 bg-[#F3E7D3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-slate-900">
              Fitur Unggulan
            </h2>

            <p className="mt-4 text-[#5B4636]/80">
              Teknologi deteksi modern untuk mengenali manipulasi digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="bg-[#FBF4E8] border border-[#C89B3C]/40 rounded-3xl p-8 transition"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[#F3E7D3] flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-[#7A2E2E]" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-[#5B4636]/80 text-sm">
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
          <h2 className="text-3xl font-bold font-serif text-center text-slate-900 mb-16">
            Cara Kerja
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#FBF4E8] border border-[#C89B3C]/40 rounded-3xl p-8 shadow-sm"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#7A2E2E] flex items-center justify-center text-white font-bold mb-5">
                  {step.num}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-[#5B4636]/80 text-sm">
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
          <div className="rounded bg-[#7A2E2E] p-12 text-center text-white">
            <h2 className="text-3xl font-bold font-serif">
              Siap Mendeteksi Deepfake?
            </h2>

            <p className="mt-5 text-[#F3E7D3] text-base">
              Mulai gunakan DeepShield AI dan lindungi diri dari konten palsu.
            </p>

            <Link
              href="/signup"
              className="inline-flex mt-8 px-8 py-4 rounded-2xl bg-[#FBF4E8] text-[#7A2E2E] font-semibold hover:bg-[#F3E7D3]"
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
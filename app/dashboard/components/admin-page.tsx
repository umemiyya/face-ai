// app/admin/page.tsx

import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Footer } from "@/app/_template/components/footer";

export default async function AdminPage() {
  const asliDir = path.join(
    process.cwd(),
    "public",
    "asli"
  );

  const deepfakeDir = path.join(
    process.cwd(),
    "public",
    "deepfake"
  );

  const asliImages = fs
    .readdirSync(asliDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    .map((file) => ({
      src: `/asli/${file}`,
      filename: file,
      label: "Asli",
    }));

  const deepfakeImages = fs
    .readdirSync(deepfakeDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    .map((file) => ({
      src: `/deepfake/${file}`,
      filename: file,
      label: "Deepfake",
    }));

  const images = [
    ...asliImages,
    ...deepfakeImages,
  ];

  // Tekstur motif kawung tipis sebagai latar, senada dengan halaman SignIn
  const kawungPattern =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C89B3C' stroke-width='1' opacity='0.35'%3E%3Cellipse cx='20' cy='20' rx='14' ry='9' transform='rotate(45 20 20)'/%3E%3Cellipse cx='60' cy='20' rx='14' ry='9' transform='rotate(-45 60 20)'/%3E%3Cellipse cx='20' cy='60' rx='14' ry='9' transform='rotate(-45 20 60)'/%3E%3Cellipse cx='60' cy='60' rx='14' ry='9' transform='rotate(45 60 60)'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E";

  return (
    <>
      <main className="max-w-300 w-full mx-auto">
        <div
          className="min-h-screen bg-[#FBF4E8]"
          style={{
            backgroundImage: `url("${kawungPattern}")`,
            backgroundRepeat: "repeat",
          }}
        >
          <div>
            <header className="flex items-center justify-between w-full h-16 gap-4">
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-medium text-[0.8125rem] rounded-full px-3 py-2 text-[#7A2E2E] hover:bg-[#F3E7D3]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Kembali ke Beranda
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-8",
                    },
                  }}
                />
              </div>
            </header>
          </div>

          <div className="mx-auto max-w-7xl p-8">

            {/* HEADER */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-serif text-[#7A2E2E]">
                Manajemen Dataset
              </h1>

              <p className="mt-2 text-[#5B4636]/80">
                Kelola dan pantau dataset gambar
                untuk pelatihan model
              </p>
            </div>

            {/* STATS */}
            <div className="mb-8 grid gap-6 md:grid-cols-3">

              <div className="rounded-md border border-[#C89B3C]/40 bg-[#FBF4E8] p-8">
                <h2 className="text-center text-5xl font-bold font-serif text-[#7A2E2E]">
                  {images.length}
                </h2>

                <p className="mt-3 text-center text-[#5B4636]/80">
                  Total Gambar
                </p>
              </div>

              <div className="rounded-md border border-[#C89B3C]/40 bg-[#FBF4E8] p-8">
                <h2 className="text-center text-5xl font-bold font-serif text-[#4B6B3A]">
                  {asliImages.length}
                </h2>

                <p className="mt-3 text-center text-[#5B4636]/80">
                  Wajah Asli
                </p>
              </div>

              <div className="rounded-md border border-[#C89B3C]/40 bg-[#FBF4E8] p-8">
                <h2 className="text-center text-5xl font-bold font-serif text-[#7A2E2E]">
                  {deepfakeImages.length}
                </h2>

                <p className="mt-3 text-center text-[#5B4636]/80">
                  Deepfake
                </p>
              </div>

            </div>

            {/* DATASET */}
            <div className="rounded-md border border-[#C89B3C]/40 bg-[#FBF4E8] p-8">

              <h2 className="text-3xl font-bold font-serif text-[#7A2E2E]">
                Gambar Dataset
              </h2>

              <p className="mt-1 text-[#5B4636]/80">
                {images.length} gambar dalam database
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">

                {images.map((image) => (
                  <div key={image.src}>

                    <div className="overflow-hidden rounded-2xl border border-[#C89B3C]/40">
                      <Image
                        src={image.src}
                        alt={image.filename}
                        width={400}
                        height={400}
                        className="aspect-square w-full object-cover"
                      />
                    </div>

                    <div className="mt-2">

                      <p
                        className={`text-sm font-medium ${
                          image.label === "Asli"
                            ? "text-[#4B6B3A]"
                            : "text-[#7A2E2E]"
                        }`}
                      >
                        {image.label === "Asli"
                          ? "✓ Asli"
                          : "⚠ Deepfake"}
                      </p>

                      <p className="truncate text-sm text-[#5B4636]/70">
                        {image.filename}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>
      </main>
      {/* <LearnMore cards={DASHBOARD_CARDS} /> */}
      <Footer />
    </>
  );
}
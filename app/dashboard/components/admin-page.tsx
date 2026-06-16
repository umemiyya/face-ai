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

  return (
        <>
      <main className="max-w-300 w-full mx-auto">

    <div className="min-h-screen bg-slate-50">
        <div>
            <header className="flex items-center justify-between w-full h-16 gap-4">
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-medium text-[0.8125rem] rounded-full px-3 py-2 hover:bg-gray-100"
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
                  Back to Home
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
          <h1 className="text-3xl font-bold">
            Dataset Management
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola dan pantau dataset gambar
            untuk pelatihan model
          </p>
        </div>

        {/* STATS */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-md border bg-white p-8 ">
            <h2 className="text-center text-5xl font-bold">
              {images.length}
            </h2>

            <p className="mt-3 text-center text-slate-500">
              Total Gambar
            </p>
          </div>

          <div className="rounded-md border bg-white p-8 ">
            <h2 className="text-center text-5xl font-bold text-green-600">
              {asliImages.length}
            </h2>

            <p className="mt-3 text-center text-slate-500">
              Wajah Asli
            </p>
          </div>

          <div className="rounded-md border bg-white p-8 ">
            <h2 className="text-center text-5xl font-bold text-red-500">
              {deepfakeImages.length}
            </h2>

            <p className="mt-3 text-center text-slate-500">
              Deepfake
            </p>
          </div>

        </div>

        {/* DATASET */}
        <div className="rounded-md border bg-white p-8 ">

          <h2 className="text-3xl font-bold">
            Dataset Images
          </h2>

          <p className="mt-1 text-slate-500">
            {images.length} gambar dalam database
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">

            {images.map((image) => (
              <div key={image.src}>

                <div className="overflow-hidden rounded-2xl border">
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
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {image.label === "Asli"
                      ? "✓ Asli"
                      : "⚠ Deepfake"}
                  </p>

                  <p className="truncate text-sm text-slate-500">
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
// app/admin/dataset/page.tsx

import Image from "next/image";
import { getDatasetImages } from "@/lib/dataset";

export default async function DatasetPage() {
  const images = getDatasetImages();

  const asliCount = images.filter(
    (img) => img.label === "Asli"
  ).length;

  const deepfakeCount = images.filter(
    (img) => img.label === "Deepfake"
  ).length;

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Dataset Management
        </h1>

        <p className="mt-2 text-slate-500">
          Kelola dan pantau dataset gambar
          untuk pelatihan model.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-5xl font-bold">
              {images.length}
            </h2>

            <p className="mt-3 text-slate-500">
              Total Gambar
            </p>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-green-600">
              {asliCount}
            </h2>

            <p className="mt-3 text-slate-500">
              Wajah Asli
            </p>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-red-500">
              {deepfakeCount}
            </h2>

            <p className="mt-3 text-slate-500">
              Deepfake
            </p>
          </div>
        </div>

      </div>

      {/* Dataset */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">

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

              <div className="mt-3">

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

                <p className="truncate text-sm text-slate-600">
                  {image.filename}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
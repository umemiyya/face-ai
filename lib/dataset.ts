import fs from "fs";
import path from "path";

export type DatasetImage = {
  filename: string;
  src: string;
  label: "Asli" | "Deepfake";
};

export function getDatasetImages(): DatasetImage[] {
  const asliDir = path.join(process.cwd(), "public", "asli");
  const deepfakeDir = path.join(process.cwd(), "public", "deepfake");

  const asliImages = fs
    .readdirSync(asliDir)
    .map((file) => ({
      filename: file,
      src: `/asli/${file}`,
      label: "Asli" as const,
    }));

  const deepfakeImages = fs
    .readdirSync(deepfakeDir)
    .map((file) => ({
      filename: file,
      src: `/deepfake/${file}`,
      label: "Deepfake" as const,
    }));

  return [...asliImages, ...deepfakeImages];
}
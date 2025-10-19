import { createOGImage } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Lab | Andival-Sei";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG изображение для страницы Lab
 * Показывает экспериментальную лабораторию с анимациями
 */
export default async function Image() {
  return createOGImage({
    title: "Lab",
    subtitle: "Экспериментальная лаборатория",
    accent: "Анимации · Canvas · WebGL",
    colorScheme: "orange",
  });
}

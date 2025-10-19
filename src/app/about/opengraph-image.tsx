import { createOGImage } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Обо мне | Andival-Sei";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG изображение для страницы "Обо мне"
 * Показывает личную информацию и навыки
 */
export default async function Image() {
  return createOGImage({
    title: "Обо мне",
    subtitle: "Frontend разработчик из Самары",
    accent: "React · TypeScript · Next.js",
    colorScheme: "blue",
  });
}

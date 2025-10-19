import { createOGImage } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Andival-Sei Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG изображение для главной страницы
 * Показывает основную информацию о портфолио
 */
export default async function Image() {
  return createOGImage({
    title: "Andival-Sei",
    subtitle: "Frontend разработчик",
    accent: "React · Next.js · TypeScript",
    colorScheme: "default",
  });
}

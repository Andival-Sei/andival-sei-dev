import { createOGImage } from "@/lib/og-template";
import { env } from "@/lib/env";

export const runtime = "edge";
export const alt = "Контакты | Andival-Sei";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG изображение для страницы контактов
 * Показывает способы связи и контактную информацию
 */
export default async function Image() {
  return createOGImage({
    title: "Контакты",
    subtitle: "Свяжитесь со мной",
    accent: env.email || "contact@andival-sei.dev",
    colorScheme: "green",
  });
}

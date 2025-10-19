import { createOGImage } from "@/lib/og-template";
import { projects } from "@/data/projects";

export const runtime = "edge";
export const alt = "Проекты | Andival-Sei";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG изображение для страницы проектов
 * Показывает количество проектов и основную информацию
 */
export default async function Image() {
  const projectsCount = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return createOGImage({
    title: "Проекты",
    subtitle: "Портфолио работ и разработок",
    accent: `${projectsCount} проектов · ${featuredCount} избранных`,
    colorScheme: "purple",
  });
}

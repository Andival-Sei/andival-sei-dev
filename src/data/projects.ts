/**
 * Данные о проектах для портфолио
 * Содержит информацию о всех проектах с возможностью фильтрации избранных
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  media: string; // Путь к изображению, видео или GIF
  mediaType?: "image" | "video" | "gif"; // Тип медиа (автоопределяется если не указан)
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

/**
 * Автоматически определяет тип медиа по расширению файла
 * @param mediaPath - путь к медиа файлу
 * @returns тип медиа
 */
export const getMediaType = (mediaPath: string): "image" | "video" | "gif" => {
  const extension = mediaPath.split(".").pop()?.toLowerCase();

  if (extension === "mp4" || extension === "webm" || extension === "ogg") {
    return "video";
  }

  if (extension === "gif") {
    return "gif";
  }

  return "image";
};

export const projects: Project[] = [
  {
    id: "stellar-burgers",
    title: "Stellar Burgers",
    description: "Космическая бургерная",
    longDescription:
      "SPA приложение для создания космических бургеров с корзиной, авторизацией и real-time обновлениями заказов. Проект включает роутинг, Redux для управления состоянием и полное покрытие тестами.",
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "Jest",
      "Cypress",
      "Webpack",
    ],
    media: "/videos/projects/stellar-burgers.mp4", // Можно заменить на .gif или .png
    liveUrl: "https://stellar-burgers-gold.vercel.app/",
    githubUrl: "https://github.com/Andival-Sei/stellar-burgers",
    featured: true,
  },
  {
    id: "web-larek",
    title: "Web Larek",
    description: "Фронтенд интернет-магазина",
    longDescription:
      "Фронтенд проекта интернет-магазина с интеграцией API, корзиной, модальными окнами и формами заказа. Реализована архитектура MVP с четким разделением слоев.",
    technologies: ["TypeScript", "Webpack", "REST API", "OOP"],
    media: "/videos/projects/web-larek.mp4", // Можно заменить на .gif или .png
    liveUrl: "https://web-larek-frontend-xi.vercel.app/",
    githubUrl: "https://github.com/Andival-Sei/web-larek-frontend",
    featured: true,
  },
  {
    id: "mods-guide",
    title: "Mods Guide",
    description: "Руководство по моддингу Skyrim",
    longDescription:
      "Интерактивное руководство по установке модов для Skyrim. Современный интерфейс с пошаговыми инструкциями.",
    technologies: ["React", "TypeScript", "Vite", "React Router"],
    media: "/videos/projects/mods-guide.mp4", // Можно заменить на .gif или .png
    liveUrl: "https://mods-guide.vercel.app/",
    githubUrl: "https://github.com/Andival-Sei/mods-guide",
    featured: true,
  },
];

/**
 * Получить только избранные проекты
 * @returns Массив избранных проектов
 */
export const getFeaturedProjects = () => projects.filter((p) => p.featured);

/**
 * Получить проект по ID
 * @param id - ID проекта
 * @returns Проект или undefined
 */
export const getProjectById = (id: string) => projects.find((p) => p.id === id);

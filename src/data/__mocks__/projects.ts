import type { Project } from "../projects";

/**
 * Mock данные проектов для тестирования
 * Включает различные типы проектов, медиа и технологии
 */

export const mockProjects: Project[] = [
  {
    id: "test-project-1",
    title: "Test Project Video",
    description: "Тестовый проект с видео",
    longDescription:
      "Полное описание тестового проекта с видео файлом. Этот проект демонстрирует работу с видео превью.",
    technologies: ["React", "TypeScript", "Next.js"],
    media: "/videos/test-project.mp4",
    mediaType: "video",
    liveUrl: "https://test-project.example.com",
    githubUrl: "https://github.com/test/test-project",
    featured: true,
    date: "2024-10-01",
    type: "work",
  },
  {
    id: "test-project-2",
    title: "Test Project Image",
    description: "Тестовый проект с изображением",
    longDescription:
      "Полное описание тестового проекта с изображением. Проект использует обычное изображение как превью.",
    technologies: ["Vue", "JavaScript", "Webpack", "Jest", "Cypress"],
    media: "/images/test-project.png",
    mediaType: "image",
    liveUrl: "https://test-project-2.example.com",
    githubUrl: "https://github.com/test/test-project-2",
    featured: true,
    date: "2024-09-15",
    type: "educational",
  },
  {
    id: "test-project-3",
    title: "Test Pet Project",
    description: "Тестовый pet-проект с минимальными технологиями",
    longDescription:
      "Pet-проект для тестирования отображения с двумя технологиями.",
    technologies: ["HTML", "CSS"],
    media: "/images/test-pet.jpg",
    liveUrl: "https://test-pet.example.com",
    githubUrl: "https://github.com/test/test-pet",
    featured: true,
    date: "2024-08-20",
    type: "pet",
  },
];

/**
 * Получить mock проект по ID
 */
export const getMockProjectById = (id: string) =>
  mockProjects.find((p) => p.id === id);

/**
 * Получить featured mock проекты
 */
export const getMockFeaturedProjects = () =>
  mockProjects.filter((p) => p.featured);

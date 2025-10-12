/**
 * Данные для страницы "Обо мне"
 * Содержит информацию о профиле, timeline и навыках
 */

import {
  Briefcase,
  GraduationCap,
  Trophy,
  Code2,
  Gamepad2,
  Wrench,
  Mountain,
  Tv,
  Coffee,
} from "lucide-react";

/**
 * Интерфейс для события в timeline
 */
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "achievement";
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Интерфейс для навыка
 */
export interface Skill {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "tools" | "soft";
}

/**
 * Интерфейс для интереса/хобби
 */
export interface Interest {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

/**
 * Основная информация о себе
 */
export const personalInfo = {
  name: "Andival-Sei",
  role: "Frontend разработчик",
  bio: "Увлеченный разработчик интерфейсов с фокусом на создание современных и отзывчивых веб-приложений. Специализируюсь на React, Next.js и TypeScript, постоянно изучаю новые технологии и лучшие практики.",
  location: "Самара",
  email: "contact@andival-sei.dev",
  availability: "Открыт для новых проектов",
  profileImage: "/images/about/myphoto.jpg",
};

/**
 * Timeline событий (карьера и образование)
 */
export const timelineEvents: TimelineEvent[] = [
  {
    id: "work-0",
    year: "2018-2022",
    title: "Оператор колл-центра",
    organization: "Различные компании",
    description:
      "Работа с клиентами в колл-центрах. Получение опыта в коммуникации, многозадачности и работе под давлением.",
    type: "work",
    icon: Briefcase,
  },
  {
    id: "work-1",
    year: "2022",
    title: "Специалист поддержки",
    organization: "Авито",
    description:
      "Работа в службе поддержки пользователей по всем каналам коммуникации: чаты, email-переписка и телефонные звонки. Решение проблем клиентов, консультирование по функционалу платформы.",
    type: "work",
    icon: Briefcase,
  },
  {
    id: "work-2",
    year: "2024",
    title: "Модератор",
    organization: "Авито",
    description:
      "Модерация контента и объявлений на платформе. Проверка соответствия публикаций правилам сервиса, работа с нарушениями, обеспечение качества размещаемого контента.",
    type: "work",
    icon: Briefcase,
  },
  {
    id: "edu-1",
    year: "2024",
    title: "Курс Frontend разработки",
    organization: "Яндекс Практикум",
    description:
      "Интенсивное обучение современной веб-разработке: React, TypeScript, Redux, тестирование, работа с API и деплой приложений.",
    type: "education",
    icon: GraduationCap,
  },
  {
    id: "achievement-1",
    year: "2025",
    title: "Портфолио проектов",
    organization: "Личные достижения",
    description:
      "Создал несколько полноценных проектов с использованием современного стека: SPA приложения, интернет-магазин, интерактивные гайды.",
    type: "achievement",
    icon: Trophy,
  },
];

/**
 * Навыки и технологии
 */
export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 4, category: "frontend" },
  { name: "Next.js", level: 4, category: "frontend" },
  { name: "TypeScript", level: 4, category: "frontend" },
  { name: "JavaScript", level: 5, category: "frontend" },
  { name: "HTML/CSS", level: 5, category: "frontend" },
  { name: "Tailwind CSS", level: 4, category: "frontend" },
  { name: "Redux", level: 3, category: "frontend" },

  // Tools
  { name: "Git", level: 4, category: "tools" },
  { name: "Webpack", level: 3, category: "tools" },
  { name: "Vite", level: 4, category: "tools" },
  { name: "Jest/Vitest", level: 3, category: "tools" },
  { name: "Cypress", level: 3, category: "tools" },

  // Backend (базовые знания)
  { name: "Node.js", level: 3, category: "backend" },
  { name: "REST API", level: 4, category: "backend" },

  // Soft skills
  { name: "Самообучение", level: 5, category: "soft" },
  { name: "Решение проблем", level: 4, category: "soft" },
  { name: "Командная работа", level: 4, category: "soft" },
];

/**
 * Интересы и хобби
 */
export const interests: Interest[] = [
  {
    name: "Программирование",
    icon: Code2,
    description: "Изучение новых технологий и фреймворков",
  },
  {
    name: "Видеоигры",
    icon: Gamepad2,
    description: "Skyrim, RimWorld, World of Warcraft и другие",
  },
  {
    name: "Моддинг",
    icon: Wrench,
    description: "Создание сборок модов и перевод модификаций для игр",
  },
  {
    name: "Природа",
    icon: Mountain,
    description: "Посещение природных мест: горы, пещеры, походы",
  },
  {
    name: "Сериалы",
    icon: Tv,
    description: "Дом дракона, Сверхъестественное и другие",
  },
  {
    name: "Кофе",
    icon: Coffee,
    description: "Без него никуда :)",
  },
];

/**
 * Получить навыки по категории
 */
export const getSkillsByCategory = (category: Skill["category"]) => {
  return skills.filter((skill) => skill.category === category);
};

/**
 * Получить события timeline по типу
 */
export const getTimelineByType = (type: TimelineEvent["type"]) => {
  return timelineEvents.filter((event) => event.type === type);
};

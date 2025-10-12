import { FaReact, FaCss3Alt, FaHtml5, FaSass, FaJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiVite,
  SiVercel,
  SiFigma,
} from "react-icons/si";
import { SiVitest } from "@icons-pack/react-simple-icons";

// Кастомная иконка Playwright (основана на официальном дизайне)
const PlaywrightIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" fill="transparent" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.3333 2L7.66667 9.66667L10.3333 12.3333L18 4.66667L15.3333 2ZM7.66667 10.3333L4.66667 13.3333L7.33333 16L10.3333 13L7.66667 10.3333ZM13 10.3333L16 7.33333L18.6667 10L15.6667 13L13 10.3333ZM10.3333 13.6667L7.66667 16.3333L10.3333 19L13 16.3333L10.3333 13.6667ZM13.6667 13.6667L16.3333 16.3333L19 13.6667L16.3333 11L13.6667 13.6667ZM13.6667 16.3333L16.3333 19L19 16.3333L16.3333 13.6667L13.6667 16.3333ZM4 16.3333L6.66667 19L9.33333 16.3333L6.66667 13.6667L4 16.3333ZM9.66667 19.6667L12.3333 22L15 19.3333L12.3333 16.6667L9.66667 19.6667Z"
      fill="currentColor"
    />
  </svg>
);

export interface Technology {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export const technologies: Technology[] = [
  // Ряд 1: Базовые веб-технологии (5 блоков)
  {
    id: "html",
    name: "HTML",
    icon: FaHtml5,
    color: "#E34F26",
    description: "Язык разметки для создания веб-страниц",
  },
  {
    id: "css",
    name: "CSS",
    icon: FaCss3Alt,
    color: "#1572B6",
    description: "Язык стилей для оформления веб-страниц",
  },
  {
    id: "scss",
    name: "SCSS",
    icon: FaSass,
    color: "#CC6699",
    description: "Препроцессор CSS с расширенными возможностями",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: FaJs,
    color: "#F7DF1E",
    description: "Язык программирования для веба",
  },
  {
    id: "playwright",
    name: "Playwright",
    icon: PlaywrightIcon,
    color: "#2EAD33",
    description: "Библиотека для автоматизации браузеров",
  },
  // Ряд 2: Инструменты и сервисы (4 блока)
  {
    id: "vite",
    name: "Vite",
    icon: SiVite,
    color: "#646CFF",
    description: "Быстрый инструмент для сборки проектов",
  },
  {
    id: "git",
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    description: "Система контроля версий",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: SiVercel,
    color: "#000000",
    description: "Платформа для деплоя",
  },
  {
    id: "figma",
    name: "Figma",
    icon: SiFigma,
    color: "#F24E1E",
    description: "Инструмент для дизайна",
  },
  // Ряд 3: React экосистема (5 блоков)
  {
    id: "react",
    name: "React",
    icon: FaReact,
    color: "#61DAFB",
    description: "Библиотека для создания пользовательских интерфейсов",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    description: "React фреймворк для production",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    description: "Типизированный JavaScript",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first CSS фреймворк",
  },
  {
    id: "vitest",
    name: "Vitest",
    icon: SiVitest,
    color: "#729B1B",
    description: "Фреймворк для тестирования на Vite",
  },
];

// Создаем сетку с пустыми ячейками для эффекта как на vite.dev
export const createTechGrid = (
  technologies: Technology[],
  gridSize: number = 15
) => {
  const grid: (Technology | null)[] = [];
  const totalCells = gridSize * 4; // 4 ряда

  // Заполняем сетку технологиями
  technologies.forEach((tech, index) => {
    grid[index] = tech;
  });

  // Заполняем остальные ячейки null
  for (let i = technologies.length; i < totalCells; i++) {
    grid[i] = null;
  }

  return grid;
};

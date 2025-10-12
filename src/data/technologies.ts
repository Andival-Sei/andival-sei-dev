import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiShadcnui,
  SiVercel,
  SiFigma,
} from "react-icons/si";

export interface Technology {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export const technologies: Technology[] = [
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
    id: "shadcn",
    name: "shadcn/ui",
    icon: SiShadcnui,
    color: "#000000",
    description: "Компоненты для React",
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

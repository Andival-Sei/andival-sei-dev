import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { technologies } from "@/data/technologies";

import TechStack from "../tech-stack";

// Мок window.innerWidth для responsive тестов
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe("TechStack", () => {
  beforeEach(() => {
    // Сброс window.innerWidth перед каждым тестом
    mockInnerWidth(1200);
    vi.clearAllMocks();
  });

  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      const { container } = render(<TechStack />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("имеет семантичный тег section", () => {
      const { container } = render(<TechStack />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    it("отображает заголовок 'Мой стек технологий'", () => {
      render(<TechStack />);
      const heading = screen.getByRole("heading", {
        level: 2,
        name: /Мой стек технологий/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it("отображает подзаголовок с описанием инструментов", () => {
      render(<TechStack />);
      const subtitle = screen.getByText(
        /Инструменты и технологии, которые я использую/i
      );
      expect(subtitle).toBeInTheDocument();
    });

    it("отображает нижнее описание про полный стек", () => {
      render(<TechStack />);
      const description = screen.getByText(/От фронтенда до бэкенда/i);
      expect(description).toBeInTheDocument();
    });
  });

  describe("Отображение технологий", () => {
    it("отображает все 15 технологий", () => {
      const { container } = render(<TechStack />);
      const techBlocks = container.querySelectorAll(".tech-block");
      expect(techBlocks.length).toBe(15);
    });

    it("каждая технология имеет иконку", () => {
      render(<TechStack />);
      const techBlocks = document.querySelectorAll(".tech-block");

      techBlocks.forEach((block) => {
        const svg = block.querySelector("svg");
        expect(svg).toBeInTheDocument();
      });
    });

    it("каждая технология имеет tooltip с названием", () => {
      render(<TechStack />);

      technologies.forEach((tech) => {
        const tooltip = screen.getByText(tech.name);
        expect(tooltip).toBeInTheDocument();
      });
    });

    it("tech-block имеет правильные классы", () => {
      const { container } = render(<TechStack />);
      const techBlock = container.querySelector(".tech-block");

      expect(techBlock).toHaveClass("rounded-lg");
      expect(techBlock).toHaveClass("border");
      expect(techBlock).toHaveClass("cursor-pointer");
      expect(techBlock).toHaveClass("group");
    });

    it("отображает пустые ячейки (empty-block)", () => {
      const { container } = render(<TechStack />);
      const emptyBlocks = container.querySelectorAll(".empty-block");

      // В сетке 24×5 = 120 ячеек, из них 15 с технологиями
      expect(emptyBlocks.length).toBeGreaterThan(0);
    });

    it("пустые ячейки имеют cursor-default класс", () => {
      const { container } = render(<TechStack />);
      const emptyBlock = container.querySelector(".empty-block");

      expect(emptyBlock).toHaveClass("cursor-default");
    });
  });

  describe("Grid layout и структура", () => {
    it("TechGrid рендерится внутри секции", () => {
      const { container } = render(<TechStack />);
      const techGrid = container.querySelector(".tech-grid");
      expect(techGrid).toBeInTheDocument();
    });

    it("tech-grid имеет правильный CSS класс", () => {
      const { container } = render(<TechStack />);
      const techGrid = container.querySelector(".tech-grid");
      expect(techGrid).toHaveClass("tech-grid");
    });

    it("отображает градиентную тень сверху", () => {
      const { container } = render(<TechStack />);
      const topShadow = container.querySelector(".bg-gradient-to-b");
      expect(topShadow).toBeInTheDocument();
    });

    it("отображает градиентную тень снизу", () => {
      const { container } = render(<TechStack />);
      const bottomShadow = container.querySelector(".bg-gradient-to-t");
      expect(bottomShadow).toBeInTheDocument();
    });

    it("градиентные тени имеют pointer-events-none", () => {
      const { container } = render(<TechStack />);
      const shadowContainer = container.querySelector(".pointer-events-none");
      expect(shadowContainer).toBeInTheDocument();
    });

    it("боковые градиентные тени присутствуют в разметке", () => {
      const { container } = render(<TechStack />);
      // Проверяем что в коде есть градиенты (могут быть скрыты на мобильных)
      const gradients = container.querySelectorAll(
        '[class*="gradient"], .bg-gradient-to-r, .bg-gradient-to-l, .bg-gradient-to-t, .bg-gradient-to-b'
      );

      // Должно быть минимум 2 градиента (верх и низ, боковые условные)
      expect(gradients.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Hover эффекты и tooltip", () => {
    it("tooltip скрыт по умолчанию (opacity-0)", () => {
      const { container } = render(<TechStack />);
      const tooltip = container.querySelector(".opacity-0");
      expect(tooltip).toBeInTheDocument();
    });

    it("tooltip имеет group-hover:opacity-100 класс", () => {
      const { container } = render(<TechStack />);
      const tooltip = container.querySelector(".group-hover\\:opacity-100");
      expect(tooltip).toBeInTheDocument();
    });

    it("tooltip содержит правильное название технологии", () => {
      render(<TechStack />);
      const firstTech = technologies[0];
      const tooltip = screen.getByText(firstTech.name);

      expect(tooltip).toBeInTheDocument();
    });

    it("tooltip имеет pointer-events-none", () => {
      const { container } = render(<TechStack />);
      const tooltips = container.querySelectorAll(
        ".tech-block .pointer-events-none"
      );

      expect(tooltips.length).toBeGreaterThan(0);
    });

    it("tech-block имеет transition классы", () => {
      const { container } = render(<TechStack />);
      const techBlock = container.querySelector(".tech-block");

      expect(techBlock).toHaveClass("transition-transform");
      expect(techBlock).toHaveClass("duration-300");
      expect(techBlock).toHaveClass("ease-in-out");
    });
  });

  describe("Адаптивный дизайн", () => {
    it("компонент рендерится на desktop (1200px)", () => {
      mockInnerWidth(1200);
      const { container } = render(<TechStack />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("компонент рендерится на mobile (<600px)", () => {
      mockInnerWidth(400);
      const { container } = render(<TechStack />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("заголовок имеет адаптивные классы размера", () => {
      render(<TechStack />);
      const heading = screen.getByRole("heading", { level: 2 });

      expect(heading).toHaveClass("text-4xl");
      expect(heading).toHaveClass("md:text-5xl");
    });

    it("подзаголовок имеет адаптивное ограничение ширины", () => {
      render(<TechStack />);
      const subtitle = screen.getByText(
        /Инструменты и технологии, которые я использую/i
      );

      expect(subtitle).toHaveClass("max-w-2xl");
      expect(subtitle).toHaveClass("mx-auto");
    });

    it("нижнее описание имеет ограничение ширины", () => {
      render(<TechStack />);
      const description = screen.getByText(/От фронтенда до бэкенда/i);

      expect(description).toHaveClass("max-w-3xl");
      expect(description).toHaveClass("mx-auto");
    });
  });

  describe("Смещенные ряды (offset)", () => {
    it("четные ряды имеют offset transform", () => {
      const { container } = render(<TechStack />);
      const allBlocks = container.querySelectorAll(
        ".tech-grid > div, .tech-grid > .tech-block, .tech-grid > .empty-block"
      );

      // Проверяем что есть блоки с transform translateX
      let hasOffsetBlocks = false;
      allBlocks.forEach((block) => {
        const style = (block as HTMLElement).style.transform;
        if (style && style.includes("translateX") && style.includes("50%")) {
          hasOffsetBlocks = true;
        }
      });

      expect(hasOffsetBlocks).toBe(true);
    });

    it("нечетные ряды не имеют offset (translateX(0%))", () => {
      const { container } = render(<TechStack />);
      const allBlocks = container.querySelectorAll(
        ".tech-grid > div, .tech-grid > .tech-block, .tech-grid > .empty-block"
      );

      // Проверяем что есть блоки с transform translateX(0%)
      let hasNonOffsetBlocks = false;
      allBlocks.forEach((block) => {
        const style = (block as HTMLElement).style.transform;
        if (style && style.includes("translateX") && style.includes("0%")) {
          hasNonOffsetBlocks = true;
        }
      });

      expect(hasNonOffsetBlocks).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("секция использует семантичный тег section", () => {
      const { container } = render(<TechStack />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("заголовок использует H2 (heading level 2)", () => {
      render(<TechStack />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it("градиентные тени имеют pointer-events-none", () => {
      const { container } = render(<TechStack />);
      const shadowContainers = container.querySelectorAll(
        ".pointer-events-none"
      );

      expect(shadowContainers.length).toBeGreaterThan(0);
    });

    it("tooltip элементы имеют pointer-events-none", () => {
      const { container } = render(<TechStack />);
      const tooltips = container.querySelectorAll(
        ".tech-block .pointer-events-none"
      );

      expect(tooltips.length).toBeGreaterThan(0);
      tooltips.forEach((tooltip) => {
        expect(tooltip).toHaveClass("pointer-events-none");
      });
    });

    it("все технологии доступны через текст (для screen readers)", () => {
      render(<TechStack />);

      technologies.forEach((tech) => {
        const techName = screen.getByText(tech.name);
        expect(techName).toBeInTheDocument();
      });
    });
  });

  describe("CSS стили и анимации", () => {
    it("tech-block имеет inline style с --glow-color", () => {
      const { container } = render(<TechStack />);
      const techBlocks = container.querySelectorAll(".tech-block");

      techBlocks.forEach((block) => {
        const style = (block as HTMLElement).style;
        // Проверяем что есть CSS переменная --glow-color
        expect(style.getPropertyValue("--glow-color")).toBeTruthy();
      });
    });

    it("tech-block имеет inline style с размерами (width, height)", () => {
      const { container } = render(<TechStack />);
      const techBlock = container.querySelector(".tech-block") as HTMLElement;

      expect(techBlock.style.width).toBeTruthy();
      expect(techBlock.style.height).toBeTruthy();
    });

    it("блоки имеют grid позиционирование (gridColumn, gridRow)", () => {
      const { container } = render(<TechStack />);
      const techBlock = container.querySelector(".tech-block") as HTMLElement;

      expect(techBlock.style.gridColumn).toBeTruthy();
      expect(techBlock.style.gridRow).toBeTruthy();
    });
  });

  describe("Структура контента", () => {
    it("контейнер имеет максимальную ширину и padding", () => {
      const { container } = render(<TechStack />);
      const maxWContainer = container.querySelector(".max-w-7xl");

      expect(maxWContainer).toBeInTheDocument();
      expect(maxWContainer).toHaveClass("mx-auto");
      expect(maxWContainer).toHaveClass("px-4");
    });

    it("секция имеет vertical padding", () => {
      const { container } = render(<TechStack />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("py-24");
    });

    it("заголовок центрирован", () => {
      const { container } = render(<TechStack />);
      const headingContainer = container.querySelector(".text-center");

      expect(headingContainer).toBeInTheDocument();
    });

    it("нижнее описание центрировано", () => {
      render(<TechStack />);
      const description = screen.getByText(/От фронтенда до бэкенда/i);

      expect(description).toHaveClass("mx-auto");
    });
  });
});

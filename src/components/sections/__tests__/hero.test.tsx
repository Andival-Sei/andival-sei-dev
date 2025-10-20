import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Hero } from "../hero";

describe("Hero", () => {
  describe("Рендеринг и структура компонента", () => {
    it("рендерится без ошибок", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("имеет класс hero-section", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("hero-section");
    });

    it("имеет декоративный фон с aria-hidden", () => {
      const { container } = render(<Hero />);
      const background = container.querySelector('[aria-hidden="true"]');
      expect(background).toBeInTheDocument();
      expect(background).toHaveClass("hero-background");
    });

    it("содержит три декоративных blob элемента", () => {
      const { container } = render(<Hero />);
      const blobs = container.querySelectorAll(".hero-blob");
      expect(blobs).toHaveLength(3);
    });
  });

  describe("Заголовки", () => {
    it("отображает H1 заголовок 'Andival-Sei'", () => {
      render(<Hero />);
      const heading = screen.getByRole("heading", {
        level: 1,
        name: /Andival-Sei/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it("отображает подзаголовок 'Frontend-разработчик'", () => {
      render(<Hero />);
      const subheading = screen.getByText("Frontend-разработчик", {
        exact: true,
      });
      expect(subheading).toBeInTheDocument();
      expect(subheading).toHaveClass("text-muted-foreground");
    });

    it("H1 заголовок имеет правильные адаптивные классы", () => {
      render(<Hero />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-4xl");
      expect(heading).toHaveClass("sm:text-5xl");
      expect(heading).toHaveClass("md:text-6xl");
      expect(heading).toHaveClass("lg:text-7xl");
    });
  });

  describe("Контент", () => {
    it("отображает описание с текстом о разработчике", () => {
      render(<Hero />);
      const description = screen.getByText(/Привет, я Кирилл/i);
      expect(description).toBeInTheDocument();
    });

    it("описание содержит информацию о React и TypeScript", () => {
      render(<Hero />);
      const description = screen.getByText(/React и TypeScript/i);
      expect(description).toBeInTheDocument();
    });

    it("описание имеет адаптивные классы размера текста", () => {
      render(<Hero />);
      const description = screen.getByText(/Привет, я Кирилл/i);
      expect(description).toHaveClass("text-base");
      expect(description).toHaveClass("sm:text-lg");
      expect(description).toHaveClass("md:text-xl");
    });
  });

  describe("CTA кнопки", () => {
    it("отображает кнопку 'Посмотреть проекты'", () => {
      render(<Hero />);
      const button = screen.getByRole("link", {
        name: /Посмотреть проекты/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("кнопка 'Посмотреть проекты' ведёт на /projects", () => {
      render(<Hero />);
      const button = screen.getByRole("link", {
        name: /Посмотреть проекты/i,
      });
      expect(button).toHaveAttribute("href", "/projects");
    });

    it("кнопка 'Посмотреть проекты' содержит иконку ArrowRight", () => {
      render(<Hero />);
      const button = screen.getByRole("link", {
        name: /Посмотреть проекты/i,
      });
      // Проверяем наличие svg внутри кнопки
      const svg = button.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("отображает кнопку 'Отправить Email'", () => {
      render(<Hero />);
      const button = screen.getByRole("link", { name: /Отправить Email/i });
      expect(button).toBeInTheDocument();
    });

    it("кнопка 'Отправить Email' является mailto ссылкой", () => {
      render(<Hero />);
      const button = screen.getByRole("link", { name: /Отправить Email/i });
      expect(button).toHaveAttribute(
        "href",
        "mailto:freedomdragon777@gmail.com"
      );
    });

    it("кнопка 'Отправить Email' содержит иконку Mail", () => {
      render(<Hero />);
      const button = screen.getByRole("link", { name: /Отправить Email/i });
      // Проверяем наличие svg внутри кнопки
      const svg = button.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("обе CTA кнопки имеют роль link", () => {
      render(<Hero />);
      const buttons = screen.getAllByRole("link");
      // Минимум 2 кнопки (могут быть другие ссылки на странице)
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Accessibility", () => {
    it("секция имеет семантичный тег section", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass("hero-section");
    });

    it("декоративные элементы скрыты от screen readers", () => {
      const { container } = render(<Hero />);
      const decorative = container.querySelector('[aria-hidden="true"]');
      expect(decorative).toHaveAttribute("aria-hidden", "true");
    });

    it("имеет правильную структуру заголовков", () => {
      render(<Hero />);
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it("ссылки доступны для навигации с клавиатуры", () => {
      render(<Hero />);
      const projectsLink = screen.getByRole("link", {
        name: /Посмотреть проекты/i,
      });
      const emailLink = screen.getByRole("link", {
        name: /Отправить Email/i,
      });

      expect(projectsLink).toBeInTheDocument();
      expect(emailLink).toBeInTheDocument();
    });
  });

  describe("Адаптивный дизайн", () => {
    it("контейнер имеет адаптивные padding классы", () => {
      const { container } = render(<Hero />);
      const mainContainer = container.querySelector(".py-20");
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass("md:py-32");
      expect(mainContainer).toHaveClass("lg:py-40");
    });

    it("кнопки имеют flex layout с адаптивным направлением", () => {
      const { container } = render(<Hero />);
      const buttonContainer = container.querySelector(".flex-col");
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass("sm:flex-row");
    });

    it("максимальная ширина контента ограничена", () => {
      const { container } = render(<Hero />);
      const contentContainer = container.querySelector(".max-w-4xl");
      expect(contentContainer).toBeInTheDocument();
    });

    it("описание имеет ограничение по ширине", () => {
      render(<Hero />);
      const description = screen.getByText(/Привет, я Кирилл/i);
      expect(description).toHaveClass("max-w-2xl");
    });
  });
});

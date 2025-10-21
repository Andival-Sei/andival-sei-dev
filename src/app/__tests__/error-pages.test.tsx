import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import NotFound from "../not-found";

// Мокаем next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Мокаем lucide-react иконки
vi.mock("lucide-react", () => ({
  Home: () => <div data-testid="home-icon">Home Icon</div>,
  ArrowLeft: () => <div data-testid="arrow-left-icon">ArrowLeft Icon</div>,
  AlertCircle: () => (
    <div data-testid="alert-circle-icon">AlertCircle Icon</div>
  ),
}));

describe("Error Pages", () => {
  describe("NotFound", () => {
    it("рендерится без ошибок", () => {
      render(<NotFound />);

      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("отображает заголовок ошибки", () => {
      render(<NotFound />);

      expect(screen.getByText("Страница не найдена")).toBeInTheDocument();
    });

    it("отображает описание ошибки", () => {
      render(<NotFound />);

      expect(
        screen.getByText(/К сожалению, запрошенная страница не существует/)
      ).toBeInTheDocument();
    });

    it("содержит кнопки навигации", () => {
      render(<NotFound />);

      expect(screen.getByText("На главную")).toBeInTheDocument();
      expect(screen.getByText("К проектам")).toBeInTheDocument();
    });

    it("содержит правильные ссылки", () => {
      render(<NotFound />);

      const homeLink = screen.getByText("На главную").closest("a");
      const projectsLink = screen.getByText("К проектам").closest("a");

      expect(homeLink).toHaveAttribute("href", "/");
      expect(projectsLink).toHaveAttribute("href", "/projects");
    });

    it("отображает иконки", () => {
      render(<NotFound />);

      expect(screen.getByTestId("home-icon")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
    });
  });
});

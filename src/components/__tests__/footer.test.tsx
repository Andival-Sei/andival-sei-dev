import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Мокаем environment variables для тестов ПЕРЕД импортом компонента
vi.mock("@/lib/env", () => ({
  env: {
    siteUrl: "https://andival-sei.vercel.app",
    siteName: "Andival-Sei Portfolio",
    email: "test@example.com",
    github: "https://github.com/Andival-Sei",
    telegram: "https://t.me/Andiewahl",
    vk: "https://vk.com/andiewahl",
    googleVerification: undefined,
    yandexVerification: undefined,
  },
}));

import { Footer } from "../footer";

describe("Footer", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Копирайт", () => {
    it("отображает текст копирайта с текущим годом", () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      const copyright = screen.getByText(`© ${currentYear} Andival-Sei`);
      expect(copyright).toBeInTheDocument();
    });
  });

  describe("Социальные сети", () => {
    it("отображает все три социальные ссылки", () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText("GitHub");
      const telegramLink = screen.getByLabelText("Telegram");
      const vkLink = screen.getByLabelText("VK");

      expect(githubLink).toBeInTheDocument();
      expect(telegramLink).toBeInTheDocument();
      expect(vkLink).toBeInTheDocument();
    });

    it("GitHub ссылка имеет правильный URL", () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText("GitHub");
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/Andival-Sei"
      );
    });

    it("Telegram ссылка имеет правильный URL", () => {
      render(<Footer />);
      const telegramLink = screen.getByLabelText("Telegram");
      expect(telegramLink).toHaveAttribute("href", "https://t.me/Andiewahl");
    });

    it("VK ссылка имеет правильный URL", () => {
      render(<Footer />);
      const vkLink = screen.getByLabelText("VK");
      expect(vkLink).toHaveAttribute("href", "https://vk.com/andiewahl");
    });

    it("все ссылки открываются в новой вкладке", () => {
      render(<Footer />);
      const socialLinks = [
        screen.getByLabelText("GitHub"),
        screen.getByLabelText("Telegram"),
        screen.getByLabelText("VK"),
      ];

      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
    });

    it("все ссылки имеют атрибуты безопасности", () => {
      render(<Footer />);
      const socialLinks = [
        screen.getByLabelText("GitHub"),
        screen.getByLabelText("Telegram"),
        screen.getByLabelText("VK"),
      ];

      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });

    it("все ссылки имеют aria-label для accessibility", () => {
      render(<Footer />);

      expect(screen.getByLabelText("GitHub")).toHaveAttribute(
        "aria-label",
        "GitHub"
      );
      expect(screen.getByLabelText("Telegram")).toHaveAttribute(
        "aria-label",
        "Telegram"
      );
      expect(screen.getByLabelText("VK")).toHaveAttribute("aria-label", "VK");
    });
  });

  describe("ThemeToggle", () => {
    it("отображает компонент переключателя темы", () => {
      render(<Footer />);
      // ThemeToggle содержит кнопки переключения темы (role="radio" в ToggleGroup)
      // Проверяем наличие кнопок переключения темы
      const lightTheme = screen.getByLabelText("Светлая тема");
      const systemTheme = screen.getByLabelText("Системная тема");
      const darkTheme = screen.getByLabelText("Тёмная тема");

      expect(lightTheme).toBeInTheDocument();
      expect(systemTheme).toBeInTheDocument();
      expect(darkTheme).toBeInTheDocument();
    });
  });

  describe("Адаптивный дизайн", () => {
    it("футер имеет адаптивные CSS классы", () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("border-t");

      // Проверяем наличие flex-контейнера с адаптивными классами
      const flexContainer = container.querySelector(
        ".flex.flex-col.items-center.justify-between"
      );
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe("Структура компонента", () => {
    it("содержит правильную структуру: копирайт, социальные сети, переключатель темы", () => {
      render(<Footer />);

      // Копирайт
      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(`© ${currentYear} Andival-Sei`)
      ).toBeInTheDocument();

      // Социальные сети
      expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
      expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
      expect(screen.getByLabelText("VK")).toBeInTheDocument();

      // Переключатель темы (кнопки с role="radio")
      expect(screen.getByLabelText("Светлая тема")).toBeInTheDocument();
      expect(screen.getByLabelText("Системная тема")).toBeInTheDocument();
      expect(screen.getByLabelText("Тёмная тема")).toBeInTheDocument();
    });
  });

  describe("Snapshot тест", () => {
    it("соответствует snapshot", () => {
      const { container } = render(<Footer />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

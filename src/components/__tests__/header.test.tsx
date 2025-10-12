import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../header";

describe("Header", () => {
  beforeEach(() => {
    // Сброс scroll position перед каждым тестом
    window.scrollY = 0;
  });

  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
    });

    it("имеет sticky позиционирование", () => {
      const { container } = render(<Header />);
      const header = container.querySelector("header");
      expect(header).toHaveClass("sticky");
      expect(header).toHaveClass("top-0");
      expect(header).toHaveClass("z-50");
    });
  });

  describe("Логотип", () => {
    it("отображает текст 'Andival-Sei'", () => {
      render(<Header />);
      const logo = screen.getByRole("link", { name: /Andival-Sei/i });
      expect(logo).toBeInTheDocument();
    });

    it("логотип ведёт на главную страницу", () => {
      render(<Header />);
      const logo = screen.getByRole("link", { name: /Andival-Sei/i });
      expect(logo).toHaveAttribute("href", "/");
    });
  });

  describe("Desktop навигация", () => {
    it("отображает все три навигационные ссылки", () => {
      render(<Header />);

      // Находим все ссылки с текстом (не в мобильном меню)
      const projectsLinks = screen.getAllByRole("link", { name: /Проекты/i });
      const aboutLinks = screen.getAllByRole("link", { name: /Обо мне/i });
      const labLinks = screen.getAllByRole("link", { name: /Lab/i });

      // На desktop должна быть хотя бы одна видимая ссылка каждого типа
      expect(projectsLinks.length).toBeGreaterThan(0);
      expect(aboutLinks.length).toBeGreaterThan(0);
      expect(labLinks.length).toBeGreaterThan(0);
    });

    it("навигационные ссылки имеют правильные URL", () => {
      render(<Header />);

      const projectsLink = screen.getAllByRole("link", { name: /Проекты/i })[0];
      const aboutLink = screen.getAllByRole("link", { name: /Обо мне/i })[0];
      const labLink = screen.getAllByRole("link", { name: /Lab/i })[0];

      expect(projectsLink).toHaveAttribute("href", "/projects");
      expect(aboutLink).toHaveAttribute("href", "/about");
      expect(labLink).toHaveAttribute("href", "/lab");
    });

    it("desktop навигация имеет правильные CSS классы", () => {
      const { container } = render(<Header />);
      const desktopNav = container.querySelector(
        "nav.hidden.items-center.gap-6.md\\:flex"
      );
      expect(desktopNav).toBeInTheDocument();
    });
  });

  describe("Кнопка 'Связаться'", () => {
    it("отображает кнопку 'Связаться'", () => {
      render(<Header />);
      const contactButtons = screen.getAllByRole("link", {
        name: /Связаться/i,
      });
      expect(contactButtons.length).toBeGreaterThan(0);
    });

    it("кнопка 'Связаться' ведёт на страницу контактов", () => {
      render(<Header />);
      const contactButton = screen.getAllByRole("link", {
        name: /Связаться/i,
      })[0];
      expect(contactButton).toHaveAttribute("href", "/contact");
    });
  });

  describe("Скролл эффекты", () => {
    it("начальное состояние: header без backdrop-blur", () => {
      const { container } = render(<Header />);
      const header = container.querySelector("header");
      expect(header).not.toHaveClass("backdrop-blur-md");
      expect(header).not.toHaveClass("shadow-sm");
    });

    it("после скролла: header получает backdrop-blur и shadow", async () => {
      const { container } = render(<Header />);
      const header = container.querySelector("header");

      // Симулируем скролл
      Object.defineProperty(window, "scrollY", { value: 50, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        expect(header).toHaveClass("backdrop-blur-md");
        expect(header).toHaveClass("shadow-sm");
      });
    });

    it("скролл меньше 20px: header остаётся без эффектов", async () => {
      const { container } = render(<Header />);
      const header = container.querySelector("header");

      // Симулируем скролл меньше порога
      Object.defineProperty(window, "scrollY", { value: 10, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        expect(header).not.toHaveClass("backdrop-blur-md");
        expect(header).not.toHaveClass("shadow-sm");
      });
    });
  });

  describe("Мобильное меню", () => {
    it("отображает кнопку мобильного меню", () => {
      render(<Header />);
      const menuButton = screen.getByRole("button", { name: /Открыть меню/i });
      expect(menuButton).toBeInTheDocument();
    });

    it("кнопка меню имеет правильные CSS классы для скрытия на desktop", () => {
      render(<Header />);
      const menuButton = screen.getByRole("button", { name: /Открыть меню/i });
      expect(menuButton).toHaveClass("md:hidden");
    });

    it("открывает мобильное меню при клике на кнопку", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /Открыть меню/i });
      await user.click(menuButton);

      // Sheet должен открыться и показать заголовок "Навигация"
      await waitFor(() => {
        expect(screen.getByText("Навигация")).toBeInTheDocument();
      });
    });

    it("мобильное меню содержит все навигационные ссылки", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /Открыть меню/i });
      await user.click(menuButton);

      await waitFor(() => {
        // Проверяем что в открывшемся Sheet есть навигационные ссылки
        // Ссылки дублируются: desktop (скрыт через CSS) и mobile (в Sheet)
        const projectsLinks = screen.getAllByRole("link", { name: /Проекты/i });
        const aboutLinks = screen.getAllByRole("link", { name: /Обо мне/i });
        const labLinks = screen.getAllByRole("link", { name: /Lab/i });

        // Минимум по 1 ссылке каждого типа должно быть
        expect(projectsLinks.length).toBeGreaterThanOrEqual(1);
        expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
        expect(labLinks.length).toBeGreaterThanOrEqual(1);
      });
    });

    it("мобильное меню содержит кнопку 'Связаться'", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /Открыть меню/i });
      await user.click(menuButton);

      await waitFor(() => {
        const contactButtons = screen.getAllByRole("link", {
          name: /Связаться/i,
        });
        // Должна быть хотя бы одна кнопка "Связаться"
        expect(contactButtons.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("Адаптивный дизайн", () => {
    it("header имеет container с адаптивными отступами", () => {
      const { container } = render(<Header />);
      const headerContainer = container.querySelector(
        ".container.mx-auto.px-4"
      );
      expect(headerContainer).toBeInTheDocument();
    });

    it("header имеет фиксированную высоту", () => {
      const { container } = render(<Header />);
      const headerInner = container.querySelector(".h-16");
      expect(headerInner).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("мобильная кнопка меню имеет aria-label", () => {
      render(<Header />);
      const menuButton = screen.getByRole("button", { name: /Открыть меню/i });
      expect(menuButton).toHaveAttribute("aria-label", "Открыть меню");
    });

    it("header является landmark с ролью banner", () => {
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot в начальном состоянии", () => {
      const { container } = render(<Header />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot после скролла", async () => {
      const { container } = render(<Header />);

      // Симулируем скролл
      Object.defineProperty(window, "scrollY", { value: 50, writable: true });
      fireEvent.scroll(window);

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveClass("backdrop-blur-md");
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

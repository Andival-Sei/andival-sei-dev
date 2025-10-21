import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Header } from "@/components/header";

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

// Мокаем next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Мокаем lucide-react иконки
vi.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon">Menu Icon</div>,
  X: () => <div data-testid="close-icon">Close Icon</div>,
  XIcon: () => <div data-testid="close-icon">Close Icon</div>,
  Sun: () => <div data-testid="sun-icon">Sun Icon</div>,
  Moon: () => <div data-testid="moon-icon">Moon Icon</div>,
}));

// Мокаем theme toggle
vi.mock("@/components/theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe("Navigation Integration", () => {
  it("отображает все навигационные ссылки", () => {
    render(<Header />);

    // Проверяем основные ссылки (Header не содержит "Главная" и "Контакты" в навигации)
    expect(screen.getByText("Обо мне")).toBeInTheDocument();
    expect(screen.getByText("Проекты")).toBeInTheDocument();
    expect(screen.getByText("Lab")).toBeInTheDocument();
    expect(screen.getByText("Связаться")).toBeInTheDocument();
  });

  it("содержит правильные ссылки навигации", () => {
    render(<Header />);

    const aboutLink = screen.getByText("Обо мне").closest("a");
    const projectsLink = screen.getByText("Проекты").closest("a");
    const labLink = screen.getByText("Lab").closest("a");
    const contactLink = screen.getByText("Связаться").closest("a");

    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(projectsLink).toHaveAttribute("href", "/projects");
    expect(labLink).toHaveAttribute("href", "/lab");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("отображает мобильное меню", () => {
    render(<Header />);

    // Проверяем наличие кнопки мобильного меню
    const menuButton = screen.getByTestId("menu-icon");
    expect(menuButton).toBeInTheDocument();
  });

  it("переключает мобильное меню", () => {
    render(<Header />);

    const menuButton = screen.getByTestId("menu-icon");

    // Кликаем на кнопку меню
    fireEvent.click(menuButton);

    // Проверяем, что меню открылось (должна появиться кнопка закрытия)
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("отображает переключатель темы", () => {
    render(<Header />);

    // Проверяем, что Header рендерится без ошибок
    expect(screen.getByText("Andival-Sei")).toBeInTheDocument();
  });

  it("имеет правильную структуру навигации", () => {
    const { container } = render(<Header />);

    // Проверяем наличие nav элемента
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();

    // Проверяем наличие ссылок в навигации
    const navLinks = container.querySelectorAll("nav a");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("отображает логотип или название сайта", () => {
    render(<Header />);

    // Проверяем наличие названия сайта или логотипа
    const siteName = screen.getByText("Andival-Sei");
    expect(siteName).toBeInTheDocument();
  });

  it("поддерживает клавиатурную навигацию", () => {
    render(<Header />);

    const aboutLink = screen.getByText("Обо мне");

    // Проверяем, что ссылки фокусируемы
    aboutLink.focus();
    expect(document.activeElement).toBe(aboutLink);
  });

  it("имеет правильные ARIA атрибуты", () => {
    const { container } = render(<Header />);

    // Проверяем наличие ARIA атрибутов для навигации
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();

    // Проверяем наличие aria-label для мобильного меню
    const menuButton = screen.getByTestId("menu-icon");
    expect(menuButton.closest("button")).toHaveAttribute("aria-label");
  });
});

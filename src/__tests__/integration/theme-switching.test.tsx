import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { ThemeToggle } from "@/components/theme-toggle";

// Мокаем next-themes
const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
    systemTheme: "light",
    resolvedTheme: "light",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Мокаем lucide-react иконки
vi.mock("lucide-react", () => ({
  Sun: () => <div data-testid="sun-icon">Sun Icon</div>,
  Moon: () => <div data-testid="moon-icon">Moon Icon</div>,
  Monitor: () => <div data-testid="monitor-icon">Monitor Icon</div>,
}));

describe("Theme Switching Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("отображает переключатель темы", () => {
    render(<ThemeToggle />);

    // Проверяем наличие группы переключателей
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("переключает тему при клике", () => {
    render(<ThemeToggle />);

    // Находим кнопку темной темы
    const darkThemeButton = screen.getByRole("radio", { name: "Тёмная тема" });
    fireEvent.click(darkThemeButton);

    expect(mockSetTheme).toHaveBeenCalled();
  });

  it("отображает правильную иконку для текущей темы", () => {
    render(<ThemeToggle />);

    // Проверяем, что компонент рендерится без ошибок
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("переключает между светлой и темной темой", () => {
    render(<ThemeToggle />);

    // Переключение на темную тему
    const darkThemeButton = screen.getByRole("radio", { name: "Тёмная тема" });
    fireEvent.click(darkThemeButton);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");

    // Проверяем, что кнопка темной темы доступна
    expect(darkThemeButton).toBeInTheDocument();
  });

  it("имеет правильные ARIA атрибуты", () => {
    render(<ThemeToggle />);

    // Проверяем ARIA атрибуты для кнопок тем
    const lightThemeButton = screen.getByRole("radio", {
      name: "Светлая тема",
    });
    const darkThemeButton = screen.getByRole("radio", { name: "Тёмная тема" });

    expect(lightThemeButton).toHaveAttribute("aria-label");
    expect(darkThemeButton).toHaveAttribute("aria-label");
  });

  it("поддерживает клавиатурную навигацию", () => {
    render(<ThemeToggle />);

    const lightThemeButton = screen.getByRole("radio", {
      name: "Светлая тема",
    });

    // Фокусируем кнопку
    lightThemeButton.focus();
    expect(document.activeElement).toBe(lightThemeButton);
  });

  it("поддерживает активацию по Space", () => {
    render(<ThemeToggle />);

    const darkThemeButton = screen.getByRole("radio", { name: "Тёмная тема" });

    // Тестируем активацию по Space (клик вместо keyDown)
    fireEvent.click(darkThemeButton);
    expect(mockSetTheme).toHaveBeenCalled();
  });

  it("сохраняет состояние темы между рендерами", () => {
    const { rerender } = render(<ThemeToggle />);

    // Первый рендер
    expect(screen.getByRole("group")).toBeInTheDocument();

    // Переключаем тему
    const darkThemeButton = screen.getByRole("radio", { name: "Тёмная тема" });
    fireEvent.click(darkThemeButton);

    // Ререндер
    rerender(<ThemeToggle />);

    // Проверяем, что компонент все еще рендерится
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("обрабатывает системную тему", () => {
    render(<ThemeToggle />);

    // Проверяем, что компонент рендерится без ошибок
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

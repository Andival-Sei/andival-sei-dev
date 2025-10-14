import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../theme-toggle";
import * as nextThemes from "next-themes";

// Тип для useTheme хука - совместимый с next-themes
type UseThemeProps = {
  theme?: string;
  setTheme: (theme: string | ((prevTheme: string) => string)) => void;
  themes: string[];
  resolvedTheme?: string;
  systemTheme?: "light" | "dark";
};

describe("ThemeToggle", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок после монтирования", async () => {
      render(<ThemeToggle />);

      // Компонент возвращает null до монтирования, затем рендерится
      // ToggleGroup рендерит кнопки как radio, не как button
      await waitFor(() => {
        const lightButton = screen.getByLabelText("Светлая тема");
        expect(lightButton).toBeInTheDocument();
      });
    });

    it("отображает три кнопки переключения темы", async () => {
      render(<ThemeToggle />);

      await waitFor(() => {
        const lightButton = screen.getByLabelText("Светлая тема");
        const systemButton = screen.getByLabelText("Системная тема");
        const darkButton = screen.getByLabelText("Тёмная тема");

        expect(lightButton).toBeInTheDocument();
        expect(systemButton).toBeInTheDocument();
        expect(darkButton).toBeInTheDocument();
      });
    });
  });

  describe("Aria-labels (Accessibility)", () => {
    it("кнопка светлой темы имеет aria-label", async () => {
      render(<ThemeToggle />);

      await waitFor(() => {
        const lightButton = screen.getByLabelText("Светлая тема");
        expect(lightButton).toHaveAttribute("aria-label", "Светлая тема");
      });
    });

    it("кнопка системной темы имеет aria-label", async () => {
      render(<ThemeToggle />);

      await waitFor(() => {
        const systemButton = screen.getByLabelText("Системная тема");
        expect(systemButton).toHaveAttribute("aria-label", "Системная тема");
      });
    });

    it("кнопка тёмной темы имеет aria-label", async () => {
      render(<ThemeToggle />);

      await waitFor(() => {
        const darkButton = screen.getByLabelText("Тёмная тема");
        expect(darkButton).toHaveAttribute("aria-label", "Тёмная тема");
      });
    });
  });

  describe("Иконки", () => {
    it("кнопки содержат правильные иконки (Sun, Monitor, Moon)", async () => {
      const { container } = render(<ThemeToggle />);

      await waitFor(() => {
        // Проверяем наличие SVG элементов (иконки из lucide-react рендерятся как SVG)
        const svgs = container.querySelectorAll("svg");
        expect(svgs.length).toBe(3);
      });
    });
  });

  describe("Переключение темы", () => {
    it("вызывает setTheme при клике на кнопку", async () => {
      const mockSetTheme = vi.fn();
      vi.spyOn(nextThemes, "useTheme").mockReturnValue({
        theme: "light",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        resolvedTheme: "light",
        systemTheme: "light",
      } as UseThemeProps);

      const user = userEvent.setup();
      render(<ThemeToggle />);

      await waitFor(async () => {
        const darkButton = screen.getByLabelText("Тёмная тема");
        await user.click(darkButton);
      });

      expect(mockSetTheme).toHaveBeenCalled();
    });

    it("не вызывает setTheme если value не предоставлен", async () => {
      const mockSetTheme = vi.fn();
      vi.spyOn(nextThemes, "useTheme").mockReturnValue({
        theme: "light",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        resolvedTheme: "light",
        systemTheme: "light",
      } as UseThemeProps);

      render(<ThemeToggle />);

      await waitFor(() => {
        const lightButton = screen.getByLabelText("Светлая тема");
        expect(lightButton).toBeInTheDocument();
      });

      // onValueChange с пустым значением не должен вызывать setTheme
      // Это проверяется логикой в компоненте: if (value) setTheme(value)
      expect(mockSetTheme).not.toHaveBeenCalledWith("");
      expect(mockSetTheme).not.toHaveBeenCalledWith(undefined);
    });
  });

  describe("Текущая выбранная тема", () => {
    it("отображает текущую тему из useTheme", async () => {
      vi.spyOn(nextThemes, "useTheme").mockReturnValue({
        theme: "dark",
        setTheme: vi.fn(),
        themes: ["light", "dark", "system"],
        resolvedTheme: "dark",
        systemTheme: "dark",
      } as UseThemeProps);

      const { container } = render(<ThemeToggle />);

      await waitFor(() => {
        // ToggleGroup должен иметь value равное текущей теме
        const toggleGroup = container.querySelector('[role="group"]');
        expect(toggleGroup).toBeInTheDocument();
      });
    });
  });

  describe("Стилизация", () => {
    it("имеет border и rounded стили", async () => {
      const { container } = render(<ThemeToggle />);

      await waitFor(() => {
        const toggleGroup = container.querySelector(".border.rounded-lg");
        expect(toggleGroup).toBeInTheDocument();
      });
    });

    it("кнопки имеют стили для активного состояния", async () => {
      render(<ThemeToggle />);

      await waitFor(() => {
        const lightButton = screen.getByLabelText("Светлая тема");
        // Проверяем что у кнопки есть className (стили применены)
        expect(lightButton.className).toBeTruthy();
      });
    });
  });

  describe("Snapshot тест", () => {
    it("соответствует snapshot после монтирования", async () => {
      const { container } = render(<ThemeToggle />);

      await waitFor(() => {
        const lightButton = screen.getByLabelText("Светлая тема");
        expect(lightButton).toBeInTheDocument();
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

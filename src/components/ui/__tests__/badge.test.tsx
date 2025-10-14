import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  describe("Рендеринг", () => {
    it("рендерится с текстом", () => {
      render(<Badge>Тестовый badge</Badge>);
      expect(screen.getByText("Тестовый badge")).toBeInTheDocument();
    });

    it("рендерится без текста (пустой badge)", () => {
      const { container } = render(<Badge />);
      const badge = container.querySelector("div");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("");
    });

    it("рендерится с дочерними элементами", () => {
      render(
        <Badge>
          <span>Иконка</span> Текст
        </Badge>
      );
      expect(screen.getByText("Иконка")).toBeInTheDocument();
      expect(screen.getByText("Текст")).toBeInTheDocument();
    });
  });

  describe("Варианты (variants)", () => {
    it("default variant применяет правильные стили", () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-primary");
    });

    it("secondary variant применяет правильные стили", () => {
      const { container } = render(
        <Badge variant="secondary">Secondary</Badge>
      );
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-secondary");
    });

    it("destructive variant применяет правильные стили", () => {
      const { container } = render(
        <Badge variant="destructive">Destructive</Badge>
      );
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-destructive");
    });

    it("success variant применяет правильные стили", () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-success");
    });

    it("warning variant применяет правильные стили", () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-warning");
    });

    it("info variant применяет правильные стили", () => {
      const { container } = render(<Badge variant="info">Info</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-info");
    });

    it("outline variant применяет правильные стили", () => {
      const { container } = render(<Badge variant="outline">Outline</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("text-foreground");
    });

    it("использует default variant если variant не указан", () => {
      const { container } = render(<Badge>No variant</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("bg-primary");
    });
  });

  describe("Дополнительные props", () => {
    it("применяет кастомный className", () => {
      const { container } = render(
        <Badge className="custom-class">Custom</Badge>
      );
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("custom-class");
      // Также должен сохранять базовые классы
      expect(badge).toHaveClass("inline-flex");
    });

    it("поддерживает HTML атрибуты", () => {
      const { container } = render(
        <Badge data-testid="test-badge" id="my-badge">
          Badge
        </Badge>
      );
      const badge = container.querySelector("div");
      expect(badge).toHaveAttribute("data-testid", "test-badge");
      expect(badge).toHaveAttribute("id", "my-badge");
    });

    it("поддерживает onClick обработчик", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Badge onClick={handleClick}>Clickable</Badge>
      );
      const badge = container.querySelector("div");
      badge?.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Базовые стили", () => {
    it("всегда содержит базовые классы", () => {
      const { container } = render(<Badge>Test</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("inline-flex");
      expect(badge).toHaveClass("items-center");
      expect(badge).toHaveClass("rounded-md");
      expect(badge).toHaveClass("border");
    });

    it("имеет правильные размеры padding и font-size", () => {
      const { container } = render(<Badge>Test</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("px-2.5");
      expect(badge).toHaveClass("py-0.5");
      expect(badge).toHaveClass("text-xs");
    });
  });

  describe("Snapshot тесты", () => {
    it("default variant соответствует snapshot", () => {
      const { container } = render(<Badge>Default Badge</Badge>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("secondary variant соответствует snapshot", () => {
      const { container } = render(
        <Badge variant="secondary">Secondary Badge</Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("destructive variant соответствует snapshot", () => {
      const { container } = render(
        <Badge variant="destructive">Destructive Badge</Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("success variant соответствует snapshot", () => {
      const { container } = render(
        <Badge variant="success">Success Badge</Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("warning variant соответствует snapshot", () => {
      const { container } = render(
        <Badge variant="warning">Warning Badge</Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("info variant соответствует snapshot", () => {
      const { container } = render(<Badge variant="info">Info Badge</Badge>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("outline variant соответствует snapshot", () => {
      const { container } = render(
        <Badge variant="outline">Outline Badge</Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

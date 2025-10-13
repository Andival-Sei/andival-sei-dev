import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Badge>Test Badge</Badge>);
      const badge = screen.getByText("Test Badge");
      expect(badge).toBeInTheDocument();
    });

    it("рендерится с текстом", () => {
      render(<Badge>React</Badge>);
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("рендерится как div элемент", () => {
      const { container } = render(<Badge>Test</Badge>);
      const badge = container.querySelector("div");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Варианты (variants)", () => {
    it("рендерится с default вариантом", () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-primary",
        "text-primary-foreground"
      );
    });

    it("рендерится с secondary вариантом", () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText("Secondary");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-secondary",
        "text-secondary-foreground"
      );
    });

    it("рендерится с destructive вариантом", () => {
      render(<Badge variant="destructive">Error</Badge>);
      const badge = screen.getByText("Error");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-destructive",
        "text-destructive-foreground"
      );
    });

    it("рендерится с success вариантом", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-success",
        "text-success-foreground"
      );
    });

    it("рендерится с warning вариантом", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText("Warning");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-warning",
        "text-warning-foreground"
      );
    });

    it("рендерится с info вариантом", () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText("Info");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-info",
        "text-info-foreground"
      );
    });

    it("рендерится с outline вариантом", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText("Outline");
      expect(badge).toHaveClass("text-foreground");
    });
  });

  describe("CSS классы", () => {
    it("применяет базовые CSS классы", () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText("Test");
      expect(badge).toHaveClass(
        "inline-flex",
        "items-center",
        "rounded-md",
        "border",
        "px-2.5",
        "py-0.5",
        "text-xs",
        "font-semibold",
        "transition-colors"
      );
    });

    it("применяет focus стили", () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText("Test");
      expect(badge).toHaveClass(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-ring",
        "focus:ring-offset-2"
      );
    });

    it("применяет кастомные CSS классы через className", () => {
      render(<Badge className="custom-class">Test</Badge>);
      const badge = screen.getByText("Test");
      expect(badge).toHaveClass("custom-class");
    });

    it("объединяет variant классы с базовыми", () => {
      render(<Badge variant="destructive">Test</Badge>);
      const badge = screen.getByText("Test");
      expect(badge).toHaveClass("border", "px-2.5", "py-0.5"); // базовые
      expect(badge).toHaveClass(
        "bg-destructive",
        "text-destructive-foreground"
      ); // variant
    });
  });

  describe("Hover эффекты", () => {
    it("имеет hover эффекты для default варианта", () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass("hover:bg-primary/80");
    });

    it("имеет hover эффекты для secondary варианта", () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText("Secondary");
      expect(badge).toHaveClass("hover:bg-secondary/80");
    });

    it("имеет hover эффекты для destructive варианта", () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText("Destructive");
      expect(badge).toHaveClass("hover:bg-destructive/80");
    });

    it("имеет hover эффекты для success варианта", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass("hover:bg-success/80");
    });

    it("имеет hover эффекты для warning варианта", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText("Warning");
      expect(badge).toHaveClass("hover:bg-warning/80");
    });

    it("имеет hover эффекты для info варианта", () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText("Info");
      expect(badge).toHaveClass("hover:bg-info/80");
    });

    it("outline вариант не имеет hover эффектов", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText("Outline");
      expect(badge).not.toHaveClass("hover:bg-");
    });
  });

  describe("Shadow эффекты", () => {
    it("имеет shadow для default варианта", () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass("shadow");
    });

    it("имеет shadow для destructive варианта", () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText("Destructive");
      expect(badge).toHaveClass("shadow");
    });

    it("имеет shadow для success варианта", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass("shadow");
    });

    it("имеет shadow для warning варианта", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText("Warning");
      expect(badge).toHaveClass("shadow");
    });

    it("имеет shadow для info варианта", () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText("Info");
      expect(badge).toHaveClass("shadow");
    });

    it("не имеет shadow для secondary варианта", () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText("Secondary");
      expect(badge).not.toHaveClass("shadow");
    });

    it("не имеет shadow для outline варианта", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText("Outline");
      expect(badge).not.toHaveClass("shadow");
    });
  });

  describe("Accessibility", () => {
    it("поддерживает aria-label", () => {
      render(<Badge aria-label="Technology badge">React</Badge>);
      const badge = screen.getByLabelText("Technology badge");
      expect(badge).toBeInTheDocument();
    });

    it("поддерживает role атрибут", () => {
      render(<Badge role="status">Status</Badge>);
      const badge = screen.getByRole("status");
      expect(badge).toBeInTheDocument();
    });

    it("поддерживает tabIndex", () => {
      render(<Badge tabIndex={0}>Focusable</Badge>);
      const badge = screen.getByText("Focusable");
      expect(badge).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Содержимое", () => {
    it("может содержать текст", () => {
      render(<Badge>TypeScript</Badge>);
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("может содержать HTML элементы", () => {
      render(
        <Badge>
          <span>React</span>
        </Badge>
      );
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("может содержать иконки", () => {
      render(
        <Badge>
          <span>⭐</span> Star
        </Badge>
      );
      expect(screen.getByText("⭐")).toBeInTheDocument();
      expect(screen.getByText("Star")).toBeInTheDocument();
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot для default варианта", () => {
      const { container } = render(<Badge>Default Badge</Badge>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для всех вариантов", () => {
      const { container } = render(
        <div>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

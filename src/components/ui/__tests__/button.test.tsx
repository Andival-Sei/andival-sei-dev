import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByRole("button", { name: "Test Button" });
      expect(button).toBeInTheDocument();
    });

    it("рендерится с текстом", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("имеет правильный data-slot атрибут", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-slot", "button");
    });
  });

  describe("Варианты (variants)", () => {
    it("рендерится с default вариантом", () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("рендерится с destructive вариантом", () => {
      render(<Button variant="destructive">Destructive</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive", "text-white");
    });

    it("рендерится с outline вариантом", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border", "bg-background");
    });

    it("рендерится с secondary вариантом", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
    });

    it("рендерится с ghost вариантом", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-accent");
    });

    it("рендерится с link вариантом", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-primary", "underline-offset-4");
    });
  });

  describe("Размеры (sizes)", () => {
    it("рендерится с default размером", () => {
      render(<Button>Default Size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9", "px-4", "py-2");
    });

    it("рендерится с sm размером", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-8", "px-3");
    });

    it("рендерится с lg размером", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10", "px-6");
    });

    it("рендерится с icon размером", () => {
      render(<Button size="icon">Icon</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-9");
    });

    it("рендерится с icon-sm размером", () => {
      render(<Button size="icon-sm">Icon Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-8");
    });

    it("рендерится с icon-lg размером", () => {
      render(<Button size="icon-lg">Icon Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-10");
    });
  });

  describe("Состояние disabled", () => {
    it("рендерится в disabled состоянии", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("имеет правильные CSS классы для disabled состояния", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "disabled:pointer-events-none",
        "disabled:opacity-50"
      );
    });
  });

  describe("AsChild prop", () => {
    it("рендерится как Slot когда asChild=true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("data-slot", "button");
    });

    it("рендерится как button когда asChild=false", () => {
      render(<Button asChild={false}>Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("События", () => {
    it("вызывает onClick при клике", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("не вызывает onClick когда disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("имеет правильную роль button", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("поддерживает aria-label", () => {
      render(<Button aria-label="Custom label">Test</Button>);
      const button = screen.getByRole("button", { name: "Custom label" });
      expect(button).toBeInTheDocument();
    });

    it("поддерживает aria-describedby", () => {
      render(
        <div>
          <Button aria-describedby="description">Test</Button>
          <div id="description">Description text</div>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });

    it("имеет focus-visible стили", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50"
      );
    });
  });

  describe("CSS классы", () => {
    it("применяет базовые CSS классы", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "whitespace-nowrap",
        "rounded-md",
        "text-sm",
        "font-medium",
        "transition-all"
      );
    });

    it("применяет кастомные CSS классы через className", () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("объединяет variant и size классы", () => {
      render(
        <Button variant="destructive" size="lg">
          Test
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive", "h-10");
    });
  });

  describe("Snapshot тест", () => {
    it("соответствует snapshot для default варианта", () => {
      const { container } = render(<Button>Default Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для всех вариантов", () => {
      const { container } = render(
        <div>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для всех размеров", () => {
      const { container } = render(
        <div>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

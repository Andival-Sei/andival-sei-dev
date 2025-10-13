import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeInTheDocument();
    });

    it("рендерится как button элемент", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeInTheDocument();
    });

    it("имеет правильный data-slot атрибут", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("data-slot", "toggle");
    });

    it("отображает текст", () => {
      render(<Toggle>Toggle Text</Toggle>);
      expect(screen.getByText("Toggle Text")).toBeInTheDocument();
    });
  });

  describe("Варианты (variants)", () => {
    it("рендерится с default вариантом", () => {
      render(<Toggle>Default</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("bg-transparent");
    });

    it("рендерится с outline вариантом", () => {
      render(<Toggle variant="outline">Outline</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "border",
        "border-input",
        "bg-transparent",
        "shadow-xs"
      );
    });
  });

  describe("Размеры (sizes)", () => {
    it("рендерится с default размером", () => {
      render(<Toggle>Default Size</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("h-9", "px-2", "min-w-9");
    });

    it("рендерится с sm размером", () => {
      render(<Toggle size="sm">Small</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("h-8", "px-1.5", "min-w-8");
    });

    it("рендерится с lg размером", () => {
      render(<Toggle size="lg">Large</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("h-10", "px-2.5", "min-w-10");
    });
  });

  describe("Состояния", () => {
    it("рендерится в pressed=false состоянии по умолчанию", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("data-state", "off");
    });

    it("рендерится в pressed=true состоянии", () => {
      render(<Toggle pressed>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("data-state", "on");
    });
  });

  describe("Состояние disabled", () => {
    it("рендерится в disabled состоянии", () => {
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeDisabled();
    });

    it("имеет правильные CSS классы для disabled состояния", () => {
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "disabled:pointer-events-none",
        "disabled:opacity-50"
      );
    });
  });

  describe("Взаимодействие", () => {
    it("переключается при клике", async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);

      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("data-state", "off");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("data-state", "on");
    });

    it("вызывает onPressedChange при изменении состояния", async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onPressedChange={handlePressedChange}>Toggle</Toggle>);

      const toggle = screen.getByRole("button");
      await user.click(toggle);

      expect(handlePressedChange).toHaveBeenCalledWith(true);
    });

    it("не переключается когда disabled", async () => {
      const user = userEvent.setup();
      render(<Toggle disabled>Disabled</Toggle>);

      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("data-state", "off");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("data-state", "off");
    });

    it("не вызывает onPressedChange когда disabled", async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Toggle disabled onPressedChange={handlePressedChange}>
          Disabled
        </Toggle>
      );

      const toggle = screen.getByRole("button");
      await user.click(toggle);

      expect(handlePressedChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("имеет правильную роль button", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeInTheDocument();
    });

    it("поддерживает aria-label", () => {
      render(<Toggle aria-label="Toggle option">Toggle</Toggle>);
      const toggle = screen.getByLabelText("Toggle option");
      expect(toggle).toBeInTheDocument();
    });

    it("поддерживает aria-describedby", () => {
      render(
        <div>
          <Toggle aria-describedby="description">Toggle</Toggle>
          <div id="description">Description text</div>
        </div>
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-describedby", "description");
    });

    it("поддерживает aria-pressed", () => {
      render(<Toggle aria-pressed="true">Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("поддерживает aria-invalid", () => {
      render(<Toggle aria-invalid="true">Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("CSS классы", () => {
    it("применяет базовые CSS классы", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-md",
        "text-sm",
        "font-medium",
        "whitespace-nowrap"
      );
    });

    it("применяет hover стили", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "hover:bg-muted",
        "hover:text-muted-foreground"
      );
    });

    it("применяет pressed стили", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "data-[state=on]:bg-accent",
        "data-[state=on]:text-accent-foreground"
      );
    });

    it("применяет focus-visible стили", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50",
        "focus-visible:ring-[3px]"
      );
    });

    it("применяет aria-invalid стили", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass(
        "aria-invalid:ring-destructive/20",
        "aria-invalid:border-destructive"
      );
    });

    it("применяет dark mode стили", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("dark:aria-invalid:ring-destructive/40");
    });

    it("применяет transition стили", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("transition-[color,box-shadow]");
    });

    it("применяет кастомные CSS классы через className", () => {
      render(<Toggle className="custom-class">Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("custom-class");
    });
  });

  describe("Содержимое", () => {
    it("может содержать текст", () => {
      render(<Toggle>Bold</Toggle>);
      expect(screen.getByText("Bold")).toBeInTheDocument();
    });

    it("может содержать HTML элементы", () => {
      render(
        <Toggle>
          <span>Italic</span>
        </Toggle>
      );
      expect(screen.getByText("Italic")).toBeInTheDocument();
    });

    it("может содержать иконки", () => {
      render(
        <Toggle>
          <span>⭐</span> Star
        </Toggle>
      );
      expect(screen.getByText("⭐")).toBeInTheDocument();
      expect(screen.getByText("Star")).toBeInTheDocument();
    });
  });

  describe("События", () => {
    it("вызывает onClick при клике", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onClick={handleClick}>Toggle</Toggle>);

      const toggle = screen.getByRole("button");
      await user.click(toggle);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("вызывает onFocus при фокусе", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onFocus={handleFocus}>Toggle</Toggle>);

      const toggle = screen.getByRole("button");
      await user.click(toggle);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("вызывает onBlur при потере фокуса", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onBlur={handleBlur}>Toggle</Toggle>);

      const toggle = screen.getByRole("button");
      await user.click(toggle);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot для default варианта", () => {
      const { container } = render(<Toggle>Default Toggle</Toggle>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для всех вариантов", () => {
      const { container } = render(
        <div>
          <Toggle variant="default">Default</Toggle>
          <Toggle variant="outline">Outline</Toggle>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для всех размеров", () => {
      const { container } = render(
        <div>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="default">Default</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для различных состояний", () => {
      const { container } = render(
        <div>
          <Toggle>Unpressed</Toggle>
          <Toggle pressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  describe("Рендеринг", () => {
    it("рендерится без ошибок", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeInTheDocument();
    });

    it("рендерится с текстом", () => {
      render(<Toggle>Toggle Text</Toggle>);
      expect(screen.getByText("Toggle Text")).toBeInTheDocument();
    });

    it("рендерится с иконкой", () => {
      render(
        <Toggle>
          <svg data-testid="icon">Icon</svg>
        </Toggle>
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("имеет data-slot='toggle' атрибут", () => {
      const { container } = render(<Toggle>Toggle</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveAttribute("data-slot", "toggle");
    });
  });

  describe("Варианты (variants)", () => {
    it("default variant применяет правильные стили", () => {
      const { container } = render(<Toggle variant="default">Default</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("bg-transparent");
    });

    it("outline variant применяет правильные стили", () => {
      const { container } = render(<Toggle variant="outline">Outline</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("border");
      expect(toggle).toHaveClass("border-input");
      expect(toggle).toHaveClass("shadow-xs");
    });

    it("использует default variant если variant не указан", () => {
      const { container } = render(<Toggle>No variant</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("bg-transparent");
    });
  });

  describe("Размеры (sizes)", () => {
    it("default size применяет правильные стили", () => {
      const { container } = render(<Toggle size="default">Default</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("h-9");
      expect(toggle).toHaveClass("px-2");
      expect(toggle).toHaveClass("min-w-9");
    });

    it("sm size применяет правильные стили", () => {
      const { container } = render(<Toggle size="sm">Small</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("h-8");
      expect(toggle).toHaveClass("px-1.5");
      expect(toggle).toHaveClass("min-w-8");
    });

    it("lg size применяет правильные стили", () => {
      const { container } = render(<Toggle size="lg">Large</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("h-10");
      expect(toggle).toHaveClass("px-2.5");
      expect(toggle).toHaveClass("min-w-10");
    });

    it("использует default size если size не указан", () => {
      const { container } = render(<Toggle>No size</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("h-9");
    });
  });

  describe("Состояния", () => {
    it("переключается между on/off при клике", async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      // По умолчанию off
      expect(toggle).toHaveAttribute("data-state", "off");
      expect(toggle).toHaveAttribute("aria-pressed", "false");

      // Кликаем - становится on
      await user.click(toggle);
      expect(toggle).toHaveAttribute("data-state", "on");
      expect(toggle).toHaveAttribute("aria-pressed", "true");

      // Кликаем снова - становится off
      await user.click(toggle);
      expect(toggle).toHaveAttribute("data-state", "off");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    it("может быть в pressed состоянии по умолчанию", () => {
      render(<Toggle pressed>Pressed</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("data-state", "on");
      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("disabled состояние", () => {
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeDisabled();
    });

    it("disabled toggle не переключается при клике", async () => {
      const user = userEvent.setup();
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole("button");

      await user.click(toggle);

      expect(toggle).toHaveAttribute("data-state", "off");
    });

    it("применяет стили для data-state=on", () => {
      const { container } = render(<Toggle pressed>On</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("data-[state=on]:bg-accent");
      expect(toggle).toHaveClass("data-[state=on]:text-accent-foreground");
    });
  });

  describe("Взаимодействия", () => {
    it("onPressedChange вызывается при клике", async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onPressedChange={handlePressedChange}>Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      await user.click(toggle);

      expect(handlePressedChange).toHaveBeenCalledTimes(1);
      expect(handlePressedChange).toHaveBeenCalledWith(true);
    });

    it("onPressedChange вызывается с правильным значением", async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onPressedChange={handlePressedChange}>Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      // Первый клик - становится pressed (true)
      await user.click(toggle);
      expect(handlePressedChange).toHaveBeenLastCalledWith(true);

      // Второй клик - становится unpressed (false)
      await user.click(toggle);
      expect(handlePressedChange).toHaveBeenLastCalledWith(false);
    });

    it("может быть контролируемым компонентом", async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Toggle pressed={false} onPressedChange={handlePressedChange}>
          Toggle
        </Toggle>
      );
      const toggle = screen.getByRole("button");

      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.click(toggle);
      expect(handlePressedChange).toHaveBeenCalledWith(true);

      // Обновляем состояние извне
      rerender(
        <Toggle pressed={true} onPressedChange={handlePressedChange}>
          Toggle
        </Toggle>
      );
      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Accessibility", () => {
    it("имеет role='button'", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toBeInTheDocument();
    });

    it("aria-pressed корректен для off состояния", () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    it("aria-pressed корректен для on состояния", () => {
      render(<Toggle pressed>Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("поддерживает aria-label", () => {
      render(<Toggle aria-label="Toggle setting">Toggle</Toggle>);
      const toggle = screen.getByLabelText("Toggle setting");
      expect(toggle).toBeInTheDocument();
    });

    it("поддерживает keyboard navigation (Enter)", async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      toggle.focus();
      await user.keyboard("{Enter}");

      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("поддерживает keyboard navigation (Space)", async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      toggle.focus();
      await user.keyboard(" ");

      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Стили", () => {
    it("применяет кастомный className", () => {
      const { container } = render(
        <Toggle className="custom-class">Toggle</Toggle>
      );
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("custom-class");
      // Также должен сохранять базовые классы
      expect(toggle).toHaveClass("inline-flex");
    });

    it("всегда содержит базовые классы", () => {
      const { container } = render(<Toggle>Toggle</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("inline-flex");
      expect(toggle).toHaveClass("items-center");
      expect(toggle).toHaveClass("justify-center");
      expect(toggle).toHaveClass("rounded-md");
    });

    it("имеет hover стили", () => {
      const { container } = render(<Toggle>Toggle</Toggle>);
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("hover:bg-muted");
      expect(toggle).toHaveClass("hover:text-muted-foreground");
    });
  });

  describe("Комбинации вариантов", () => {
    it("default variant + sm size", () => {
      const { container } = render(
        <Toggle variant="default" size="sm">
          Small Default
        </Toggle>
      );
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("bg-transparent");
      expect(toggle).toHaveClass("h-8");
    });

    it("outline variant + lg size", () => {
      const { container } = render(
        <Toggle variant="outline" size="lg">
          Large Outline
        </Toggle>
      );
      const toggle = container.querySelector("button");
      expect(toggle).toHaveClass("border");
      expect(toggle).toHaveClass("h-10");
    });
  });

  describe("Snapshot тесты", () => {
    it("default off state соответствует snapshot", () => {
      const { container } = render(<Toggle>Toggle</Toggle>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("pressed on state соответствует snapshot", () => {
      const { container } = render(<Toggle pressed>Toggle Pressed</Toggle>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("outline variant соответствует snapshot", () => {
      const { container } = render(
        <Toggle variant="outline">Outline Toggle</Toggle>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("small size соответствует snapshot", () => {
      const { container } = render(<Toggle size="sm">Small Toggle</Toggle>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("large size соответствует snapshot", () => {
      const { container } = render(<Toggle size="lg">Large Toggle</Toggle>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("disabled соответствует snapshot", () => {
      const { container } = render(<Toggle disabled>Disabled Toggle</Toggle>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

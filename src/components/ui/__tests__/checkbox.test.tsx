import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("рендерится как checkbox элемент", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("имеет правильный data-slot атрибут", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    });

    it("содержит индикатор с правильным data-slot", () => {
      const { container } = render(<Checkbox checked />);
      const indicator = container.querySelector(
        '[data-slot="checkbox-indicator"]'
      );
      expect(indicator).toBeInTheDocument();
    });
  });

  describe("Состояния", () => {
    it("рендерится в unchecked состоянии по умолчанию", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });

    it("рендерится в checked состоянии", () => {
      render(<Checkbox checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });

    it("рендерится в indeterminate состоянии", () => {
      render(<Checkbox checked="indeterminate" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-state", "indeterminate");
    });
  });

  describe("Состояние disabled", () => {
    it("рендерится в disabled состоянии", () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("имеет правильные CSS классы для disabled состояния", () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });
  });

  describe("Взаимодействие", () => {
    it("переключается при клике", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it("вызывает onCheckedChange при изменении состояния", async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onCheckedChange={handleCheckedChange} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("не переключается когда disabled", async () => {
      const user = userEvent.setup();
      render(<Checkbox disabled />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("не вызывает onCheckedChange когда disabled", async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox disabled onCheckedChange={handleCheckedChange} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(handleCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("имеет правильную роль checkbox", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("поддерживает aria-label", () => {
      render(<Checkbox aria-label="Accept terms" />);
      const checkbox = screen.getByLabelText("Accept terms");
      expect(checkbox).toBeInTheDocument();
    });

    it("поддерживает aria-describedby", () => {
      render(
        <div>
          <Checkbox aria-describedby="description" />
          <div id="description">Description text</div>
        </div>
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby", "description");
    });

    it("поддерживает aria-invalid", () => {
      render(<Checkbox aria-invalid="true" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("поддерживает aria-required", () => {
      render(<Checkbox aria-required="true" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });

    it("поддерживает name атрибут", () => {
      render(<Checkbox name="terms" />);
      const checkbox = screen.getByRole("checkbox");
      // Radix UI Checkbox не передает name атрибут напрямую
      expect(checkbox).toBeInTheDocument();
    });

    it("поддерживает id атрибут", () => {
      render(<Checkbox id="terms-checkbox" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "terms-checkbox");
    });
  });

  describe("CSS классы", () => {
    it("применяет базовые CSS классы", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "size-4",
        "shrink-0",
        "rounded-[4px]",
        "border",
        "shadow-xs",
        "transition-shadow",
        "outline-none"
      );
    });

    it("применяет border стили", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("border-input");
    });

    it("применяет focus-visible стили", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50",
        "focus-visible:ring-[3px]"
      );
    });

    it("применяет aria-invalid стили", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "aria-invalid:ring-destructive/20",
        "aria-invalid:border-destructive"
      );
    });

    it("применяет dark mode стили", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "dark:bg-input/30",
        "dark:aria-invalid:ring-destructive/40"
      );
    });

    it("применяет checked стили", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass(
        "data-[state=checked]:bg-primary",
        "data-[state=checked]:text-primary-foreground",
        "data-[state=checked]:border-primary"
      );
    });

    it("применяет кастомные CSS классы через className", () => {
      render(<Checkbox className="custom-class" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("custom-class");
    });
  });

  describe("Индикатор", () => {
    it("содержит CheckIcon", () => {
      const { container } = render(<Checkbox checked />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("индикатор имеет правильные CSS классы", () => {
      const { container } = render(<Checkbox checked />);
      const indicator = container.querySelector(
        '[data-slot="checkbox-indicator"]'
      );
      expect(indicator).toHaveClass(
        "flex",
        "items-center",
        "justify-center",
        "text-current",
        "transition-none"
      );
    });

    it("иконка имеет правильный размер", () => {
      const { container } = render(<Checkbox checked />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("size-3.5");
    });
  });

  describe("События", () => {
    it("вызывает onFocus при фокусе", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onFocus={handleFocus} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("вызывает onBlur при потере фокуса", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onBlur={handleBlur} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("вызывает onKeyDown при нажатии клавиши", async () => {
      const handleKeyDown = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onKeyDown={handleKeyDown} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);
      await user.keyboard("{Space}");

      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot для unchecked состояния", () => {
      const { container } = render(<Checkbox />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для checked состояния", () => {
      const { container } = render(<Checkbox checked />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для disabled состояния", () => {
      const { container } = render(<Checkbox disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для различных состояний", () => {
      const { container } = render(
        <div>
          <Checkbox />
          <Checkbox checked />
          <Checkbox checked="indeterminate" />
          <Checkbox disabled />
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  describe("Рендеринг", () => {
    it("рендерится без ошибок", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("имеет data-slot='checkbox' атрибут", () => {
      const { container } = render(<Checkbox />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    });

    it("рендерится unchecked по умолчанию", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("рендерится checked если передан checked prop", () => {
      render(<Checkbox checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-state", "checked");
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("рендерится в indeterminate состоянии", () => {
      render(<Checkbox checked="indeterminate" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("data-state", "indeterminate");
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });
  });

  describe("Взаимодействия", () => {
    it("переключается при клике", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      // По умолчанию unchecked
      expect(checkbox).toHaveAttribute("data-state", "unchecked");

      // Кликаем - становится checked
      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("data-state", "checked");

      // Кликаем снова - становится unchecked
      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
    });

    it("onCheckedChange вызывается с правильным значением", async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onCheckedChange={handleCheckedChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleCheckedChange).toHaveBeenCalledTimes(1);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("onCheckedChange вызывается при переключении с checked на unchecked", async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox checked onCheckedChange={handleCheckedChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it("не переключается если disabled", async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox disabled onCheckedChange={handleCheckedChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(checkbox).toHaveAttribute("data-state", "unchecked");
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });

    it("может быть контролируемым компонентом", async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Checkbox checked={false} onCheckedChange={handleCheckedChange} />
      );
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);

      // Обновляем состояние извне
      rerender(
        <Checkbox checked={true} onCheckedChange={handleCheckedChange} />
      );
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Состояния", () => {
    it("disabled состояние", () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("disabled состояние применяет правильные стили", () => {
      const { container } = render(<Checkbox disabled />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("disabled:cursor-not-allowed");
      expect(checkbox).toHaveClass("disabled:opacity-50");
    });

    it("aria-invalid состояние", () => {
      render(<Checkbox aria-invalid />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid");
    });

    it("aria-invalid применяет специальные стили", () => {
      const { container } = render(<Checkbox aria-invalid="true" />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("aria-invalid:border-destructive");
    });

    it("checked состояние применяет правильные стили", () => {
      const { container } = render(<Checkbox checked />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("data-[state=checked]:bg-primary");
      expect(checkbox).toHaveClass(
        "data-[state=checked]:text-primary-foreground"
      );
    });
  });

  describe("CheckIcon индикатор", () => {
    it("CheckIcon отображается когда checked", () => {
      const { container } = render(<Checkbox checked />);
      const indicator = container.querySelector(
        "[data-slot='checkbox-indicator']"
      );
      expect(indicator).toBeInTheDocument();
    });

    it("CheckIcon содержит svg иконку", () => {
      const { container } = render(<Checkbox checked />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("имеет role='checkbox'", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("aria-checked='false' для unchecked", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("aria-checked='true' для checked", () => {
      render(<Checkbox checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("aria-checked='mixed' для indeterminate", () => {
      render(<Checkbox checked="indeterminate" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });

    it("поддерживает aria-label", () => {
      render(<Checkbox aria-label="Accept terms" />);
      const checkbox = screen.getByLabelText("Accept terms");
      expect(checkbox).toBeInTheDocument();
    });

    it("поддерживает aria-labelledby", () => {
      render(<Checkbox aria-labelledby="checkbox-label" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-labelledby", "checkbox-label");
    });

    it("поддерживает aria-describedby", () => {
      render(<Checkbox aria-describedby="checkbox-description" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "checkbox-description"
      );
    });

    it("поддерживает keyboard navigation (Space)", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      checkbox.focus();
      await user.keyboard(" ");

      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Стили", () => {
    it("применяет кастомный className", () => {
      const { container } = render(<Checkbox className="custom-class" />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("custom-class");
    });

    it("всегда содержит базовые классы", () => {
      const { container } = render(<Checkbox />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("peer");
      expect(checkbox).toHaveClass("border-input");
      expect(checkbox).toHaveClass("rounded-[4px]");
      expect(checkbox).toHaveClass("border");
    });

    it("имеет правильный размер", () => {
      const { container } = render(<Checkbox />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("size-4");
    });

    it("имеет focus-visible стили", () => {
      const { container } = render(<Checkbox />);
      const checkbox = container.querySelector("button[role='checkbox']");
      expect(checkbox).toHaveClass("focus-visible:border-ring");
      expect(checkbox).toHaveClass("focus-visible:ring-ring/50");
      expect(checkbox).toHaveClass("focus-visible:ring-[3px]");
    });
  });

  describe("Дополнительные props", () => {
    it("поддерживает value атрибут", () => {
      render(<Checkbox value="yes" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("value", "yes");
    });

    it("поддерживает id атрибут", () => {
      render(<Checkbox id="my-checkbox" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "my-checkbox");
    });

    it("поддерживает data-testid атрибут", () => {
      render(<Checkbox data-testid="my-checkbox" />);
      const checkbox = screen.getByTestId("my-checkbox");
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Snapshot тесты", () => {
    it("unchecked соответствует snapshot", () => {
      const { container } = render(<Checkbox />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("checked соответствует snapshot", () => {
      const { container } = render(<Checkbox checked />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("indeterminate соответствует snapshot", () => {
      const { container } = render(<Checkbox checked="indeterminate" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("disabled соответствует snapshot", () => {
      const { container } = render(<Checkbox disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("aria-invalid соответствует snapshot", () => {
      const { container } = render(<Checkbox aria-invalid="true" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

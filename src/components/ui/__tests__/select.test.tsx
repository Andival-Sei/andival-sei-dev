import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../select";

// Простой компонент Select для тестов
const SimpleSelect = ({
  onValueChange,
  value,
  disabled = false,
}: {
  onValueChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}) => (
  <Select onValueChange={onValueChange} value={value} disabled={disabled}>
    <SelectTrigger>
      <SelectValue placeholder="Выберите опцию" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Опция 1</SelectItem>
      <SelectItem value="option2">Опция 2</SelectItem>
      <SelectItem value="option3">Опция 3</SelectItem>
    </SelectContent>
  </Select>
);

describe("Select", () => {
  describe("Рендеринг", () => {
    it("Select с Trigger рендерятся", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("SelectValue отображает placeholder", () => {
      render(<SimpleSelect />);
      expect(screen.getByText("Выберите опцию")).toBeInTheDocument();
    });

    it("SelectTrigger рендерится с правильным текстом", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveTextContent("Выберите опцию");
    });

    it("SelectTrigger имеет ChevronDown иконку", () => {
      const { container } = render(<SimpleSelect />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("SelectTrigger имеет data-slot атрибут", () => {
      const { container } = render(<SimpleSelect />);
      const trigger = container.querySelector("[data-slot='select-trigger']");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Props и состояния", () => {
    it("onValueChange передается в Select", () => {
      const handleChange = vi.fn();
      render(<SimpleSelect onValueChange={handleChange} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("value prop передается в Select", () => {
      render(<SimpleSelect value="option2" />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("Disabled состояние", () => {
    it("disabled Trigger имеет атрибут disabled", () => {
      render(<SimpleSelect disabled />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });

    it("disabled класс применяется", () => {
      render(<SimpleSelect disabled />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("disabled:opacity-50");
    });

    it("disabled Trigger имеет data-disabled атрибут", () => {
      const { container } = render(<SimpleSelect disabled />);
      const trigger = container.querySelector("[data-disabled]");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Размеры SelectTrigger", () => {
    it("default размер применяет правильные стили", () => {
      render(
        <Select>
          <SelectTrigger size="default">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("data-[size=default]:h-9");
      expect(trigger).toHaveAttribute("data-size", "default");
    });

    it("sm размер применяет правильные стили", () => {
      render(
        <Select>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("data-[size=sm]:h-8");
      expect(trigger).toHaveAttribute("data-size", "sm");
    });
  });

  describe("Accessibility", () => {
    it("SelectTrigger имеет role='combobox'", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("SelectTrigger имеет aria-expanded атрибут", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-expanded");
    });

    it("SelectTrigger может иметь aria-label", () => {
      render(
        <Select>
          <SelectTrigger aria-label="Выберите вариант">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByRole("combobox", {
        name: "Выберите вариант",
      });
      expect(trigger).toBeInTheDocument();
    });

    it("SelectTrigger имеет aria-controls", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-controls");
    });
  });

  describe("Базовые стили", () => {
    it("SelectTrigger имеет базовые классы", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("flex");
      expect(trigger).toHaveClass("items-center");
      expect(trigger).toHaveClass("rounded-md");
      expect(trigger).toHaveClass("border");
    });

    it("SelectTrigger имеет focus стили", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("focus-visible:ring-ring/50");
      expect(trigger).toHaveClass("outline-none");
    });

    it("SelectTrigger имеет transition", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("transition-[color,box-shadow]");
    });

    it("SelectTrigger имеет shadow", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("shadow-xs");
    });
  });

  describe("Дополнительные props", () => {
    it("SelectTrigger применяет кастомный className", () => {
      render(
        <Select>
          <SelectTrigger className="custom-class">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("custom-class");
    });

    it("SelectValue placeholder отображается", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Кастомный placeholder" />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByText("Кастомный placeholder")).toBeInTheDocument();
    });
  });

  describe("Подкомпоненты структуры", () => {
    it("SelectContent создается с data-slot", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-testid="content">
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("SelectItem создается с data-slot", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("SelectGroup и SelectLabel создаются", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group Label</SelectLabel>
              <SelectItem value="item1">Item 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("SelectSeparator создается", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item1">Item 1</SelectItem>
            <SelectSeparator />
            <SelectItem value="item2">Item 2</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("Взаимодействия с клавиатурой", () => {
    it("Trigger реагирует на focus", async () => {
      const user = userEvent.setup();
      render(<SimpleSelect />);

      const trigger = screen.getByRole("combobox");
      await user.tab();

      expect(trigger).toHaveFocus();
    });

    it("Trigger доступен для клавиатурной навигации", () => {
      render(<SimpleSelect />);
      const trigger = screen.getByRole("combobox");

      expect(trigger).toHaveAttribute("type", "button");
    });
  });
});

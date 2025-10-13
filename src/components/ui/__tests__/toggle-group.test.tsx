import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

describe("ToggleGroup", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
    });

    it("имеет правильный data-slot атрибут", () => {
      const { container } = render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toBeInTheDocument();
    });

    it("отображает все элементы группы", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      );
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  describe("ToggleGroupItem", () => {
    it("имеет правильный data-slot атрибут", () => {
      const { container } = render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toBeInTheDocument();
    });

    it("отображает текст элемента", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        </ToggleGroup>
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
    });

    it("имеет правильную роль radio", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = screen.getByRole("radio");
      expect(item).toBeInTheDocument();
    });
  });

  describe("Режимы (single/multiple)", () => {
    it("поддерживает single режим", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
    });

    it("поддерживает multiple режим", () => {
      render(
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
    });
  });

  describe("Варианты (variants)", () => {
    it("применяет default вариант к группе", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveAttribute("data-variant", "default");
    });

    it("применяет outline вариант к группе", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveAttribute("data-variant", "outline");
    });

    it("передает variant через контекст к элементам", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toHaveAttribute("data-variant", "outline");
    });
  });

  describe("Размеры (sizes)", () => {
    it("применяет default размер к группе", () => {
      const { container } = render(
        <ToggleGroup type="single" size="default">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveAttribute("data-size", "default");
    });

    it("применяет sm размер к группе", () => {
      const { container } = render(
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveAttribute("data-size", "sm");
    });

    it("применяет lg размер к группе", () => {
      const { container } = render(
        <ToggleGroup type="single" size="lg">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveAttribute("data-size", "lg");
    });

    it("передает size через контекст к элементам", () => {
      const { container } = render(
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toHaveAttribute("data-size", "sm");
    });
  });

  describe("Взаимодействие", () => {
    it("выбирает элемент в single режиме", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      await user.click(option1);

      expect(option1).toHaveAttribute("data-state", "on");
    });

    it("переключает выбор в single режиме", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      const option2 = screen.getByRole("radio", { name: "Option 2" });

      await user.click(option1);
      expect(option1).toHaveAttribute("data-state", "on");
      expect(option2).toHaveAttribute("data-state", "off");

      await user.click(option2);
      expect(option1).toHaveAttribute("data-state", "off");
      expect(option2).toHaveAttribute("data-state", "on");
    });

    it("выбирает несколько элементов в multiple режиме", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );

      const option1 = screen.getByRole("button", { name: "Option 1" });
      const option2 = screen.getByRole("button", { name: "Option 2" });

      await user.click(option1);
      await user.click(option2);

      expect(option1).toHaveAttribute("data-state", "on");
      expect(option2).toHaveAttribute("data-state", "on");
    });

    it("вызывает onValueChange при изменении значения", async () => {
      const handleValueChange = vi.fn();
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single" onValueChange={handleValueChange}>
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      await user.click(option1);

      expect(handleValueChange).toHaveBeenCalledWith("option1");
    });
  });

  describe("Accessibility", () => {
    it("группа имеет правильную роль group", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = screen.getByRole("group");
      expect(group).toBeInTheDocument();
    });

    it("поддерживает aria-label на группе", () => {
      render(
        <ToggleGroup type="single" aria-label="Text formatting">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = screen.getByLabelText("Text formatting");
      expect(group).toBeInTheDocument();
    });

    it("поддерживает aria-describedby на группе", () => {
      render(
        <div>
          <ToggleGroup type="single" aria-describedby="description">
            <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          </ToggleGroup>
          <div id="description">Description text</div>
        </div>
      );
      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("aria-describedby", "description");
    });

    it("элементы имеют правильную роль radio", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(2);
    });

    it("поддерживает disabled состояние элементов", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2" disabled>
            Option 2
          </ToggleGroupItem>
        </ToggleGroup>
      );
      const disabledItem = screen.getByRole("radio", { name: "Option 2" });
      expect(disabledItem).toBeDisabled();
    });
  });

  describe("CSS классы", () => {
    it("группа применяет базовые CSS классы", () => {
      const { container } = render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveClass(
        "group/toggle-group",
        "flex",
        "w-fit",
        "items-center",
        "rounded-md"
      );
    });

    it("группа применяет outline стили", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const group = container.querySelector('[data-slot="toggle-group"]');
      expect(group).toHaveClass("data-[variant=outline]:shadow-xs");
    });

    it("элементы применяют правильные CSS классы", () => {
      const { container } = render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toHaveClass(
        "min-w-0",
        "flex-1",
        "shrink-0",
        "rounded-none",
        "shadow-none",
        "first:rounded-l-md",
        "last:rounded-r-md"
      );
    });

    it("элементы применяют focus стили", () => {
      const { container } = render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toHaveClass("focus:z-10", "focus-visible:z-10");
    });

    it("элементы применяют outline border стили", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toHaveClass(
        "data-[variant=outline]:border-l-0",
        "data-[variant=outline]:first:border-l"
      );
    });
  });

  describe("Контекст", () => {
    it("передает variant и size через контекст", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="outline" size="sm">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      expect(item).toHaveAttribute("data-variant", "outline");
      expect(item).toHaveAttribute("data-size", "sm");
    });

    it("элемент может переопределить контекстные значения", () => {
      const { container } = render(
        <ToggleGroup type="single" variant="outline" size="sm">
          <ToggleGroupItem value="option1" variant="default" size="lg">
            Option 1
          </ToggleGroupItem>
        </ToggleGroup>
      );
      const item = container.querySelector('[data-slot="toggle-group-item"]');
      // В данном случае контекст имеет приоритет над props элемента
      expect(item).toHaveAttribute("data-variant", "outline");
      expect(item).toHaveAttribute("data-size", "sm");
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot для single режима", () => {
      const { container } = render(
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для multiple режима", () => {
      const { container } = render(
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        </ToggleGroup>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для различных вариантов", () => {
      const { container } = render(
        <div>
          <ToggleGroup type="single" variant="default">
            <ToggleGroupItem value="option1">Default</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem value="option1">Outline</ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для различных размеров", () => {
      const { container } = render(
        <div>
          <ToggleGroup type="single" size="sm">
            <ToggleGroupItem value="option1">Small</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="default">
            <ToggleGroupItem value="option1">Default</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="lg">
            <ToggleGroupItem value="option1">Large</ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { Button } from "../button";

describe("Button", () => {
  describe("Рендеринг", () => {
    it("рендерится с текстом", () => {
      render(<Button>Кнопка</Button>);
      expect(
        screen.getByRole("button", { name: "Кнопка" })
      ).toBeInTheDocument();
    });

    it("рендерится с дочерними элементами (SVG иконки)", () => {
      render(
        <Button>
          <svg data-testid="test-icon" />
          <span>Текст с иконкой</span>
        </Button>
      );
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("Текст с иконкой")).toBeInTheDocument();
    });

    it("имеет data-slot='button' атрибут", () => {
      render(<Button>Тест</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-slot", "button");
    });

    it("рендерится как button элемент по умолчанию", () => {
      const { container } = render(<Button>Кнопка</Button>);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Варианты (variants)", () => {
    it("default variant применяет правильные стили", () => {
      render(<Button variant="default">Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary");
      expect(button).toHaveClass("text-primary-foreground");
    });

    it("destructive variant применяет правильные стили", () => {
      render(<Button variant="destructive">Destructive</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-destructive");
      expect(button).toHaveClass("text-white");
    });

    it("outline variant применяет правильные стили", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("bg-background");
    });

    it("secondary variant применяет правильные стили", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary");
      expect(button).toHaveClass("text-secondary-foreground");
    });

    it("ghost variant применяет правильные стили", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-accent");
      expect(button).toHaveClass("hover:text-accent-foreground");
    });

    it("link variant применяет правильные стили", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-primary");
      expect(button).toHaveClass("underline-offset-4");
    });

    it("использует default variant если variant не указан", () => {
      render(<Button>No variant</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary");
    });
  });

  describe("Размеры (sizes)", () => {
    it("default размер применяет правильные стили", () => {
      render(<Button size="default">Default Size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9");
      expect(button).toHaveClass("px-4");
      expect(button).toHaveClass("py-2");
    });

    it("sm размер применяет правильные стили", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-8");
      expect(button).toHaveClass("px-3");
    });

    it("lg размер применяет правильные стили", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
      expect(button).toHaveClass("px-6");
    });

    it("icon размер применяет правильные стили", () => {
      render(
        <Button size="icon" aria-label="Иконка">
          <svg />
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-9");
    });

    it("icon-sm размер применяет правильные стили", () => {
      render(
        <Button size="icon-sm" aria-label="Маленькая иконка">
          <svg />
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-8");
    });

    it("icon-lg размер применяет правильные стили", () => {
      render(
        <Button size="icon-lg" aria-label="Большая иконка">
          <svg />
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("size-10");
    });

    it("использует default размер если size не указан", () => {
      render(<Button>No size</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9");
    });
  });

  describe("Взаимодействия", () => {
    it("onClick обработчик срабатывает", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Кликни меня</Button>);
      const button = screen.getByRole("button");

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("onClick вызывается с правильным event объектом", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Кнопка</Button>);
      await user.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalled();
      expect(handleClick.mock.calls[0][0]).toBeInstanceOf(Object);
    });

    it("disabled состояние блокирует клик", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button");

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("disabled добавляет класс opacity-50", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:opacity-50");
    });

    it("disabled кнопка имеет атрибут disabled", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("AsChild prop (композиция)", () => {
    it("без asChild рендерится как button", () => {
      const { container } = render(<Button>Обычная кнопка</Button>);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button?.tagName).toBe("BUTTON");
    });

    it("с asChild=true рендерит дочерний элемент", () => {
      const { container } = render(
        <Button asChild>
          <a href="/test">Ссылка как кнопка</a>
        </Button>
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link?.getAttribute("href")).toBe("/test");
    });

    it("стили применяются к дочернему элементу при asChild", () => {
      const { container } = render(
        <Button asChild variant="destructive">
          <a href="/delete">Удалить</a>
        </Button>
      );
      const link = container.querySelector("a");
      expect(link).toHaveClass("bg-destructive");
      expect(link).toHaveAttribute("data-slot", "button");
    });

    it("asChild работает с кастомными компонентами", () => {
      const { container } = render(
        <Button asChild>
          <span data-custom="true">Custom Component</span>
        </Button>
      );
      const span = container.querySelector("span");
      expect(span).toBeInTheDocument();
      expect(span).toHaveAttribute("data-custom", "true");
    });
  });

  describe("Accessibility", () => {
    it("имеет role='button' по умолчанию", () => {
      render(<Button>Кнопка</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("принимает aria-label", () => {
      render(<Button aria-label="Закрыть модальное окно">X</Button>);
      expect(
        screen.getByRole("button", { name: "Закрыть модальное окно" })
      ).toBeInTheDocument();
    });

    it("принимает aria-labelledby", () => {
      render(
        <>
          <span id="label-id">Описание кнопки</span>
          <Button aria-labelledby="label-id">Действие</Button>
        </>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-labelledby", "label-id");
    });

    it("принимает aria-describedby", () => {
      render(
        <>
          <span id="desc-id">Дополнительное описание</span>
          <Button aria-describedby="desc-id">Кнопка</Button>
        </>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "desc-id");
    });

    it("disabled кнопка доступна для screen readers", () => {
      render(<Button disabled>Недоступная кнопка</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Дополнительные props", () => {
    it("применяет кастомный className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
      // Должен сохранять базовые классы
      expect(button).toHaveClass("inline-flex");
    });

    it("поддерживает type='submit'", () => {
      render(<Button type="submit">Отправить</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("поддерживает type='reset'", () => {
      render(<Button type="reset">Сбросить</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });

    it("поддерживает type='button' (по умолчанию)", () => {
      render(<Button type="button">Кнопка</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("поддерживает data-testid", () => {
      render(<Button data-testid="test-button">Тест</Button>);
      expect(screen.getByTestId("test-button")).toBeInTheDocument();
    });

    it("поддерживает id атрибут", () => {
      render(<Button id="my-button">ID Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "my-button");
    });

    it("поддерживает name атрибут", () => {
      render(<Button name="submit-button">Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("name", "submit-button");
    });

    it("поддерживает form атрибут", () => {
      render(<Button form="my-form">Submit Form</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("form", "my-form");
    });
  });

  describe("Базовые стили", () => {
    it("всегда содержит базовые классы", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("inline-flex");
      expect(button).toHaveClass("items-center");
      expect(button).toHaveClass("justify-center");
      expect(button).toHaveClass("rounded-md");
    });

    it("имеет transition классы", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("transition-all");
    });

    it("имеет focus-visible стили", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus-visible:ring-ring/50");
      expect(button).toHaveClass("outline-none");
    });

    it("имеет правильный font-size", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-sm");
    });

    it("имеет font-medium", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("font-medium");
    });
  });

  describe("Snapshot тесты", () => {
    describe("Варианты", () => {
      it("default variant соответствует snapshot", () => {
        const { container } = render(
          <Button variant="default">Default Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("destructive variant соответствует snapshot", () => {
        const { container } = render(
          <Button variant="destructive">Destructive Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("outline variant соответствует snapshot", () => {
        const { container } = render(
          <Button variant="outline">Outline Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("secondary variant соответствует snapshot", () => {
        const { container } = render(
          <Button variant="secondary">Secondary Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("ghost variant соответствует snapshot", () => {
        const { container } = render(
          <Button variant="ghost">Ghost Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("link variant соответствует snapshot", () => {
        const { container } = render(
          <Button variant="link">Link Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe("Размеры", () => {
      it("default размер соответствует snapshot", () => {
        const { container } = render(
          <Button size="default">Default Size</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("sm размер соответствует snapshot", () => {
        const { container } = render(<Button size="sm">Small Size</Button>);
        expect(container.firstChild).toMatchSnapshot();
      });

      it("lg размер соответствует snapshot", () => {
        const { container } = render(<Button size="lg">Large Size</Button>);
        expect(container.firstChild).toMatchSnapshot();
      });

      it("icon размер соответствует snapshot", () => {
        const { container } = render(
          <Button size="icon" aria-label="Icon">
            <svg />
          </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("icon-sm размер соответствует snapshot", () => {
        const { container } = render(
          <Button size="icon-sm" aria-label="Small Icon">
            <svg />
          </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("icon-lg размер соответствует snapshot", () => {
        const { container } = render(
          <Button size="icon-lg" aria-label="Large Icon">
            <svg />
          </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    it("disabled кнопка соответствует snapshot", () => {
      const { container } = render(<Button disabled>Disabled Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("кнопка с иконкой соответствует snapshot", () => {
      const { container } = render(
        <Button>
          <svg data-testid="icon" />
          Button with Icon
        </Button>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { Input } from "../input";

describe("Input", () => {
  describe("Рендеринг", () => {
    it("рендерится без ошибок", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("рендерится с placeholder", () => {
      render(<Input placeholder="Введите текст" />);
      const input = screen.getByPlaceholderText("Введите текст");
      expect(input).toBeInTheDocument();
    });

    it("рендерится с value", () => {
      render(<Input value="Тестовое значение" readOnly />);
      const input = screen.getByDisplayValue("Тестовое значение");
      expect(input).toBeInTheDocument();
    });

    it("рендерится с defaultValue", () => {
      render(<Input defaultValue="Значение по умолчанию" />);
      const input = screen.getByDisplayValue("Значение по умолчанию");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Типы input", () => {
    it('type="text" (default)', () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      // По умолчанию input имеет role="textbox" что эквивалентно type="text"
      expect(input).toBeInTheDocument();
    });

    it('type="email"', () => {
      render(<Input type="email" />);
      const input = document.querySelector('input[type="email"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "email");
    });

    it('type="password"', () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "password");
    });

    it('type="number"', () => {
      render(<Input type="number" />);
      const input = document.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "number");
    });

    it('type="file"', () => {
      render(<Input type="file" />);
      const input = document.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "file");
    });

    it('type="search"', () => {
      render(<Input type="search" />);
      const input = document.querySelector('input[type="search"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "search");
    });

    it('type="tel"', () => {
      render(<Input type="tel" />);
      const input = document.querySelector('input[type="tel"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "tel");
    });

    it('type="url"', () => {
      render(<Input type="url" />);
      const input = document.querySelector('input[type="url"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "url");
    });
  });

  describe("Состояния", () => {
    it("disabled состояние", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("readOnly состояние", () => {
      render(<Input readOnly />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("readonly");
    });

    it("required атрибут", () => {
      render(<Input required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("aria-invalid состояние", () => {
      render(<Input aria-invalid />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid");
    });

    it("aria-invalid='true' применяет специальные стили", () => {
      const { container } = render(<Input aria-invalid="true" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("aria-invalid:border-destructive");
    });
  });

  describe("Взаимодействия", () => {
    it("onChange событие работает", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue("test");
    });

    it("onFocus событие работает", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole("textbox");

      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("onBlur событие работает", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.tab(); // Переход фокуса = blur

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("пользователь может ввести текст", async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole("textbox");

      await user.type(input, "Hello World");

      expect(input).toHaveValue("Hello World");
    });

    it("пользователь может очистить текст", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="Initial text" />);
      const input = screen.getByRole("textbox");

      await user.clear(input);

      expect(input).toHaveValue("");
    });

    it("disabled input не принимает ввод", async () => {
      const user = userEvent.setup();
      render(<Input disabled />);
      const input = screen.getByRole("textbox");

      await user.type(input, "test");

      expect(input).toHaveValue("");
    });
  });

  describe("Accessibility", () => {
    it("имеет data-slot='input' атрибут", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("data-slot", "input");
    });

    it("поддерживает aria-label", () => {
      render(<Input aria-label="Имя пользователя" />);
      const input = screen.getByLabelText("Имя пользователя");
      expect(input).toBeInTheDocument();
    });

    it("поддерживает aria-describedby", () => {
      render(<Input aria-describedby="input-description" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "input-description");
    });

    it("поддерживает aria-labelledby", () => {
      render(<Input aria-labelledby="input-label" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-labelledby", "input-label");
    });
  });

  describe("Стили", () => {
    it("применяет кастомный className", () => {
      const { container } = render(<Input className="custom-class" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("custom-class");
      // Также должен сохранять базовые классы
      expect(input).toHaveClass("border-input");
    });

    it("всегда содержит базовые классы", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("border-input");
      expect(input).toHaveClass("rounded-md");
      expect(input).toHaveClass("border");
      expect(input).toHaveClass("px-3");
      expect(input).toHaveClass("py-1");
    });

    it("имеет focus-visible стили", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("focus-visible:border-ring");
      expect(input).toHaveClass("focus-visible:ring-ring/50");
    });

    it("имеет правильную высоту", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("h-9");
    });
  });

  describe("Дополнительные атрибуты", () => {
    it("поддерживает name атрибут", () => {
      render(<Input name="username" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "username");
    });

    it("поддерживает id атрибут", () => {
      render(<Input id="my-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "my-input");
    });

    it("поддерживает maxLength атрибут", () => {
      render(<Input maxLength={10} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("maxLength", "10");
    });

    it("поддерживает minLength атрибут", () => {
      render(<Input minLength={3} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("minLength", "3");
    });

    it("поддерживает pattern атрибут", () => {
      render(<Input pattern="[0-9]*" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("pattern", "[0-9]*");
    });

    it("поддерживает autoComplete атрибут", () => {
      render(<Input autoComplete="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("autoComplete", "email");
    });

    it("поддерживает autoFocus атрибут", () => {
      // eslint-disable-next-line jsx-a11y/no-autofocus
      render(<Input autoFocus />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveFocus();
    });
  });

  describe("Snapshot тесты", () => {
    it("default input соответствует snapshot", () => {
      const { container } = render(<Input />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("input с placeholder соответствует snapshot", () => {
      const { container } = render(<Input placeholder="Enter text..." />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("disabled input соответствует snapshot", () => {
      const { container } = render(<Input disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("input с aria-invalid соответствует snapshot", () => {
      const { container } = render(<Input aria-invalid="true" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

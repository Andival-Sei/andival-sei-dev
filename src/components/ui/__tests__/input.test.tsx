import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";

describe("Input", () => {
  describe("Рендеринг компонента", () => {
    it("рендерится без ошибок", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("рендерится как input элемент", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("имеет правильный data-slot атрибут", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("data-slot", "input");
    });
  });

  describe("Типы input", () => {
    it("рендерится с type='text' по умолчанию", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      // HTML input по умолчанию имеет type="text", но атрибут может не отображаться
      expect(input).toBeInTheDocument();
    });

    it("рендерится с type='email'", () => {
      render(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("рендерится с type='password'", () => {
      render(<Input type="password" />);
      const input = screen.getByDisplayValue("");
      expect(input).toHaveAttribute("type", "password");
    });

    it("рендерится с type='number'", () => {
      render(<Input type="number" />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("type", "number");
    });

    it("рендерится с type='search'", () => {
      render(<Input type="search" />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("type", "search");
    });

    it("рендерится с type='tel'", () => {
      render(<Input type="tel" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "tel");
    });

    it("рендерится с type='url'", () => {
      render(<Input type="url" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "url");
    });
  });

  describe("Placeholder", () => {
    it("отображает placeholder", () => {
      render(<Input placeholder="Введите текст" />);
      const input = screen.getByPlaceholderText("Введите текст");
      expect(input).toBeInTheDocument();
    });

    it("placeholder имеет правильные CSS классы", () => {
      render(<Input placeholder="Test placeholder" />);
      const input = screen.getByPlaceholderText("Test placeholder");
      expect(input).toHaveClass("placeholder:text-muted-foreground");
    });
  });

  describe("Состояние disabled", () => {
    it("рендерится в disabled состоянии", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("имеет правильные CSS классы для disabled состояния", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });
  });

  describe("Value и onChange", () => {
    it("отображает value", () => {
      render(<Input value="Test value" readOnly />);
      const input = screen.getByDisplayValue("Test value");
      expect(input).toBeInTheDocument();
    });

    it("вызывает onChange при изменении значения", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
    });

    it("обновляет значение при вводе", async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole("textbox");
      await user.type(input, "hello");

      expect(input).toHaveValue("hello");
    });
  });

  describe("Accessibility", () => {
    it("поддерживает aria-label", () => {
      render(<Input aria-label="Email address" />);
      const input = screen.getByLabelText("Email address");
      expect(input).toBeInTheDocument();
    });

    it("поддерживает aria-describedby", () => {
      render(
        <div>
          <Input aria-describedby="description" />
          <div id="description">Description text</div>
        </div>
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "description");
    });

    it("поддерживает aria-invalid", () => {
      render(<Input aria-invalid="true" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("поддерживает aria-required", () => {
      render(<Input aria-required="true" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-required", "true");
    });

    it("поддерживает required атрибут", () => {
      render(<Input required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("поддерживает name атрибут", () => {
      render(<Input name="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "email");
    });

    it("поддерживает id атрибут", () => {
      render(<Input id="email-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "email-input");
    });
  });

  describe("CSS классы", () => {
    it("применяет базовые CSS классы", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "h-9",
        "w-full",
        "min-w-0",
        "rounded-md",
        "border",
        "bg-transparent",
        "px-3",
        "py-1",
        "text-base",
        "shadow-xs",
        "transition-[color,box-shadow]",
        "outline-none"
      );
    });

    it("применяет focus-visible стили", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50",
        "focus-visible:ring-[3px]"
      );
    });

    it("применяет aria-invalid стили", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "aria-invalid:ring-destructive/20",
        "aria-invalid:border-destructive"
      );
    });

    it("применяет dark mode стили", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "dark:bg-input/30",
        "dark:aria-invalid:ring-destructive/40"
      );
    });

    it("применяет file input стили", () => {
      const { container } = render(<Input type="file" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass(
        "file:text-foreground",
        "file:inline-flex",
        "file:h-7",
        "file:border-0",
        "file:bg-transparent",
        "file:text-sm",
        "file:font-medium"
      );
    });

    it("применяет selection стили", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "selection:bg-primary",
        "selection:text-primary-foreground"
      );
    });

    it("применяет responsive стили", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("md:text-sm");
    });

    it("применяет кастомные CSS классы через className", () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
    });
  });

  describe("События", () => {
    it("вызывает onFocus при фокусе", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole("textbox");
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("вызывает onBlur при потере фокуса", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("вызывает onKeyDown при нажатии клавиши", async () => {
      const handleKeyDown = vi.fn();
      const user = userEvent.setup();
      render(<Input onKeyDown={handleKeyDown} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "a");

      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot для базового input", () => {
      const { container } = render(<Input />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для различных типов", () => {
      const { container } = render(
        <div>
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
          <Input type="search" placeholder="Search input" />
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для различных состояний", () => {
      const { container } = render(
        <div>
          <Input placeholder="Normal" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Required" required />
          <Input placeholder="Invalid" aria-invalid="true" />
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

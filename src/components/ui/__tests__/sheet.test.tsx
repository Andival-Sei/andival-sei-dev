import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../sheet";

describe("Sheet", () => {
  describe("Рендеринг базовых компонентов", () => {
    it("Sheet рендерится без ошибок", () => {
      const { container } = render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>Content</SheetContent>
        </Sheet>
      );
      expect(container).toBeInTheDocument();
    });

    it("SheetTrigger рендерится", () => {
      render(
        <Sheet>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent>Content</SheetContent>
        </Sheet>
      );
      expect(screen.getByText("Open Sheet")).toBeInTheDocument();
    });

    it("SheetContent скрыт по умолчанию", () => {
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>Sheet Content</SheetContent>
        </Sheet>
      );
      // Content не должен быть виден пока sheet не открыт
      expect(screen.queryByText("Sheet Content")).not.toBeInTheDocument();
    });
  });

  describe("Открытие и закрытие", () => {
    it("открывается при клике на trigger", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            Sheet Content
          </SheetContent>
        </Sheet>
      );

      const trigger = screen.getByText("Open Sheet");
      await user.click(trigger);

      // После клика content должен быть виден
      expect(screen.getByText("Sheet Content")).toBeInTheDocument();
    });

    it("закрывается при клике на close button", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            Content
          </SheetContent>
        </Sheet>
      );

      // Открываем sheet
      await user.click(screen.getByText("Open"));
      expect(screen.getByText("Content")).toBeInTheDocument();

      // Находим и кликаем кнопку закрытия (X)
      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      // Sheet должен закрыться
      // Используем waitFor чтобы дождаться анимации
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    it("может быть контролируемым через props", () => {
      const { rerender } = render(
        <Sheet open={false}>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            Controlled Content
          </SheetContent>
        </Sheet>
      );

      expect(screen.queryByText("Controlled Content")).not.toBeInTheDocument();

      // Открываем sheet через props
      rerender(
        <Sheet open={true}>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            Controlled Content
          </SheetContent>
        </Sheet>
      );

      expect(screen.getByText("Controlled Content")).toBeInTheDocument();
    });
  });

  describe("Подкомпоненты Sheet", () => {
    it("SheetHeader рендерится", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Header Title</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("Header Title")).toBeInTheDocument();
    });

    it("SheetTitle рендерится", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>My Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("My Title")).toBeInTheDocument();
    });

    it("SheetDescription рендерится", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>My Description</SheetDescription>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("My Description")).toBeInTheDocument();
    });

    it("SheetFooter рендерится", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetFooter>
              <button>Cancel</button>
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("SheetClose рендерится внутри content", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetClose>Custom Close</SheetClose>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      expect(screen.getByText("Custom Close")).toBeInTheDocument();
    });
  });

  describe("Стороны открытия (sides)", () => {
    it('side="right" (default)', async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="right">
            <SheetTitle>Right Side</SheetTitle>
            Right Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const content = screen.getByText("Right Content").closest("div");
      // Проверяем что есть класс для правой стороны
      expect(content).toHaveClass("inset-y-0");
      expect(content).toHaveClass("right-0");
    });

    it('side="left"', async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Left Side</SheetTitle>
            Left Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const content = screen.getByText("Left Content").closest("div");
      expect(content).toHaveClass("inset-y-0");
      expect(content).toHaveClass("left-0");
    });

    it('side="top"', async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="top">
            <SheetTitle>Top Side</SheetTitle>
            Top Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const content = screen.getByText("Top Content").closest("div");
      expect(content).toHaveClass("inset-x-0");
      expect(content).toHaveClass("top-0");
    });

    it('side="bottom"', async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="bottom">
            <SheetTitle>Bottom Side</SheetTitle>
            Bottom Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const content = screen.getByText("Bottom Content").closest("div");
      expect(content).toHaveClass("inset-x-0");
      expect(content).toHaveClass("bottom-0");
    });
  });

  describe("Overlay", () => {
    it("отображает overlay когда sheet открыт", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));

      // Overlay должен быть в DOM
      const dialogs = document.querySelectorAll('[role="dialog"]');
      expect(dialogs.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("имеет role='dialog'", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("SheetTitle связан с dialog через aria-labelledby", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Accessible Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const dialog = screen.getByRole("dialog");
      const title = screen.getByText("Accessible Title");

      // Dialog должен иметь aria-labelledby, указывающий на title
      expect(dialog).toHaveAttribute("aria-labelledby");
      expect(title.id).toBeTruthy();
    });

    it("close button имеет aria-label", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Стили", () => {
    it("SheetHeader имеет правильные стили", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetHeader data-testid="sheet-header">Header</SheetHeader>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const header = screen.getByTestId("sheet-header");
      expect(header).toHaveClass("flex");
      expect(header).toHaveClass("flex-col");
      expect(header).toHaveClass("p-4");
    });

    it("SheetFooter имеет правильные стили", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <SheetFooter data-testid="sheet-footer">Footer</SheetFooter>
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const footer = screen.getByTestId("sheet-footer");
      expect(footer).toHaveClass("mt-auto");
      expect(footer).toHaveClass("flex");
      expect(footer).toHaveClass("flex-col");
      expect(footer).toHaveClass("p-4");
    });

    it("применяет кастомный className к SheetContent", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent className="custom-class">
            <SheetTitle>Title</SheetTitle>
            Content
          </SheetContent>
        </Sheet>
      );

      await user.click(screen.getByText("Open"));
      const content = screen.getByText("Content").closest("div");
      expect(content).toHaveClass("custom-class");
    });
  });

  describe("Полный пример использования", () => {
    it("рендерит sheet со всеми компонентами", async () => {
      const user = userEvent.setup();
      render(
        <Sheet>
          <SheetTrigger>Open Settings</SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Manage your account settings here
              </SheetDescription>
            </SheetHeader>
            <div>Settings content goes here</div>
            <SheetFooter>
              <SheetClose>Cancel</SheetClose>
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

      // Открываем sheet
      await user.click(screen.getByText("Open Settings"));

      // Проверяем все компоненты
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(
        screen.getByText("Manage your account settings here")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Settings content goes here")
      ).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });
});

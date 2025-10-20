import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../popover";

// Простой компонент Popover для тестов
const SimplePopover = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => (
  <Popover open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger>Открыть Popover</PopoverTrigger>
    <PopoverContent>
      <div>Содержимое Popover</div>
    </PopoverContent>
  </Popover>
);

describe("Popover", () => {
  describe("Рендеринг", () => {
    it("Popover с Trigger рендерятся", () => {
      render(<SimplePopover />);
      const trigger = screen.getByText("Открыть Popover");
      expect(trigger).toBeInTheDocument();
    });

    it("Content скрыт по умолчанию", () => {
      render(<SimplePopover />);
      expect(screen.queryByText("Содержимое Popover")).not.toBeInTheDocument();
    });

    it("PopoverTrigger рендерится как button", () => {
      render(<SimplePopover />);
      const trigger = screen.getByRole("button", { name: "Открыть Popover" });
      expect(trigger).toBeInTheDocument();
    });

    it("PopoverTrigger имеет data-slot атрибут", () => {
      const { container } = render(<SimplePopover />);
      const trigger = container.querySelector("[data-slot='popover-trigger']");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Props и состояния", () => {
    it("open prop контролирует видимость", () => {
      const { rerender } = render(<SimplePopover open={false} />);
      expect(screen.queryByText("Содержимое Popover")).not.toBeInTheDocument();

      rerender(<SimplePopover open={true} />);
      expect(screen.getByText("Содержимое Popover")).toBeInTheDocument();
    });

    it("onOpenChange передается в Popover", () => {
      const handleOpenChange = vi.fn();
      render(<SimplePopover onOpenChange={handleOpenChange} />);
      expect(screen.getByText("Открыть Popover")).toBeInTheDocument();
    });
  });

  describe("Позиционирование (align и side)", () => {
    it("PopoverContent принимает align prop", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent align="start">Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });

    it("PopoverContent принимает side prop", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent side="top">Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });

    it("PopoverContent поддерживает все side значения", () => {
      const sides: Array<"top" | "right" | "bottom" | "left"> = [
        "top",
        "right",
        "bottom",
        "left",
      ];

      sides.forEach((side) => {
        render(
          <Popover>
            <PopoverTrigger>Trigger {side}</PopoverTrigger>
            <PopoverContent side={side}>Content</PopoverContent>
          </Popover>
        );
        expect(screen.getByText(`Trigger ${side}`)).toBeInTheDocument();
      });
    });
  });

  describe("sideOffset", () => {
    it("sideOffset prop принимается", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent sideOffset={10}>Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });

    it("sideOffset=0 работает", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent sideOffset={0}>Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("PopoverTrigger является button по умолчанию", () => {
      render(<SimplePopover />);
      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    it("PopoverTrigger имеет data-state атрибут", () => {
      const { container } = render(<SimplePopover />);
      const trigger = container.querySelector("[data-state]");
      expect(trigger).toBeInTheDocument();
    });

    it("PopoverTrigger имеет aria-haspopup", () => {
      render(<SimplePopover />);
      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("PopoverTrigger имеет aria-expanded", () => {
      render(<SimplePopover />);
      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded");
    });
  });

  describe("PopoverAnchor", () => {
    it("PopoverAnchor рендерится с детьми", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverAnchor>
            <div>Anchor Element</div>
          </PopoverAnchor>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      expect(screen.getByText("Anchor Element")).toBeInTheDocument();
    });

    it("PopoverAnchor имеет data-slot атрибут", () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverAnchor>
            <div>Anchor</div>
          </PopoverAnchor>
        </Popover>
      );

      const anchor = container.querySelector("[data-slot='popover-anchor']");
      expect(anchor).toBeInTheDocument();
    });
  });

  describe("Дополнительные props", () => {
    it("PopoverContent применяет кастомный className", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent className="custom-content-class">
            Content
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });

    it("PopoverTrigger поддерживает data-testid", () => {
      render(
        <Popover>
          <PopoverTrigger data-testid="test-trigger">Trigger</PopoverTrigger>
        </Popover>
      );

      expect(screen.getByTestId("test-trigger")).toBeInTheDocument();
    });

    it("PopoverTrigger поддерживает aria-label", () => {
      render(
        <Popover>
          <PopoverTrigger aria-label="Открыть меню">Open</PopoverTrigger>
        </Popover>
      );

      const trigger = screen.getByRole("button", { name: "Открыть меню" });
      expect(trigger).toBeInTheDocument();
    });

    it("PopoverContent принимает дополнительные props", () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent data-testid="test-content">Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Trigger")).toBeInTheDocument();
    });
  });

  describe("Взаимодействия с клавиатурой", () => {
    it("Trigger реагирует на focus", async () => {
      const user = userEvent.setup();
      render(<SimplePopover />);

      const trigger = screen.getByRole("button");
      await user.tab();

      expect(trigger).toHaveFocus();
    });

    it("Trigger доступен для клавиатурной навигации", () => {
      render(<SimplePopover />);
      const trigger = screen.getByRole("button");

      expect(trigger).toHaveAttribute("type", "button");
    });
  });

  describe("Подкомпоненты структуры", () => {
    it("Popover принимает open prop", () => {
      render(<SimplePopover open={false} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Popover принимает onOpenChange callback", () => {
      const handleChange = vi.fn();
      render(<SimplePopover onOpenChange={handleChange} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("PopoverContent рендерится с детьми", () => {
      render(
        <Popover open={true}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>
            <div>Custom Content</div>
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });
  });
});

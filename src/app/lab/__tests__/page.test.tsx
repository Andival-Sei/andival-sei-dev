import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import LabPage from "../page";

/**
 * Тесты для страницы Lab
 * Проверяют отображение сообщения "В разработке"
 */
describe("LabPage", () => {
  it("рендерится без ошибок", () => {
    render(<LabPage />);

    expect(screen.getByText("В разработке")).toBeInTheDocument();
  });

  it("отображает заголовок 'В разработке'", () => {
    render(<LabPage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("В разработке");
  });

  it("отображает описание о планируемых экспериментах", () => {
    render(<LabPage />);

    expect(
      screen.getByText(
        "Здесь скоро появятся интересные эксперименты и интерактивные демо"
      )
    ).toBeInTheDocument();
  });

  it("отображает иконку строительства", () => {
    render(<LabPage />);

    // Проверяем наличие эмодзи 🚧
    const iconElement = screen.getByText("🚧");
    expect(iconElement).toBeInTheDocument();
  });

  it("имеет правильные CSS классы для центрирования", () => {
    const { container } = render(<LabPage />);

    // Проверяем основной контейнер
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "min-h-screen",
      "flex",
      "items-center",
      "justify-center",
      "bg-background"
    );
  });

  it("заголовок имеет правильные responsive классы", () => {
    render(<LabPage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass(
      "text-4xl",
      "sm:text-5xl",
      "md:text-6xl",
      "font-bold",
      "text-foreground"
    );
  });
});

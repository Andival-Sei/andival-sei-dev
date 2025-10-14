import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../error-boundary";

/**
 * Компонент для тестирования - генерирует ошибку
 */
const ThrowError = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("отображает fallback при ошибке", () => {
    // Подавляем console.error для теста
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Ошибка при отображении компонента/i)
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("отображает кастомный fallback если передан", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<div>Custom Error Message</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Custom Error Message")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("рендерит детей при отсутствии ошибки", () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });
});

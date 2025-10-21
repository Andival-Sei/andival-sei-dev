import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Home from "../page";

// Мокаем компоненты секций
vi.mock("@/components/sections/hero", () => ({
  Hero: () => <div data-testid="hero-section">Hero Section</div>,
}));

vi.mock("@/components/sections/tech-stack", () => ({
  default: () => <div data-testid="tech-stack-section">Tech Stack Section</div>,
}));

vi.mock("@/components/sections/featured-projects", () => ({
  FeaturedProjects: () => (
    <div data-testid="featured-projects-section">Featured Projects Section</div>
  ),
}));

describe("Home Page", () => {
  it("рендерится без ошибок", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("содержит все основные секции", () => {
    render(<Home />);

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("tech-stack-section")).toBeInTheDocument();
    expect(screen.getByTestId("featured-projects-section")).toBeInTheDocument();
  });

  it("имеет правильную структуру", () => {
    const { container } = render(<Home />);

    // Проверяем наличие main тега
    expect(container.querySelector("main")).toBeInTheDocument();

    // Проверяем, что секции находятся внутри main
    const main = container.querySelector("main");
    expect(main).toContainElement(screen.getByTestId("hero-section"));
    expect(main).toContainElement(screen.getByTestId("tech-stack-section"));
    expect(main).toContainElement(
      screen.getByTestId("featured-projects-section")
    );
  });

  it("отображает секции в правильном порядке", () => {
    const { container } = render(<Home />);

    const main = container.querySelector("main");
    const children = Array.from(main?.children || []);

    expect(children[0]).toHaveAttribute("data-testid", "hero-section");
    expect(children[1]).toHaveAttribute("data-testid", "tech-stack-section");
    expect(children[2]).toHaveAttribute(
      "data-testid",
      "featured-projects-section"
    );
  });
});

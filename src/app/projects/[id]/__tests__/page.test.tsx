import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ProjectDetailPage from "../page";

// Мокаем next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

// Мокаем next/image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: any;
  }) => <img src={src} alt={alt} {...props} />,
}));

// Мокаем next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Мокаем lucide-react иконки
vi.mock("lucide-react", () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon">ArrowLeft Icon</div>,
  ArrowUpRight: () => (
    <div data-testid="arrow-up-right-icon">ArrowUpRight Icon</div>
  ),
  Github: () => <div data-testid="github-icon">Github Icon</div>,
}));

// Мокаем данные проектов
vi.mock("@/data/projects", () => ({
  getProjectById: vi.fn((id: string) => {
    if (id === "existing-project") {
      return {
        id: "existing-project",
        title: "Test Project",
        description: "Test description",
        longDescription: "Long test description",
        technologies: ["React", "TypeScript"],
        type: "web",
        year: 2023,
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/test/project",
        image: "/test-image.jpg",
        features: ["Feature 1", "Feature 2"],
        challenges: ["Challenge 1", "Challenge 2"],
        results: ["Result 1", "Result 2"],
      };
    }
    return null;
  }),
  projects: [{ id: "existing-project", title: "Test Project" }],
  getMediaType: vi.fn(() => "image"),
}));

describe("ProjectDetailPage", () => {
  it("рендерится без ошибок для существующего проекта", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("отображает информацию о проекте", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Long test description")).toBeInTheDocument();
  });

  it("отображает технологии проекта", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("отображает ссылки на демо и GitHub", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    const demoLink = screen.getByText("Посмотреть сайт");
    const githubLink = screen.getByText("GitHub репозиторий");

    expect(demoLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();

    // Проверяем, что ссылки существуют
    expect(demoLink.closest("a")).toBeInTheDocument();
    expect(githubLink.closest("a")).toBeInTheDocument();
  });

  it("отображает секции проекта", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText("О проекте")).toBeInTheDocument();
    expect(screen.getByText("Технологии")).toBeInTheDocument();
  });

  it("отображает кнопку назад", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    const backButton = screen.getByText("Назад к проектам");
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest("a")).toHaveAttribute("href", "/projects");
  });

  it("отображает иконки", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-up-right-icon")).toBeInTheDocument();
    expect(screen.getByTestId("github-icon")).toBeInTheDocument();
  });

  it("имеет правильную структуру", async () => {
    const params = Promise.resolve({ id: "existing-project" });
    const { container } = render(await ProjectDetailPage({ params }));

    expect(container.querySelector("div")).toBeInTheDocument();
  });
});

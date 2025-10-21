import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ProjectsPage from "../page";

// Мокаем данные проектов
vi.mock("@/data/projects", () => ({
  projects: [
    {
      id: "test-project-1",
      title: "Test Project 1",
      description: "Test description 1",
      technologies: ["React", "TypeScript"],
      type: "web",
      year: 2023,
    },
    {
      id: "test-project-2",
      title: "Test Project 2",
      description: "Test description 2",
      technologies: ["Vue", "JavaScript"],
      type: "mobile",
      year: 2022,
    },
  ],
  getAllTechnologies: vi.fn(() => ["React", "TypeScript", "Vue", "JavaScript"]),
  getProjectTypes: vi.fn(() => ["web", "mobile", "desktop"]),
}));

// Мокаем компоненты
vi.mock("@/components/project-card", () => ({
  ProjectCard: ({ project }: { project: any }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  ),
}));

vi.mock("@/components/projects-filters", () => ({
  ProjectsFilters: ({
    searchQuery,
    onSearchChange,
    projectType,
    onProjectTypeChange,
    _selectedTechnologies,
    _onTechnologiesChange,
    sortOrder,
    onSortOrderChange,
    _allTechnologies,
    projectTypes,
  }: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    projectType: string;
    onProjectTypeChange: (value: string) => void;
    _selectedTechnologies: string[];
    _onTechnologiesChange: (value: string[]) => void;
    sortOrder: string;
    onSortOrderChange: (value: string) => void;
    _allTechnologies: string[];
    projectTypes: string[];
  }) => (
    <div data-testid="projects-filters">
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        data-testid="project-type-select"
        value={projectType}
        onChange={(e) => onProjectTypeChange(e.target.value)}
      >
        <option value="all">All</option>
        {projectTypes.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        data-testid="sort-order-select"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  ),
}));

describe("ProjectsPage", () => {
  it("рендерится без ошибок", () => {
    const { container } = render(<ProjectsPage />);

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("отображает заголовок страницы", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Проекты")).toBeInTheDocument();
  });

  it("отображает фильтры проектов", () => {
    render(<ProjectsPage />);

    expect(screen.getByTestId("projects-filters")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("project-type-select")).toBeInTheDocument();
    expect(screen.getByTestId("sort-order-select")).toBeInTheDocument();
  });

  it("отображает проекты", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByTestId("project-card-test-project-1")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("project-card-test-project-2")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
  });

  it("инициализирует данные проектов", () => {
    render(<ProjectsPage />);

    // Проверяем, что компонент рендерится с данными
    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
  });

  it("имеет правильную структуру", () => {
    const { container } = render(<ProjectsPage />);

    // Проверяем наличие основных секций
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("отображает описание страницы", () => {
    render(<ProjectsPage />);

    expect(screen.getByText(/Мои работы и проекты/)).toBeInTheDocument();
  });
});

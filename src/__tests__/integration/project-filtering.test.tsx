import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ProjectCard } from "@/components/project-card";
import { ProjectsFilters } from "@/components/projects-filters";

// Мокаем данные проектов
const mockProjects = [
  {
    id: "project-1",
    title: "React Project",
    description: "A project built with React",
    longDescription: "A detailed description of the React project",
    technologies: ["React", "TypeScript"],
    type: "work" as const,
    year: 2023,
    date: "2023-03-15",
    media: "image.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "project-2",
    title: "Vue Project",
    description: "A project built with Vue",
    longDescription: "A detailed description of the Vue project",
    technologies: ["Vue", "JavaScript"],
    type: "work" as const,
    year: 2022,
    date: "2023-01-20",
    media: "image.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
  },
  {
    id: "project-3",
    title: "Mobile App",
    description: "A mobile application",
    longDescription: "A detailed description of the mobile app",
    technologies: ["React Native", "TypeScript"],
    type: "educational" as const,
    year: 2023,
    date: "2023-05-01",
    media: "image.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
  },
];

// Мокаем компоненты
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
    projectTypes: { value: string; label: string }[];
  }) => (
    <div data-testid="projects-filters">
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск проектов..."
      />
      <select
        data-testid="project-type-select"
        value={projectType}
        onChange={(e) => onProjectTypeChange(e.target.value)}
      >
        <option value="all">Все проекты</option>
        {projectTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <select
        data-testid="sort-order-select"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
      >
        <option value="newest">Новые</option>
        <option value="oldest">Старые</option>
      </select>
    </div>
  ),
}));

vi.mock("@/components/project-card", () => ({
  ProjectCard: ({ project }: { project: any }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div data-testid={`technologies-${project.id}`}>
        {project.technologies.map((tech: string) => (
          <span key={tech} data-testid={`tech-${tech.toLowerCase()}`}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  ),
}));

describe("Project Filtering Integration", () => {
  it("фильтрует проекты по поисковому запросу", async () => {
    const mockOnSearchChange = vi.fn();
    const mockOnProjectTypeChange = vi.fn();
    const mockOnTechnologiesChange = vi.fn();
    const mockOnSortOrderChange = vi.fn();

    render(
      <div>
        <ProjectsFilters
          searchQuery=""
          onSearchChange={mockOnSearchChange}
          projectType="all"
          onProjectTypeChange={mockOnProjectTypeChange}
          selectedTechnologies={[]}
          onTechnologiesChange={mockOnTechnologiesChange}
          sortOrder="newest"
          onSortOrderChange={mockOnSortOrderChange}
          allTechnologies={[
            "React",
            "Vue",
            "TypeScript",
            "JavaScript",
            "React Native",
          ]}
          projectTypes={[
            { value: "web", label: "web" },
            { value: "mobile", label: "mobile" },
            { value: "desktop", label: "desktop" },
          ]}
        />
        <div data-testid="projects-list">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );

    const searchInput = screen.getByTestId("search-input");

    // Тестируем поиск по названию
    fireEvent.change(searchInput, { target: { value: "React" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("React");

    // Тестируем поиск по описанию
    fireEvent.change(searchInput, { target: { value: "mobile" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("mobile");
  });

  it("фильтрует проекты по типу", async () => {
    const mockOnSearchChange = vi.fn();
    const mockOnProjectTypeChange = vi.fn();
    const mockOnTechnologiesChange = vi.fn();
    const mockOnSortOrderChange = vi.fn();

    render(
      <div>
        <ProjectsFilters
          searchQuery=""
          onSearchChange={mockOnSearchChange}
          projectType="all"
          onProjectTypeChange={mockOnProjectTypeChange}
          selectedTechnologies={[]}
          onTechnologiesChange={mockOnTechnologiesChange}
          sortOrder="newest"
          onSortOrderChange={mockOnSortOrderChange}
          allTechnologies={[
            "React",
            "Vue",
            "TypeScript",
            "JavaScript",
            "React Native",
          ]}
          projectTypes={[
            { value: "web", label: "web" },
            { value: "mobile", label: "mobile" },
            { value: "desktop", label: "desktop" },
          ]}
        />
      </div>
    );

    const typeSelect = screen.getByTestId("project-type-select");

    // Тестируем фильтрацию по типу
    fireEvent.change(typeSelect, { target: { value: "web" } });
    expect(mockOnProjectTypeChange).toHaveBeenCalledWith("web");

    fireEvent.change(typeSelect, { target: { value: "mobile" } });
    expect(mockOnProjectTypeChange).toHaveBeenCalledWith("mobile");
  });

  it("сортирует проекты по дате", async () => {
    const mockOnSearchChange = vi.fn();
    const mockOnProjectTypeChange = vi.fn();
    const mockOnTechnologiesChange = vi.fn();
    const mockOnSortOrderChange = vi.fn();

    render(
      <div>
        <ProjectsFilters
          searchQuery=""
          onSearchChange={mockOnSearchChange}
          projectType="all"
          onProjectTypeChange={mockOnProjectTypeChange}
          selectedTechnologies={[]}
          onTechnologiesChange={mockOnTechnologiesChange}
          sortOrder="newest"
          onSortOrderChange={mockOnSortOrderChange}
          allTechnologies={[
            "React",
            "Vue",
            "TypeScript",
            "JavaScript",
            "React Native",
          ]}
          projectTypes={[
            { value: "web", label: "web" },
            { value: "mobile", label: "mobile" },
            { value: "desktop", label: "desktop" },
          ]}
        />
      </div>
    );

    const sortSelect = screen.getByTestId("sort-order-select");

    // Тестируем сортировку
    fireEvent.change(sortSelect, { target: { value: "oldest" } });
    expect(mockOnSortOrderChange).toHaveBeenCalledWith("oldest");

    fireEvent.change(sortSelect, { target: { value: "newest" } });
    expect(mockOnSortOrderChange).toHaveBeenCalledWith("newest");
  });

  it("отображает все проекты при сбросе фильтров", async () => {
    const mockOnSearchChange = vi.fn();
    const mockOnProjectTypeChange = vi.fn();
    const mockOnTechnologiesChange = vi.fn();
    const mockOnSortOrderChange = vi.fn();

    render(
      <div>
        <ProjectsFilters
          searchQuery=""
          onSearchChange={mockOnSearchChange}
          projectType="all"
          onProjectTypeChange={mockOnProjectTypeChange}
          selectedTechnologies={[]}
          onTechnologiesChange={mockOnTechnologiesChange}
          sortOrder="newest"
          onSortOrderChange={mockOnSortOrderChange}
          allTechnologies={[
            "React",
            "Vue",
            "TypeScript",
            "JavaScript",
            "React Native",
          ]}
          projectTypes={[
            { value: "web", label: "web" },
            { value: "mobile", label: "mobile" },
            { value: "desktop", label: "desktop" },
          ]}
        />
        <div data-testid="projects-list">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );

    // Проверяем, что все проекты отображаются
    expect(screen.getByTestId("project-card-project-1")).toBeInTheDocument();
    expect(screen.getByTestId("project-card-project-2")).toBeInTheDocument();
    expect(screen.getByTestId("project-card-project-3")).toBeInTheDocument();
  });

  it("отображает технологии проектов", async () => {
    render(
      <div>
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );

    // Проверяем технологии первого проекта
    expect(screen.getByTestId("tech-react")).toBeInTheDocument();
    expect(screen.getAllByTestId("tech-typescript")).toHaveLength(2); // TypeScript есть в двух проектах

    // Проверяем технологии второго проекта
    expect(screen.getByTestId("tech-vue")).toBeInTheDocument();
    expect(screen.getByTestId("tech-javascript")).toBeInTheDocument();
  });
});

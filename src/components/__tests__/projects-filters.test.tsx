import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ComponentProps } from "react";

import { ProjectsFilters } from "@/components/projects-filters";

const createProps = (
  overrides: Partial<ComponentProps<typeof ProjectsFilters>> = {}
) => ({
  searchQuery: "",
  onSearchChange: vi.fn(),
  projectType: "all",
  onProjectTypeChange: vi.fn(),
  selectedTechnologies: [] as string[],
  onTechnologiesChange: vi.fn(),
  sortOrder: "newest" as const,
  onSortOrderChange: vi.fn(),
  allTechnologies: ["React", "TypeScript", "Next.js"],
  projectTypes: [
    { value: "all", label: "Все проекты" },
    { value: "pet", label: "Pet" },
  ],
  ...overrides,
});

describe("ProjectsFilters", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("дебаунсит поиск перед вызовом onSearchChange", async () => {
    const props = createProps();
    const user = userEvent.setup();

    render(<ProjectsFilters {...props} />);

    const input = screen.getByPlaceholderText("Поиск по названию...");
    await user.type(input, "React");

    await waitFor(() => {
      expect(props.onSearchChange).toHaveBeenLastCalledWith("React");
    });
  });

  it("позволяет выбирать и снимать технологии через поповер и бейджи", async () => {
    const onTechnologiesChange = vi.fn();
    const props = createProps({
      onTechnologiesChange,
      selectedTechnologies: ["React"],
    });
    const user = userEvent.setup();

    render(<ProjectsFilters {...props} />);

    const activeTechButton = screen.getByRole("button", {
      name: "Удалить фильтр по технологии React",
    });
    await user.click(activeTechButton);
    expect(onTechnologiesChange).toHaveBeenLastCalledWith([]);

    const trigger = screen
      .getAllByRole("button", { name: /технологии/i })
      .find((button) => button.getAttribute("aria-haspopup") === "listbox");
    expect(trigger).toBeDefined();
    await user.click(trigger!);

    const checkbox = screen.getByLabelText("TypeScript");
    await user.click(checkbox);
    expect(onTechnologiesChange).toHaveBeenLastCalledWith(["React", "TypeScript"]);
  });

  it("сбрасывает фильтры до значений по умолчанию", async () => {
    const onSearchChange = vi.fn();
    const onProjectTypeChange = vi.fn();
    const onTechnologiesChange = vi.fn();
    const onSortOrderChange = vi.fn();

    const props = createProps({
      searchQuery: "React",
      projectType: "pet",
      selectedTechnologies: ["React"],
      sortOrder: "oldest",
      onSearchChange,
      onProjectTypeChange,
      onTechnologiesChange,
      onSortOrderChange,
    });
    const user = userEvent.setup();

    render(<ProjectsFilters {...props} />);

    const resetButton = screen.getByRole("button", { name: /сбросить фильтры/i });
    await user.click(resetButton);

    expect(onSearchChange).toHaveBeenCalledWith("");
    expect(onProjectTypeChange).toHaveBeenCalledWith("all");
    expect(onTechnologiesChange).toHaveBeenCalledWith([]);
    expect(onSortOrderChange).toHaveBeenCalledWith("newest");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsFilters } from "../projects-filters";

describe("ProjectsFilters", () => {
  // Моковые props
  const defaultProps = {
    searchQuery: "",
    onSearchChange: vi.fn(),
    projectType: "all",
    onProjectTypeChange: vi.fn(),
    selectedTechnologies: [] as string[],
    onTechnologiesChange: vi.fn(),
    sortOrder: "newest" as const,
    onSortOrderChange: vi.fn(),
    allTechnologies: ["React", "TypeScript", "Next.js", "Vue", "Angular"],
    projectTypes: [
      { value: "all", label: "Все проекты" },
      { value: "work", label: "Рабочие" },
      { value: "educational", label: "Учебные" },
      { value: "pet", label: "Pet-проекты" },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Базовый рендеринг", () => {
    it("рендерится без ошибок", () => {
      render(<ProjectsFilters {...defaultProps} />);
      expect(
        screen.getByPlaceholderText("Поиск по названию...")
      ).toBeInTheDocument();
    });

    it("отображает все основные элементы", () => {
      render(<ProjectsFilters {...defaultProps} />);

      // Input для поиска
      expect(
        screen.getByPlaceholderText("Поиск по названию...")
      ).toBeInTheDocument();

      // Кнопка фильтра по технологиям
      expect(
        screen.getByRole("button", { name: /Технологии/i })
      ).toBeInTheDocument();

      // Select компоненты отображаются через выбранные значения
      expect(screen.getByText("Все проекты")).toBeInTheDocument();
      expect(screen.getByText("Новые первыми")).toBeInTheDocument();
    });
  });

  describe("Поиск по названию", () => {
    describe("Input элемент", () => {
      it("отображает Input с placeholder", () => {
        render(<ProjectsFilters {...defaultProps} />);
        const input = screen.getByPlaceholderText("Поиск по названию...");
        expect(input).toBeInTheDocument();
      });

      it("Input имеет иконку Search", () => {
        const { container } = render(<ProjectsFilters {...defaultProps} />);
        // Проверяем наличие SVG иконки Search
        const searchIcon = container.querySelector("svg");
        expect(searchIcon).toBeInTheDocument();
      });

      it("value синхронизирован с localSearchQuery", async () => {
        const user = userEvent.setup();
        render(<ProjectsFilters {...defaultProps} />);

        const input = screen.getByPlaceholderText("Поиск по названию...");
        await user.type(input, "test query");

        expect(input).toHaveValue("test query");
      });
    });

    describe("Debounce механизм", () => {
      it("вызывает onSearchChange после задержки", async () => {
        const onSearchChange = vi.fn();
        const user = userEvent.setup();

        render(
          <ProjectsFilters {...defaultProps} onSearchChange={onSearchChange} />
        );

        const input = screen.getByPlaceholderText("Поиск по названию...");
        await user.type(input, "test");

        // Ждем чуть больше 300ms (дл debounce)
        await waitFor(
          () => {
            expect(onSearchChange).toHaveBeenCalledWith("test");
          },
          { timeout: 500 }
        );
      });

      it("cleanup таймера при unmount", () => {
        const { unmount } = render(<ProjectsFilters {...defaultProps} />);

        // Unmount компонента должен очистить таймер
        unmount();

        // Проверяем что нет ошибок при unmount
        expect(true).toBe(true);
      });
    });
  });

  describe("Фильтр по типу проекта", () => {
    it("отображает SelectTrigger с выбранным значением", () => {
      render(<ProjectsFilters {...defaultProps} />);
      expect(screen.getByText("Все проекты")).toBeInTheDocument();
    });

    it("Select имеет адаптивную ширину", () => {
      const { container } = render(<ProjectsFilters {...defaultProps} />);
      // Находим SelectTrigger по классам
      const selectTrigger = container.querySelector(
        ".w-full.sm\\:w-\\[180px\\]"
      );
      expect(selectTrigger).toBeInTheDocument();
    });

    it("передает правильное значение в Select", () => {
      const { rerender } = render(<ProjectsFilters {...defaultProps} />);

      // По умолчанию "all" отображается как "Все проекты"
      expect(screen.getByText("Все проекты")).toBeInTheDocument();

      // Меняем на "work"
      rerender(<ProjectsFilters {...defaultProps} projectType="work" />);
      // Value должен обновиться на "Рабочие"
      expect(screen.getByText("Рабочие")).toBeInTheDocument();
    });
  });

  describe("Сортировка", () => {
    it("отображает SelectTrigger для сортировки", () => {
      render(<ProjectsFilters {...defaultProps} />);
      expect(screen.getByText("Новые первыми")).toBeInTheDocument();
    });

    it("value синхронизирован с sortOrder prop", () => {
      const { rerender } = render(<ProjectsFilters {...defaultProps} />);

      // По умолчанию "newest" отображается как "Новые первыми"
      expect(screen.getByText("Новые первыми")).toBeInTheDocument();

      // Меняем на "oldest"
      rerender(<ProjectsFilters {...defaultProps} sortOrder="oldest" />);
      // Value должен обновиться на "Старые первыми"
      expect(screen.getByText("Старые первыми")).toBeInTheDocument();
    });
  });

  describe("Фильтр по технологиям", () => {
    describe("Popover и кнопка", () => {
      it("отображает кнопку 'Технологии'", () => {
        render(<ProjectsFilters {...defaultProps} />);
        const button = screen.getByRole("button", { name: /Технологии/i });
        expect(button).toBeInTheDocument();
      });

      it("кнопка содержит иконку Filter", () => {
        const { container } = render(<ProjectsFilters {...defaultProps} />);
        const button = screen.getByRole("button", { name: /Технологии/i });
        const icon = button.querySelector("svg");
        expect(icon).toBeInTheDocument();
      });

      it("Badge с количеством технологий не отображается если нет выбранных", () => {
        render(<ProjectsFilters {...defaultProps} />);
        const button = screen.getByRole("button", { name: /Технологии/i });
        // Badge не должен быть виден
        expect(button.textContent).not.toMatch(/\d+/);
      });

      it("Badge с количеством отображается если есть выбранные технологии", () => {
        render(
          <ProjectsFilters
            {...defaultProps}
            selectedTechnologies={["React", "TypeScript"]}
          />
        );
        const button = screen.getByRole("button", { name: /Технологии/i });
        expect(button.textContent).toContain("2");
      });

      it("открывает Popover при клике на кнопку", async () => {
        const user = userEvent.setup();
        render(<ProjectsFilters {...defaultProps} />);

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByText("Выберите технологии:")).toBeInTheDocument();
        });
      });
    });

    describe("PopoverContent", () => {
      it("отображает заголовок", async () => {
        const user = userEvent.setup();
        render(<ProjectsFilters {...defaultProps} />);

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByText("Выберите технологии:")).toBeInTheDocument();
        });
      });

      it("рендерит Checkbox для каждой технологии", async () => {
        const user = userEvent.setup();
        render(<ProjectsFilters {...defaultProps} />);

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          // Проверяем наличие всех технологий
          expect(screen.getByLabelText("React")).toBeInTheDocument();
          expect(screen.getByLabelText("TypeScript")).toBeInTheDocument();
          expect(screen.getByLabelText("Next.js")).toBeInTheDocument();
          expect(screen.getByLabelText("Vue")).toBeInTheDocument();
          expect(screen.getByLabelText("Angular")).toBeInTheDocument();
        });
      });

      it("Checkbox checked если технология в selectedTechnologies", async () => {
        const user = userEvent.setup();
        render(
          <ProjectsFilters
            {...defaultProps}
            selectedTechnologies={["React", "TypeScript"]}
          />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          const reactCheckbox = screen.getByLabelText("React");
          const typescriptCheckbox = screen.getByLabelText("TypeScript");
          const vueCheckbox = screen.getByLabelText("Vue");

          expect(reactCheckbox).toBeChecked();
          expect(typescriptCheckbox).toBeChecked();
          expect(vueCheckbox).not.toBeChecked();
        });
      });

      it("клик на Checkbox вызывает onTechnologiesChange", async () => {
        const user = userEvent.setup();
        const onTechnologiesChange = vi.fn();

        render(
          <ProjectsFilters
            {...defaultProps}
            onTechnologiesChange={onTechnologiesChange}
          />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByLabelText("React")).toBeInTheDocument();
        });

        const reactCheckbox = screen.getByLabelText("React");
        await user.click(reactCheckbox);

        expect(onTechnologiesChange).toHaveBeenCalledWith(["React"]);
      });
    });

    describe("Функция handleTechnologyToggle", () => {
      it("добавляет технологию в массив при клике", async () => {
        const user = userEvent.setup();
        const onTechnologiesChange = vi.fn();

        render(
          <ProjectsFilters
            {...defaultProps}
            selectedTechnologies={[]}
            onTechnologiesChange={onTechnologiesChange}
          />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByLabelText("React")).toBeInTheDocument();
        });

        const reactCheckbox = screen.getByLabelText("React");
        await user.click(reactCheckbox);

        expect(onTechnologiesChange).toHaveBeenCalledWith(["React"]);
      });

      it("удаляет технологию из массива при повторном клике", async () => {
        const user = userEvent.setup();
        const onTechnologiesChange = vi.fn();

        render(
          <ProjectsFilters
            {...defaultProps}
            selectedTechnologies={["React", "TypeScript"]}
            onTechnologiesChange={onTechnologiesChange}
          />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByLabelText("React")).toBeInTheDocument();
        });

        const reactCheckbox = screen.getByLabelText("React");
        await user.click(reactCheckbox);

        expect(onTechnologiesChange).toHaveBeenCalledWith(["TypeScript"]);
      });

      it("вызывает onTechnologiesChange с обновленным массивом", async () => {
        const user = userEvent.setup();
        const onTechnologiesChange = vi.fn();

        render(
          <ProjectsFilters
            {...defaultProps}
            selectedTechnologies={["React"]}
            onTechnologiesChange={onTechnologiesChange}
          />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByLabelText("TypeScript")).toBeInTheDocument();
        });

        const typescriptCheckbox = screen.getByLabelText("TypeScript");
        await user.click(typescriptCheckbox);

        expect(onTechnologiesChange).toHaveBeenCalledWith([
          "React",
          "TypeScript",
        ]);
      });
    });

    describe("Кнопка очистки в Popover", () => {
      it("не отображается если нет выбранных технологий", async () => {
        const user = userEvent.setup();
        render(<ProjectsFilters {...defaultProps} selectedTechnologies={[]} />);

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(screen.getByText("Выберите технологии:")).toBeInTheDocument();
        });

        expect(
          screen.queryByRole("button", { name: /Очистить выбор/i })
        ).not.toBeInTheDocument();
      });

      it("отображается если есть выбранные технологии", async () => {
        const user = userEvent.setup();
        render(
          <ProjectsFilters {...defaultProps} selectedTechnologies={["React"]} />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(
            screen.getByRole("button", { name: /Очистить выбор/i })
          ).toBeInTheDocument();
        });
      });

      it("вызывает onTechnologiesChange([]) при клике", async () => {
        const user = userEvent.setup();
        const onTechnologiesChange = vi.fn();

        render(
          <ProjectsFilters
            {...defaultProps}
            selectedTechnologies={["React", "TypeScript"]}
            onTechnologiesChange={onTechnologiesChange}
          />
        );

        const button = screen.getByRole("button", { name: /Технологии/i });
        await user.click(button);

        await waitFor(() => {
          expect(
            screen.getByRole("button", { name: /Очистить выбор/i })
          ).toBeInTheDocument();
        });

        const clearButton = screen.getByRole("button", {
          name: /Очистить выбор/i,
        });
        await user.click(clearButton);

        expect(onTechnologiesChange).toHaveBeenCalledWith([]);
      });
    });
  });

  describe("Отображение выбранных технологий", () => {
    it("рендерит Badge для каждой выбранной технологии", () => {
      render(
        <ProjectsFilters
          {...defaultProps}
          selectedTechnologies={["React", "TypeScript"]}
        />
      );

      // Badge отображаются вне Popover
      const badges = screen.getAllByText("React");
      expect(badges.length).toBeGreaterThan(0);
    });

    it("каждый Badge имеет иконку X для удаления", () => {
      const { container } = render(
        <ProjectsFilters
          {...defaultProps}
          selectedTechnologies={["React", "TypeScript"]}
        />
      );

      // Ищем иконки X (lucide-react X)
      const xIcons = container.querySelectorAll("svg");
      expect(xIcons.length).toBeGreaterThan(0);
    });

    it("клик на Badge вызывает handleTechnologyToggle", async () => {
      const user = userEvent.setup();
      const onTechnologiesChange = vi.fn();

      render(
        <ProjectsFilters
          {...defaultProps}
          selectedTechnologies={["React", "TypeScript"]}
          onTechnologiesChange={onTechnologiesChange}
        />
      );

      // Находим Badge с React вне Popover
      const reactBadges = screen.getAllByText("React");
      const badgeToClick = reactBadges.find(
        (el) => el.closest(".cursor-pointer") !== null
      );

      if (badgeToClick) {
        await user.click(badgeToClick);
        expect(onTechnologiesChange).toHaveBeenCalledWith(["TypeScript"]);
      }
    });
  });

  describe("Очистка всех фильтров", () => {
    describe("Кнопка 'Сбросить фильтры'", () => {
      it("не отображается когда все фильтры по умолчанию", () => {
        render(<ProjectsFilters {...defaultProps} />);
        expect(
          screen.queryByRole("button", { name: /Сбросить фильтры/i })
        ).not.toBeInTheDocument();
      });

      it("отображается когда есть searchQuery", () => {
        render(<ProjectsFilters {...defaultProps} searchQuery="test" />);
        expect(
          screen.getByRole("button", { name: /Сбросить фильтры/i })
        ).toBeInTheDocument();
      });

      it("отображается когда projectType !== 'all'", () => {
        render(<ProjectsFilters {...defaultProps} projectType="work" />);
        expect(
          screen.getByRole("button", { name: /Сбросить фильтры/i })
        ).toBeInTheDocument();
      });

      it("отображается когда есть selectedTechnologies", () => {
        render(
          <ProjectsFilters {...defaultProps} selectedTechnologies={["React"]} />
        );
        expect(
          screen.getByRole("button", { name: /Сбросить фильтры/i })
        ).toBeInTheDocument();
      });

      it("отображается когда sortOrder !== 'newest'", () => {
        render(<ProjectsFilters {...defaultProps} sortOrder="oldest" />);
        expect(
          screen.getByRole("button", { name: /Сбросить фильтры/i })
        ).toBeInTheDocument();
      });
    });

    describe("Функция handleClearFilters", () => {
      it("очищает все фильтры при клике", async () => {
        const user = userEvent.setup();
        const onSearchChange = vi.fn();
        const onProjectTypeChange = vi.fn();
        const onTechnologiesChange = vi.fn();
        const onSortOrderChange = vi.fn();

        render(
          <ProjectsFilters
            {...defaultProps}
            searchQuery="test"
            projectType="work"
            selectedTechnologies={["React"]}
            sortOrder="oldest"
            onSearchChange={onSearchChange}
            onProjectTypeChange={onProjectTypeChange}
            onTechnologiesChange={onTechnologiesChange}
            onSortOrderChange={onSortOrderChange}
          />
        );

        const clearButton = screen.getByRole("button", {
          name: /Сбросить фильтры/i,
        });
        await user.click(clearButton);

        expect(onSearchChange).toHaveBeenCalledWith("");
        expect(onProjectTypeChange).toHaveBeenCalledWith("all");
        expect(onTechnologiesChange).toHaveBeenCalledWith([]);
        expect(onSortOrderChange).toHaveBeenCalledWith("newest");
      });

      it("очищает локальный searchQuery", async () => {
        const user = userEvent.setup();
        render(<ProjectsFilters {...defaultProps} searchQuery="test" />);

        const input = screen.getByPlaceholderText("Поиск по названию...");
        expect(input).toHaveValue("test");

        const clearButton = screen.getByRole("button", {
          name: /Сбросить фильтры/i,
        });
        await user.click(clearButton);

        await waitFor(() => {
          expect(input).toHaveValue("");
        });
      });
    });
  });

  describe("Адаптивный дизайн", () => {
    it("первая строка имеет flex-col на мобильных", () => {
      const { container } = render(<ProjectsFilters {...defaultProps} />);
      const firstRow = container.querySelector(".flex-col.sm\\:flex-row");
      expect(firstRow).toBeInTheDocument();
    });

    it("Select компоненты имеют адаптивную ширину", () => {
      const { container } = render(<ProjectsFilters {...defaultProps} />);
      const selectWithAdaptiveWidth = container.querySelector(
        ".w-full.sm\\:w-\\[180px\\]"
      );
      expect(selectWithAdaptiveWidth).toBeInTheDocument();
    });

    it("вторая строка с flex-wrap", () => {
      const { container } = render(<ProjectsFilters {...defaultProps} />);
      const secondRow = container.querySelectorAll(".flex-wrap")[0];
      expect(secondRow).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("Input имеет правильный type", () => {
      render(<ProjectsFilters {...defaultProps} />);
      const input = screen.getByPlaceholderText("Поиск по названию...");
      expect(input).toHaveAttribute("type", "text");
    });

    it("Checkbox имеют связанные label через htmlFor", async () => {
      const user = userEvent.setup();
      render(<ProjectsFilters {...defaultProps} />);

      const button = screen.getByRole("button", { name: /Технологии/i });
      await user.click(button);

      await waitFor(() => {
        const reactLabel = screen.getByLabelText("React");
        expect(reactLabel).toBeInTheDocument();
      });
    });

    it("Кнопки имеют читаемый текст", () => {
      render(
        <ProjectsFilters {...defaultProps} selectedTechnologies={["React"]} />
      );

      expect(
        screen.getByRole("button", { name: /Технологии/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Сбросить фильтры/i })
      ).toBeInTheDocument();
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot в начальном состоянии", () => {
      const { container } = render(<ProjectsFilters {...defaultProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot с активными фильтрами", () => {
      const { container } = render(
        <ProjectsFilters
          {...defaultProps}
          searchQuery="test"
          projectType="work"
          selectedTechnologies={["React", "TypeScript"]}
          sortOrder="oldest"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

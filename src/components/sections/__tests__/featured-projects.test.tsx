import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { getMockFeaturedProjects } from "@/data/__mocks__/projects";
import * as projectsData from "@/data/projects";
import type { Project } from "@/data/projects";

import { FeaturedProjects } from "../featured-projects";

// Моки
vi.mock("@/data/projects", () => ({
  getFeaturedProjects: vi.fn(),
}));

vi.mock("@/components/project-card", () => ({
  ProjectCard: ({
    project,
    variant,
  }: {
    project: Project;
    variant: string;
  }) => (
    <div
      data-testid="project-card"
      data-project-id={project.id}
      data-variant={variant}
    >
      {project.title}
    </div>
  ),
}));

describe("FeaturedProjects", () => {
  const mockProjects = getMockFeaturedProjects();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.mocked(projectsData.getFeaturedProjects).mockReturnValue(mockProjects);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe("Рендеринг и структура компонента", () => {
    it("рендерится без ошибок", () => {
      const { container } = render(<FeaturedProjects />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("имеет семантичный тег section", () => {
      const { container } = render(<FeaturedProjects />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    it("отображает заголовок H2 'Избранные проекты'", () => {
      render(<FeaturedProjects />);
      const heading = screen.getByRole("heading", {
        level: 2,
        name: /Избранные проекты/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it("отображает подзаголовок с описанием", () => {
      render(<FeaturedProjects />);
      const description = screen.getByText(
        /Мои лучшие работы, демонстрирующие навыки/i
      );
      expect(description).toBeInTheDocument();
    });

    it("имеет классы контейнера и padding", () => {
      const { container } = render(<FeaturedProjects />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("container", "mx-auto", "px-4");
    });
  });

  describe("Отображение проектов", () => {
    it("вызывает getFeaturedProjects для получения данных", () => {
      render(<FeaturedProjects />);
      expect(projectsData.getFeaturedProjects).toHaveBeenCalledTimes(1);
    });

    it("отображает ProjectCard с вариантом 'featured'", () => {
      render(<FeaturedProjects />);
      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute("data-variant", "featured");
    });

    it("отображает первый проект по умолчанию", () => {
      render(<FeaturedProjects />);
      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[0].id
      );
      expect(projectCard).toHaveTextContent(mockProjects[0].title);
    });

    it("отображает ровно 3 индикатора (по количеству featured проектов)", () => {
      render(<FeaturedProjects />);
      const indicators = screen.getAllByRole("button", {
        name: /Перейти к проекту \d/,
      });
      expect(indicators).toHaveLength(3);
    });
  });

  describe("Карусель и навигация", () => {
    it("переключается на следующий проект при клике на 'Следующий проект'", async () => {
      render(<FeaturedProjects />);

      // Проверяем начальное состояние (проект 0)
      let projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[0].id
      );

      // Кликаем на кнопку "Следующий проект" (desktop версия)
      const nextButtons = screen.getAllByLabelText("Следующий проект");

      await act(async () => {
        fireEvent.click(nextButtons[0]);
      });

      // Проверяем переключение на проект 1
      projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[1].id
      );
    });

    it("переключается на предыдущий проект при клике на 'Предыдущий проект'", async () => {
      render(<FeaturedProjects />);

      // Кликаем на кнопку "Предыдущий проект" (desktop версия)
      const prevButtons = screen.getAllByLabelText("Предыдущий проект");

      await act(async () => {
        fireEvent.click(prevButtons[0]);
      });

      // Должен переключиться на последний проект (циклично)
      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[2].id
      );
    });

    it("возвращается к первому проекту после последнего (цикличность вперед)", async () => {
      render(<FeaturedProjects />);

      const nextButtons = screen.getAllByLabelText("Следующий проект");

      // Кликаем 3 раза (0 -> 1 -> 2 -> 0)
      await act(async () => {
        fireEvent.click(nextButtons[0]);
        fireEvent.click(nextButtons[0]);
        fireEvent.click(nextButtons[0]);
      });

      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[0].id
      );
    });

    it("переходит к последнему проекту перед первым (цикличность назад)", async () => {
      render(<FeaturedProjects />);

      const prevButtons = screen.getAllByLabelText("Предыдущий проект");

      // С первого проекта (0) идем назад -> должен быть последний (2)
      await act(async () => {
        fireEvent.click(prevButtons[0]);
      });

      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[2].id
      );
    });

    it("отображает 3 точки-индикатора", () => {
      render(<FeaturedProjects />);
      const indicators = screen.getAllByRole("button", {
        name: /Перейти к проекту \d/,
      });
      expect(indicators).toHaveLength(3);
    });

    it("переключает проект при клике на индикатор", async () => {
      render(<FeaturedProjects />);

      // Кликаем на индикатор третьего проекта
      const thirdIndicator = screen.getByRole("button", {
        name: "Перейти к проекту 3",
      });

      await act(async () => {
        fireEvent.click(thirdIndicator);
      });

      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[2].id
      );
    });

    it("активный индикатор имеет класс bg-primary", () => {
      render(<FeaturedProjects />);

      // Находим все индикаторы
      const indicators = screen.getAllByRole("button", {
        name: /Перейти к проекту \d/,
      });

      // Первый индикатор (активный) должен иметь класс bg-primary
      expect(indicators[0]).toHaveClass("bg-primary");

      // Остальные индикаторы должны иметь другой класс
      expect(indicators[1]).toHaveClass("bg-muted-foreground/30");
      expect(indicators[2]).toHaveClass("bg-muted-foreground/30");
    });

    it("активный индикатор шире остальных (w-8 vs w-2)", () => {
      render(<FeaturedProjects />);

      const indicators = screen.getAllByRole("button", {
        name: /Перейти к проекту \d/,
      });

      // Активный индикатор
      expect(indicators[0]).toHaveClass("w-8");

      // Неактивные индикаторы
      expect(indicators[1]).toHaveClass("w-2");
      expect(indicators[2]).toHaveClass("w-2");
    });
  });

  describe("Автопрокрутка", () => {
    it("автоматически переключается на следующий проект каждые 5 секунд", async () => {
      render(<FeaturedProjects />);

      // Начальный проект 0
      let projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[0].id
      );

      // Прокручиваем время на 5 секунд
      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });

      // Должен переключиться на проект 1
      projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[1].id
      );

      // Еще 5 секунд - проект 2
      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });

      projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[2].id
      );
    });

    it("останавливает автопрокрутку при наведении мыши (mouseenter)", async () => {
      const { container } = render(<FeaturedProjects />);
      const section = container.querySelector("section")!;

      // Начальный проект 0
      let projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[0].id
      );

      // Наводим мышь на секцию
      await act(async () => {
        fireEvent.mouseEnter(section);
      });

      // Прокручиваем время на 10 секунд
      await act(async () => {
        await vi.advanceTimersByTimeAsync(10000);
      });

      // Проект НЕ должен измениться (пауза активна)
      projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[0].id
      );
    });

    it("возобновляет автопрокрутку при уходе мыши (mouseleave)", async () => {
      const { container } = render(<FeaturedProjects />);
      const section = container.querySelector("section")!;

      // Наводим мышь
      await act(async () => {
        fireEvent.mouseEnter(section);
      });

      // Уводим мышь
      await act(async () => {
        fireEvent.mouseLeave(section);
      });

      // Прокручиваем время на 5 секунд
      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });

      // Должен переключиться на следующий проект
      const projectCard = screen.getByTestId("project-card");
      expect(projectCard).toHaveAttribute(
        "data-project-id",
        mockProjects[1].id
      );
    });

    it("очищает таймер при unmount компонента", () => {
      const { unmount } = render(<FeaturedProjects />);

      // Проверяем, что таймер создан
      expect(vi.getTimerCount()).toBeGreaterThan(0);

      // Размонтируем компонент
      unmount();

      // Все таймеры должны быть очищены
      vi.runOnlyPendingTimers();
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe("Адаптивность", () => {
    it("desktop стрелки имеют класс hidden lg:flex", () => {
      const { container } = render(<FeaturedProjects />);

      // Desktop стрелки находятся вне карусели с классами hidden lg:flex
      const desktopButtons = container.querySelectorAll(
        "button.hidden.lg\\:flex"
      );

      // Должно быть 2 desktop кнопки (prev и next)
      expect(desktopButtons.length).toBe(2);
    });

    it("мобильные стрелки имеют класс lg:hidden", () => {
      render(<FeaturedProjects />);

      // Мобильные стрелки находятся внизу с классом lg:hidden
      const allButtons = screen.getAllByRole("button");
      const mobileButtons = allButtons.filter((btn) =>
        btn.className.includes("lg:hidden")
      );

      // Должно быть 2 мобильные кнопки (prev и next)
      expect(mobileButtons.length).toBe(2);
    });

    it("мобильные стрелки находятся рядом с индикаторами", () => {
      const { container } = render(<FeaturedProjects />);

      // Находим контейнер с индикаторами
      const indicatorsContainer = container.querySelector(".flex.gap-2");
      expect(indicatorsContainer).toBeInTheDocument();

      // Проверяем, что родительский элемент содержит мобильные кнопки
      const parentDiv = indicatorsContainer?.parentElement;
      expect(parentDiv).toHaveClass("flex", "items-center", "justify-center");
    });

    it("desktop стрелки позиционированы абсолютно вне карточки", () => {
      const { container } = render(<FeaturedProjects />);

      const desktopPrevButton = container.querySelector(
        "button.absolute.left-0.-translate-x-16"
      );
      const desktopNextButton = container.querySelector(
        "button.absolute.right-0.translate-x-16"
      );

      expect(desktopPrevButton).toBeInTheDocument();
      expect(desktopNextButton).toBeInTheDocument();
    });
  });

  describe("Ссылки и навигация", () => {
    it("отображает кнопку 'Посмотреть все проекты'", () => {
      render(<FeaturedProjects />);
      const button = screen.getByRole("link", {
        name: /Посмотреть все проекты/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("ссылка ведет на страницу /projects", () => {
      render(<FeaturedProjects />);
      const link = screen.getByRole("link", {
        name: /Посмотреть все проекты/i,
      });
      expect(link).toHaveAttribute("href", "/projects");
    });
  });

  describe("Accessibility", () => {
    it("стрелки имеют aria-labels для навигации", () => {
      render(<FeaturedProjects />);

      const nextButtons = screen.getAllByLabelText("Следующий проект");
      const prevButtons = screen.getAllByLabelText("Предыдущий проект");

      // 2 кнопки "Следующий" (desktop + mobile)
      expect(nextButtons).toHaveLength(2);
      // 2 кнопки "Предыдущий" (desktop + mobile)
      expect(prevButtons).toHaveLength(2);
    });

    it("индикаторы имеют aria-labels с номером проекта", () => {
      render(<FeaturedProjects />);

      expect(
        screen.getByRole("button", { name: "Перейти к проекту 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Перейти к проекту 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Перейти к проекту 3" })
      ).toBeInTheDocument();
    });

    it("использует семантичный тег section для секции", () => {
      const { container } = render(<FeaturedProjects />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("заголовок является H2 для иерархии", () => {
      render(<FeaturedProjects />);
      const heading = screen.getByRole("heading", {
        level: 2,
        name: /Избранные проекты/i,
      });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Пустое состояние (empty state)", () => {
    beforeEach(() => {
      // Мокаем пустой массив проектов
      vi.mocked(projectsData.getFeaturedProjects).mockReturnValue([]);
    });

    it("отображает fallback UI при пустом списке проектов", () => {
      render(<FeaturedProjects />);

      // Проверяем наличие fallback элементов
      expect(
        screen.getByText("Избранные проекты скоро появятся")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/В данный момент я работаю над новыми проектами/i)
      ).toBeInTheDocument();
    });

    it("сохраняет заголовок секции при пустом состоянии", () => {
      render(<FeaturedProjects />);

      const heading = screen.getByRole("heading", {
        level: 2,
        name: /Избранные проекты/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it("отображает кнопку перехода на /projects при пустом состоянии", () => {
      render(<FeaturedProjects />);

      const link = screen.getByRole("link", {
        name: /Посмотреть все проекты/i,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/projects");
    });

    it("не отображает карусель и навигацию при пустом состоянии", () => {
      render(<FeaturedProjects />);

      // Не должно быть стрелок навигации
      expect(
        screen.queryByLabelText("Следующий проект")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText("Предыдущий проект")
      ).not.toBeInTheDocument();

      // Не должно быть индикаторов
      expect(
        screen.queryByRole("button", { name: /Перейти к проекту/ })
      ).not.toBeInTheDocument();

      // Не должно быть ProjectCard
      expect(screen.queryByTestId("project-card")).not.toBeInTheDocument();
    });

    it("не создает таймеры автопрокрутки при пустом состоянии", () => {
      render(<FeaturedProjects />);

      // Проверяем, что нет активных таймеров
      expect(vi.getTimerCount()).toBe(0);
    });

    it("не падает при попытке навигации с пустым массивом", () => {
      const { container } = render(<FeaturedProjects />);

      // Попытка вызвать события мыши не должна вызывать ошибок
      const section = container.querySelector("section")!;

      expect(() => {
        fireEvent.mouseEnter(section);
        fireEvent.mouseLeave(section);
      }).not.toThrow();
    });

    it("отображает иконку FolderOpen в fallback UI", () => {
      const { container } = render(<FeaturedProjects />);

      // Ищем SVG элемент (иконка FolderOpen)
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });
});

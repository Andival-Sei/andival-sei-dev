import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../project-card";
import { mockProjects } from "@/data/__mocks__/projects";

describe("ProjectCard", () => {
  const videoProject = mockProjects[0]; // Test Project Video
  const imageProject = mockProjects[1]; // Test Project Image
  const petProject = mockProjects[2]; // Test Pet Project

  describe("Базовый рендеринг", () => {
    it("рендерится grid вариант без ошибок", () => {
      render(<ProjectCard project={videoProject} variant="grid" />);
      expect(screen.getByText(videoProject.title)).toBeInTheDocument();
    });

    it("рендерится featured вариант без ошибок", () => {
      render(<ProjectCard project={videoProject} variant="featured" />);
      expect(screen.getByText(videoProject.title)).toBeInTheDocument();
    });

    it("использует grid вариант по умолчанию", () => {
      const { container } = render(<ProjectCard project={videoProject} />);
      // Grid вариант обернут в Link
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/projects/${videoProject.id}`);
    });
  });

  describe("Grid вариант (вертикальная карточка)", () => {
    describe("Отображение контента", () => {
      it("отображает название проекта", () => {
        render(<ProjectCard project={videoProject} variant="grid" />);
        expect(screen.getByText(videoProject.title)).toBeInTheDocument();
      });

      it("отображает краткое описание", () => {
        render(<ProjectCard project={videoProject} variant="grid" />);
        expect(screen.getByText(videoProject.description)).toBeInTheDocument();
      });

      it("описание имеет класс line-clamp-2 для обрезки текста", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const description = container.querySelector(".line-clamp-2");
        expect(description).toBeInTheDocument();
        expect(description?.textContent).toBe(videoProject.description);
      });
    });

    describe("Медиа превью", () => {
      it("рендерит video элемент для .mp4 файла", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const video = container.querySelector("video");
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute("src", videoProject.media);
      });

      it("video настроен для автовоспроизведения", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const video = container.querySelector("video");
        // Проверяем что video элемент рендерится
        expect(video).toBeInTheDocument();
        // Проверяем наличие source элемента с правильным src
        const source = video?.querySelector("source");
        expect(source).toBeInTheDocument();
        expect(source).toHaveAttribute("src", videoProject.media);
      });

      it("рендерит медиа контейнер для изображения", () => {
        const { container } = render(
          <ProjectCard project={imageProject} variant="grid" />
        );
        // Проверяем что есть контейнер для медиа
        const mediaContainer = container.querySelector(
          ".relative.aspect-video"
        );
        expect(mediaContainer).toBeInTheDocument();
      });
    });

    describe("Технологии", () => {
      it("отображает первые 3 технологии как Badge", () => {
        render(<ProjectCard project={videoProject} variant="grid" />);
        // У videoProject 3 технологии: React, TypeScript, Next.js
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
        expect(screen.getByText("Next.js")).toBeInTheDocument();
      });

      it("отображает '+N' Badge если технологий больше 3", () => {
        render(<ProjectCard project={imageProject} variant="grid" />);
        // У imageProject 5 технологий, показываем первые 3 + "+2"
        expect(screen.getByText("Vue")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.getByText("Webpack")).toBeInTheDocument();
        expect(screen.getByText("+2")).toBeInTheDocument();
      });

      it("все технологии видны если их ≤ 3", () => {
        render(<ProjectCard project={petProject} variant="grid" />);
        // У petProject 2 технологии
        expect(screen.getByText("HTML")).toBeInTheDocument();
        expect(screen.getByText("CSS")).toBeInTheDocument();
        // Нет "+N" Badge
        expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
      });
    });

    describe("Тип проекта", () => {
      it("отображает Badge с типом проекта", () => {
        render(<ProjectCard project={videoProject} variant="grid" />);
        expect(screen.getByText("Рабочий")).toBeInTheDocument();
      });

      it("правильный лейбл для типа 'work'", () => {
        render(<ProjectCard project={videoProject} variant="grid" />);
        expect(screen.getByText("Рабочий")).toBeInTheDocument();
      });

      it("правильный лейбл для типа 'educational'", () => {
        render(<ProjectCard project={imageProject} variant="grid" />);
        expect(screen.getByText("Учебный")).toBeInTheDocument();
      });

      it("правильный лейбл для типа 'pet'", () => {
        render(<ProjectCard project={petProject} variant="grid" />);
        expect(screen.getByText("Pet-проект")).toBeInTheDocument();
      });
    });

    describe("Ссылка на детальную страницу", () => {
      it("карточка обернута в Link", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const link = container.querySelector("a");
        expect(link).toBeInTheDocument();
      });

      it("Link имеет правильный href", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const link = container.querySelector("a");
        expect(link).toHaveAttribute("href", `/projects/${videoProject.id}`);
      });
    });

    describe("Стили и hover эффекты", () => {
      it("карточка имеет класс group", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const card = container.querySelector(".group");
        expect(card).toBeInTheDocument();
      });

      it("медиа имеет hover класс group-hover:scale-105", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const mediaWrapper = container.querySelector(
          ".group-hover\\:scale-105"
        );
        expect(mediaWrapper).toBeInTheDocument();
      });

      it("заголовок имеет hover класс group-hover:text-primary", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="grid" />
        );
        const title = container.querySelector(".group-hover\\:text-primary");
        expect(title).toBeInTheDocument();
        expect(title?.textContent).toBe(videoProject.title);
      });
    });
  });

  describe("Featured вариант (горизонтальная карточка)", () => {
    describe("Структура", () => {
      it("имеет grid layout с 2 колонками", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="featured" />
        );
        const grid = container.querySelector(".md\\:grid-cols-2");
        expect(grid).toBeInTheDocument();
      });

      it("медиа слева, описание справа", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="featured" />
        );
        // Первый дочерний элемент grid - медиа
        const grid = container.querySelector(".md\\:grid-cols-2");
        const firstChild = grid?.firstChild as HTMLElement;
        const mediaElement = firstChild.querySelector("video, img");
        expect(mediaElement).toBeInTheDocument();

        // Второй дочерний элемент - описание с заголовком
        const secondChild = grid?.lastChild as HTMLElement;
        expect(secondChild?.textContent).toContain(videoProject.title);
      });
    });

    describe("Отображение контента", () => {
      it("отображает название с правильными стилями", () => {
        const { container } = render(
          <ProjectCard project={videoProject} variant="featured" />
        );
        const title = container.querySelector("h3");
        expect(title).toBeInTheDocument();
        expect(title?.textContent).toBe(videoProject.title);
        expect(title).toHaveClass("text-2xl", "md:text-3xl", "font-bold");
      });

      it("отображает полное описание (longDescription)", () => {
        render(<ProjectCard project={videoProject} variant="featured" />);
        expect(
          screen.getByText(videoProject.longDescription)
        ).toBeInTheDocument();
        // НЕ краткое описание
        expect(
          screen.queryByText(videoProject.description)
        ).not.toBeInTheDocument();
      });
    });

    describe("Технологии", () => {
      it("отображает все технологии без ограничения", () => {
        render(<ProjectCard project={imageProject} variant="featured" />);
        // У imageProject 5 технологий - должны отобразиться все
        expect(screen.getByText("Vue")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.getByText("Webpack")).toBeInTheDocument();
        expect(screen.getByText("Jest")).toBeInTheDocument();
        expect(screen.getByText("Cypress")).toBeInTheDocument();
        // Нет "+N" badge
        expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
      });
    });

    describe("Кнопки", () => {
      it("кнопка 'Посмотреть' с правильной ссылкой", () => {
        render(<ProjectCard project={videoProject} variant="featured" />);
        const viewButton = screen.getByRole("link", { name: /Посмотреть/i });
        expect(viewButton).toBeInTheDocument();
        expect(viewButton).toHaveAttribute("href", videoProject.liveUrl);
      });

      it("кнопка 'GitHub' с правильной ссылкой", () => {
        render(<ProjectCard project={videoProject} variant="featured" />);
        const githubButton = screen.getByRole("link", { name: /GitHub/i });
        expect(githubButton).toBeInTheDocument();
        expect(githubButton).toHaveAttribute("href", videoProject.githubUrl);
      });

      it("внешние ссылки имеют target='_blank'", () => {
        render(<ProjectCard project={videoProject} variant="featured" />);
        const viewButton = screen.getByRole("link", { name: /Посмотреть/i });
        const githubButton = screen.getByRole("link", { name: /GitHub/i });
        expect(viewButton).toHaveAttribute("target", "_blank");
        expect(githubButton).toHaveAttribute("target", "_blank");
      });

      it("внешние ссылки имеют rel='noopener noreferrer'", () => {
        render(<ProjectCard project={videoProject} variant="featured" />);
        const viewButton = screen.getByRole("link", { name: /Посмотреть/i });
        const githubButton = screen.getByRole("link", { name: /GitHub/i });
        expect(viewButton).toHaveAttribute("rel", "noopener noreferrer");
        expect(githubButton).toHaveAttribute("rel", "noopener noreferrer");
      });

      it("кнопки содержат правильные иконки", () => {
        render(<ProjectCard project={videoProject} variant="featured" />);
        // ArrowUpRight иконка в кнопке "Посмотреть"
        const viewButton = screen.getByRole("link", { name: /Посмотреть/i });
        const arrowIcon = viewButton.querySelector("svg");
        expect(arrowIcon).toBeInTheDocument();

        // Github иконка в кнопке "GitHub"
        const githubButton = screen.getByRole("link", { name: /GitHub/i });
        const githubIcon = githubButton.querySelector("svg");
        expect(githubIcon).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("Video имеет fallback текст", () => {
      const { container } = render(
        <ProjectCard project={videoProject} variant="grid" />
      );
      const video = container.querySelector("video");
      expect(video?.textContent).toContain("Ваш браузер не поддерживает видео");
    });

    it("Links имеют правильные атрибуты для screen readers", () => {
      const { container } = render(
        <ProjectCard project={videoProject} variant="grid" />
      );
      const link = container.querySelector("a");
      expect(link).toHaveAttribute("href");
    });
  });

  describe("Snapshot тесты", () => {
    it("соответствует snapshot для grid варианта", () => {
      const { container } = render(
        <ProjectCard project={videoProject} variant="grid" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для featured варианта", () => {
      const { container } = render(
        <ProjectCard project={videoProject} variant="featured" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("соответствует snapshot для pet-проекта с малым количеством технологий", () => {
      const { container } = render(
        <ProjectCard project={petProject} variant="grid" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

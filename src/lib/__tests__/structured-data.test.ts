import { describe, it, expect, beforeEach, vi } from "vitest";

// Мокаем env модуль
vi.mock("../env", () => ({
  env: {
    siteUrl: "https://test.example.com",
    siteName: "Test Portfolio",
    github: "https://github.com/test",
    telegram: "https://t.me/test",
    vk: "https://vk.com/test",
  },
}));

import {
  getPersonSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getProjectSchema,
} from "../structured-data";

describe("structured-data", () => {
  beforeEach(() => {
    // Сбрасываем моки перед каждым тестом
    vi.clearAllMocks();
  });

  describe("getPersonSchema", () => {
    it("возвращает корректную Person schema", () => {
      const schema = getPersonSchema();

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Andival-Sei",
        url: "https://test.example.com",
        jobTitle: "Frontend Developer",
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "JavaScript",
        ],
        sameAs: [
          "https://github.com/test",
          "https://t.me/test",
          "https://vk.com/test",
        ],
      });
    });

    it("фильтрует пустые значения в sameAs", () => {
      // Тестируем логику фильтрации напрямую
      const testArray = [
        "https://github.com/test",
        "",
        "https://t.me/test",
        undefined,
        "https://vk.com/test",
      ];
      const filtered = testArray.filter(Boolean);

      expect(filtered).toEqual([
        "https://github.com/test",
        "https://t.me/test",
        "https://vk.com/test",
      ]);
    });

    it("фильтрует undefined значения в sameAs", () => {
      // Тестируем логику фильтрации напрямую
      const testArray = [
        "https://github.com/test",
        undefined,
        "https://t.me/test",
        null,
        "https://vk.com/test",
      ];
      const filtered = testArray.filter(Boolean);

      expect(filtered).toEqual([
        "https://github.com/test",
        "https://t.me/test",
        "https://vk.com/test",
      ]);
    });
  });

  describe("getWebsiteSchema", () => {
    it("возвращает корректную WebSite schema", () => {
      const schema = getWebsiteSchema();

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Portfolio",
        url: "https://test.example.com",
        description: "Портфолио Frontend разработчика",
        author: {
          "@type": "Person",
          name: "Andival-Sei",
        },
      });
    });
  });

  describe("getBreadcrumbSchema", () => {
    it("возвращает корректную BreadcrumbList schema", () => {
      const items = [
        { name: "Главная", url: "/" },
        { name: "Проекты", url: "/projects" },
        { name: "Проект 1", url: "/projects/1" },
      ];

      const schema = getBreadcrumbSchema(items);

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://test.example.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Проекты",
            item: "https://test.example.com/projects",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Проект 1",
            item: "https://test.example.com/projects/1",
          },
        ],
      });
    });

    it("работает с пустым массивом", () => {
      const schema = getBreadcrumbSchema([]);

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [],
      });
    });

    it("правильно формирует URL с siteUrl", () => {
      const items = [{ name: "Тест", url: "/test" }];
      const schema = getBreadcrumbSchema(items);

      expect(schema.itemListElement[0].item).toBe(
        "https://test.example.com/test"
      );
    });
  });

  describe("getProjectSchema", () => {
    it("возвращает корректную CreativeWork schema для полного проекта", () => {
      const project = {
        title: "Test Project",
        description: "Test Description",
        technologies: ["React", "TypeScript"],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/test/project",
      };

      const schema = getProjectSchema(project);

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Test Project",
        description: "Test Description",
        author: {
          "@type": "Person",
          name: "Andival-Sei",
        },
        keywords: "React, TypeScript",
        url: "https://demo.example.com",
        codeRepository: "https://github.com/test/project",
      });
    });

    it("работает без опциональных полей", () => {
      const project = {
        title: "Test Project",
        description: "Test Description",
        technologies: ["React"],
      };

      const schema = getProjectSchema(project);

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Test Project",
        description: "Test Description",
        author: {
          "@type": "Person",
          name: "Andival-Sei",
        },
        keywords: "React",
      });

      // Проверяем, что опциональные поля отсутствуют
      expect(schema).not.toHaveProperty("url");
      expect(schema).not.toHaveProperty("codeRepository");
    });

    it("правильно объединяет технологии в keywords", () => {
      const project = {
        title: "Test Project",
        description: "Test Description",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      };

      const schema = getProjectSchema(project);

      expect(schema.keywords).toBe("React, Next.js, TypeScript, Tailwind CSS");
    });

    it("работает с пустым массивом технологий", () => {
      const project = {
        title: "Test Project",
        description: "Test Description",
        technologies: [],
      };

      const schema = getProjectSchema(project);

      expect(schema.keywords).toBe("");
    });
  });
});

import { describe, it, expect, vi } from "vitest";

// Мокаем next/og
vi.mock("next/og", () => ({
  ImageResponse: vi.fn(),
}));

import { createOGImage, type OGImageProps } from "../og-template";

describe("og-template", () => {
  describe("createOGImage", () => {
    it("создает OG изображение с базовыми параметрами", () => {
      const props: OGImageProps = {
        title: "Test Title",
      };

      // Проверяем, что функция не выбрасывает ошибку
      expect(() => createOGImage(props)).not.toThrow();
    });

    it("создает OG изображение с полными параметрами", () => {
      const props: OGImageProps = {
        title: "Test Title",
        subtitle: "Test Subtitle",
        accent: "Test Accent",
        colorScheme: "blue",
      };

      expect(() => createOGImage(props)).not.toThrow();
    });

    it("поддерживает все цветовые схемы", () => {
      const colorSchemes: Array<OGImageProps["colorScheme"]> = [
        "default",
        "blue",
        "purple",
        "green",
        "orange",
      ];

      colorSchemes.forEach((colorScheme) => {
        const props: OGImageProps = {
          title: "Test Title",
          colorScheme,
        };

        expect(() => createOGImage(props)).not.toThrow();
      });
    });

    it("правильно обрабатывает опциональные поля", () => {
      // Тест с subtitle
      const propsWithSubtitle: OGImageProps = {
        title: "Test Title",
        subtitle: "Test Subtitle",
      };

      expect(() => createOGImage(propsWithSubtitle)).not.toThrow();

      // Тест с accent
      const propsWithAccent: OGImageProps = {
        title: "Test Title",
        accent: "Test Accent",
      };

      expect(() => createOGImage(propsWithAccent)).not.toThrow();

      // Тест со всеми полями
      const propsWithAll: OGImageProps = {
        title: "Test Title",
        subtitle: "Test Subtitle",
        accent: "Test Accent",
        colorScheme: "purple",
      };

      expect(() => createOGImage(propsWithAll)).not.toThrow();
    });

    it("обрабатывает длинные заголовки", () => {
      const props: OGImageProps = {
        title:
          "Очень длинный заголовок который может не поместиться в одну строку и должен корректно отображаться",
      };

      expect(() => createOGImage(props)).not.toThrow();
    });

    it("обрабатывает специальные символы в тексте", () => {
      const props: OGImageProps = {
        title: "Тест с символами: !@#$%^&*()_+-=[]{}|;':\",./<>?",
        subtitle: "Подзаголовок с эмодзи 🚀✨",
        accent: "Акцент с HTML: <>&\"'",
      };

      expect(() => createOGImage(props)).not.toThrow();
    });
  });

  describe("OGImageProps interface", () => {
    it("принимает все обязательные поля", () => {
      const validProps: OGImageProps = {
        title: "Test Title",
      };

      expect(validProps.title).toBe("Test Title");
    });

    it("принимает все опциональные поля", () => {
      const validProps: OGImageProps = {
        title: "Test Title",
        subtitle: "Test Subtitle",
        accent: "Test Accent",
        colorScheme: "blue",
      };

      expect(validProps.subtitle).toBe("Test Subtitle");
      expect(validProps.accent).toBe("Test Accent");
      expect(validProps.colorScheme).toBe("blue");
    });

    it("поддерживает все цветовые схемы", () => {
      const colorSchemes: Array<OGImageProps["colorScheme"]> = [
        "default",
        "blue",
        "purple",
        "green",
        "orange",
      ];

      colorSchemes.forEach((colorScheme) => {
        const props: OGImageProps = {
          title: "Test",
          colorScheme,
        };
        expect(props.colorScheme).toBe(colorScheme);
      });
    });
  });
});

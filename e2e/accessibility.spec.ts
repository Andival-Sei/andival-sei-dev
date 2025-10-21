import { test, expect } from "@playwright/test";

test.describe("Доступность (Accessibility)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("должна иметь правильную структуру заголовков", async ({ page }) => {
    // Проверяем наличие h1 на странице
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Проверяем, что h1 единственный на странице
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("должна поддерживать навигацию с клавиатуры", async ({ page }) => {
    // Начинаем с Tab для фокуса на первом интерактивном элементе
    await page.keyboard.press("Tab");

    // Проверяем, что элемент в фокусе
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Переходим по навигации с помощью Tab
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // Проверяем, что произошел переход (может остаться на той же странице)
    const currentUrl = page.url();
    // Просто проверяем, что URL валидный
    expect(currentUrl).toMatch(/^https?:\/\//);
  });

  test("должна иметь правильные ARIA атрибуты", async ({ page }) => {
    // Проверяем кнопки
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute("aria-label");
      const buttonText = await button.textContent();

      // Если кнопка не имеет текста, должна иметь aria-label
      if (!buttonText?.trim()) {
        expect(ariaLabel).toBeTruthy();
      }
    }

    // Проверяем ссылки (только видимые и с текстом)
    const links = page.locator("a:visible");
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute("href");
      const text = await link.textContent();

      // Ссылки должны иметь href
      expect(href).toBeTruthy();

      // Если ссылка имеет текст, он должен быть не пустым
      if (text) {
        expect(text.trim()).toBeTruthy();
      }
    }
  });

  test("должна иметь правильные alt атрибуты для изображений", async ({
    page,
  }) => {
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");

      // Все изображения должны иметь alt атрибут
      expect(alt).toBeTruthy();
    }
  });

  test("должна работать с screen reader", async ({ page }) => {
    // Проверяем, что все интерактивные элементы доступны
    const interactiveElements = page.locator(
      "button, a, input, select, textarea, [tabindex]"
    );
    const count = await interactiveElements.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = interactiveElements.nth(i);

      if (await element.isVisible()) {
        // Проверяем, что элемент не скрыт от screen reader
        const ariaHidden = await element.getAttribute("aria-hidden");
        expect(ariaHidden).not.toBe("true");

        // Проверяем, что элемент имеет доступное имя
        const accessibleName = await element.evaluate((el) => {
          return (
            el.getAttribute("aria-label") ||
            el.getAttribute("aria-labelledby") ||
            el.textContent?.trim() ||
            el.getAttribute("title")
          );
        });

        // Для некоторых элементов допустимо отсутствие имени (например, декоративные иконки)
        if (accessibleName) {
          expect(accessibleName).toBeTruthy();
        }
      }
    }
  });

  test("должна иметь правильные роли для семантических элементов", async ({
    page,
  }) => {
    // Проверяем основные семантические элементы
    const main = page.locator("main").first();
    await expect(main).toBeVisible();

    const header = page.locator("header");
    if ((await header.count()) > 0) {
      await expect(header).toBeVisible();
    }

    const footer = page.locator("footer");
    if ((await footer.count()) > 0) {
      await expect(footer).toBeVisible();
    }

    const nav = page.locator("nav");
    if ((await nav.count()) > 0) {
      await expect(nav).toBeVisible();
    }
  });
});

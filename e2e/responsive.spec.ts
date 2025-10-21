import { test, expect } from "@playwright/test";

test.describe("Адаптивность и мобильная версия", () => {
  test("должна корректно отображаться на мобильных устройствах", async ({
    page,
  }) => {
    // Устанавливаем мобильный viewport (iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Проверяем, что страница загружается без горизонтального скролла
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 390;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Небольшой запас

    // Проверяем, что основные элементы видны
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });

  test("должна работать мобильное меню", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Проверяем наличие кнопки мобильного меню
    const mobileMenuButton = page.locator('button[aria-label="Открыть меню"]');
    await expect(mobileMenuButton).toBeVisible();

    // Открываем мобильное меню
    await mobileMenuButton.click();

    // Проверяем, что меню открылось
    await expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true");
  });

  test("должна адаптироваться под планшеты", async ({ page }) => {
    // Устанавливаем планшетный viewport (iPad)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Проверяем, что контент правильно размещается
    const mainContent = page.locator("main").first();
    await expect(mainContent).toBeVisible();

    // Проверяем, что нет горизонтального скролла
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 768;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });

  test("должна работать на больших экранах", async ({ page }) => {
    // Устанавливаем десктопный viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Проверяем, что контент отображается корректно
    const mainContent = page.locator("main").first();
    await expect(mainContent).toBeVisible();

    // Проверяем, что основные элементы видны
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });

  test("должна правильно отображать изображения на разных устройствах", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      if (await img.isVisible()) {
        // Проверяем, что изображение не выходит за границы контейнера
        const imgRect = await img.boundingBox();
        const containerRect = await img.evaluate((el) => {
          const container = el.closest("div, section, article");
          return container ? container.getBoundingClientRect() : null;
        });

        if (imgRect && containerRect) {
          expect(imgRect.width).toBeLessThanOrEqual(containerRect.width + 10); // Небольшой запас
        }
      }
    }
  });

  test.skip("должна работать touch-взаимодействия", async ({ page: _page }) => {
    // Этот тест пропускается, так как требует специфической настройки touch-элементов
    // В реальном проекте можно добавить специальные CSS классы для touch-элементов
  });

  test("должна правильно отображать текст на разных размерах экрана", async ({
    page,
  }) => {
    const viewports = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 8
      { width: 768, height: 1024 }, // iPad
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Проверяем, что текст читаемый
      const textElements = page.locator("p, h1, h2, h3, h4, h5, h6");
      const textCount = await textElements.count();

      for (let i = 0; i < Math.min(textCount, 3); i++) {
        const textElement = textElements.nth(i);

        if (await textElement.isVisible()) {
          const fontSize = await textElement.evaluate((el) => {
            return parseFloat(window.getComputedStyle(el).fontSize);
          });

          // Минимальный размер шрифта для читаемости
          expect(fontSize).toBeGreaterThanOrEqual(14);
        }
      }
    }
  });
});

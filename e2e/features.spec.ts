import { test, expect } from "@playwright/test";

test.describe("Функциональные возможности", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("должна переключать тему", async ({ page }) => {
    // Проверяем, что тема переключается через localStorage
    const initialTheme = await page.evaluate(() =>
      localStorage.getItem("theme")
    );

    // Находим кнопку переключения темы (первую доступную)
    const themeToggle = page.locator('button[aria-label*="тема"]').first();

    if ((await themeToggle.count()) > 0) {
      await themeToggle.click();

      // Проверяем, что настройка сохранилась в localStorage
      const newTheme = await page.evaluate(() => localStorage.getItem("theme"));
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test("должна отображать контент главной страницы", async ({ page }) => {
    // Проверяем наличие основных секций
    await expect(page.locator("h1")).toContainText("Andival-Sei");
    await expect(
      page.locator("text=Frontend-разработчик").first()
    ).toBeVisible();
    await expect(page.locator("text=Мой стек технологий")).toBeVisible();
  });

  test("должна работать кнопки на главной странице", async ({ page }) => {
    // Проверяем кнопку "Посмотреть проекты" в hero секции
    const projectsButton = page
      .locator('a[href="/projects"]')
      .filter({ hasText: "Посмотреть проекты" });
    if ((await projectsButton.count()) > 0) {
      await expect(projectsButton).toBeVisible();
    }

    // Проверяем кнопку "Отправить Email"
    const emailButton = page.locator('a[href^="mailto:"]');
    await expect(emailButton).toBeVisible();
    await expect(emailButton).toContainText("Отправить Email");
  });

  test("должна работать кнопки социальных сетей", async ({ page }) => {
    // Скроллим к футеру
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Находим ссылки на социальные сети
    const socialLinks = page.locator('footer a[href^="https://"]');
    const count = await socialLinks.count();

    expect(count).toBeGreaterThan(0);

    // Проверяем, что ссылки ведут на правильные URL
    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test("должна работать анимации при скролле", async ({ page }) => {
    // Скроллим вниз по странице
    await page.evaluate(() => window.scrollTo(0, 500));

    // Ждем анимации
    await page.waitForTimeout(1000);

    // Проверяем, что элементы видны
    const techSection = page.locator("text=Мой стек технологий");
    await expect(techSection).toBeVisible();
  });
});

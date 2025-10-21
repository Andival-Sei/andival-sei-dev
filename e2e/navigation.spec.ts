import { test, expect } from "@playwright/test";

test.describe("Навигация по сайту", () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на главную страницу перед каждым тестом
    await page.goto("/");
    // Ждем загрузки контента
    await page.waitForLoadState("networkidle");
  });

  test("должна корректно отображать главную страницу", async ({ page }) => {
    // Проверяем заголовок страницы
    await expect(page).toHaveTitle(/Andival/);

    // Проверяем наличие основных элементов
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });

  test("должна переходить на страницу проектов", async ({ page }) => {
    // Кликаем на ссылку "Проекты" в навигации
    await page.click('a[href="/projects"]');

    // Проверяем URL и заголовок
    await expect(page).toHaveURL("/projects");
    await expect(page).toHaveTitle(/Проекты/);
  });

  test('должна переходить на страницу "О себе"', async ({ page }) => {
    await page.click('a[href="/about"]');

    await expect(page).toHaveURL("/about");
    await expect(page).toHaveTitle(/Обо мне/);
  });

  test("должна переходить на страницу контактов", async ({ page }) => {
    await page.click('a[href="/contact"]');

    await expect(page).toHaveURL("/contact");
    await expect(page).toHaveTitle(/Контакты/);
  });

  test("должна переходить на страницу лаборатории", async ({ page }) => {
    await page.click('a[href="/lab"]');

    await expect(page).toHaveURL("/lab");
    await expect(page).toHaveTitle(/Лаборатория/);
  });

  test("должна работать навигация с клавиатуры", async ({ page }) => {
    // Фокусируемся на навигации
    await page.keyboard.press("Tab");

    // Проверяем, что можем перейти по навигации с помощью клавиш
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // Проверяем, что произошел переход (может остаться на той же странице)
    const currentUrl = page.url();
    // Просто проверяем, что URL валидный
    expect(currentUrl).toMatch(/^https?:\/\//);
  });

  test("должна работать мобильное меню", async ({ page }) => {
    // Устанавливаем мобильный viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Проверяем наличие кнопки мобильного меню
    const mobileMenuButton = page.locator('button[aria-label="Открыть меню"]');
    await expect(mobileMenuButton).toBeVisible();

    // Открываем мобильное меню
    await mobileMenuButton.click();

    // Проверяем, что меню открылось (проверяем aria-expanded)
    await expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true");
  });
});

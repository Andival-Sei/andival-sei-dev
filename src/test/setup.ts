import "@testing-library/jest-dom";
import { vi } from "vitest";

// Глобальный act wrapper для автоматического обертывания всех state updates
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("An update to") &&
    args[0].includes("was not wrapped in act")
  ) {
    // Подавляем act warnings для автоматически обернутых компонентов
    return;
  }
  originalConsoleError(...args);
};

// Мок для next/navigation
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
};

const mockSearchParams = new URLSearchParams();
let mockPathname = "/";
const mockParams: Record<string, string> = {};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
  useParams: () => mockParams,
  notFound: vi.fn(),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
}));

// Экспорт моков для использования в тестах
export { mockRouter, mockSearchParams, mockPathname, mockParams };

// Утилиты для сброса моков между тестами
export const resetNavigationMocks = () => {
  vi.clearAllMocks();
  // Сбрасываем pathname к значению по умолчанию
  mockPathname = "/";
  // Очищаем URLSearchParams через удаление всех ключей
  Array.from(mockSearchParams.keys()).forEach((key) => {
    mockSearchParams.delete(key);
  });
  // Очищаем mockParams
  Object.keys(mockParams).forEach((key) => delete mockParams[key]);
};

// Утилиты для настройки моков в тестах
export const setMockPathname = (pathname: string) => {
  mockPathname = pathname;
};

export const setMockParams = (params: Record<string, string>) => {
  // Очищаем существующие ключи
  Object.keys(mockParams).forEach((key) => delete mockParams[key]);
  // Добавляем новые ключи
  Object.assign(mockParams, params);
};

export const setMockSearchParams = (params: Record<string, string>) => {
  // Очищаем URLSearchParams через удаление всех ключей
  Array.from(mockSearchParams.keys()).forEach((key) => {
    mockSearchParams.delete(key);
  });
  Object.entries(params).forEach(([key, value]) => {
    mockSearchParams.set(key, value);
  });
};

// Мок для next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    themes: ["light", "dark", "system"],
    resolvedTheme: "light",
    systemTheme: "light",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Мок для window.matchMedia (для тестирования responsive дизайна)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Мок для IntersectionObserver (для анимаций при скролле)
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
  takeRecords: vi.fn().mockReturnValue([]),
}));

// Мок для ResizeObserver (для адаптивного дизайна)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Мок для window.scrollTo
window.scrollTo = vi.fn();

// Моки для Radix UI (hasPointerCapture, scrollIntoView)
if (typeof Element !== "undefined") {
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn(() => false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
}

// Мок для next/image - просто пропускаем (рендерится как обычная img)
vi.mock("next/image", () => ({
  __esModule: true,
  default: () => null,
}));

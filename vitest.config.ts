import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Используем jsdom для эмуляции браузерного окружения
    environment: "jsdom",

    // Глобальные утилиты и моки
    setupFiles: ["./src/test/setup.ts"],

    // Включить глобальные API (describe, it, expect)
    globals: true,

    // Исключаем E2E тесты из Vitest
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/e2e/**",
    ],

    // Покрытие кода
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "src/test/**",
        "**/*.config.*",
        "**/*.d.ts",
        "**/types/**",
        ".next/**",
        "public/**",
        "dist/**",
        "build/**",
        "**/__snapshots__/**",
      ],
    },
  },
  resolve: {
    // Алиасы путей как в tsconfig.json
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

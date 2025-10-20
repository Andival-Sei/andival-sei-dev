"use client";

import dynamic from "next/dynamic";

import { ErrorBoundary } from "@/components/error-boundary";

/**
 * Динамический импорт ParticleAnimation для оптимизации загрузки
 * SSR отключен, так как компонент использует canvas API
 */
const ParticleAnimation = dynamic(
  () =>
    import("@/components/lab/particle-animation").then(
      (mod) => mod.ParticleAnimation
    ),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Загрузка анимации...
        </div>
      </div>
    ),
    ssr: false,
  }
);

/**
 * Страница Lab (лаборатория экспериментов)
 * Показывает анимацию частиц с превью "Скоро здесь что-то появится"
 * Использует ErrorBoundary для изоляции ошибок и динамический импорт для оптимизации
 * Client Component для поддержки ssr: false в dynamic import
 */
export default function LabPage() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Не удалось загрузить анимацию
            </p>
            <p className="text-sm text-muted-foreground">
              Попробуйте обновить страницу
            </p>
          </div>
        </div>
      }
    >
      <ParticleAnimation />
    </ErrorBoundary>
  );
}

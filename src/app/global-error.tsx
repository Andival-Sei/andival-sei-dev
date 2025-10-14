"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Глобальная обработка критических ошибок
 * Используется для ошибок на уровне root layout
 * Должен содержать html и body теги (требование Next.js)
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логирование ошибки в сервис мониторинга (Sentry в будущем)
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <h1 className="text-4xl font-bold">Критическая ошибка</h1>
            <p className="text-muted-foreground">
              Произошла критическая ошибка. Пожалуйста, попробуйте обновить
              страницу.
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground">
                ID ошибки: {error.digest}
              </p>
            )}
            <Button onClick={() => reset()}>Попробовать снова</Button>
          </div>
        </div>
      </body>
    </html>
  );
}

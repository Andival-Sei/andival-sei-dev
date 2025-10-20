"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Обработка ошибок для страницы списка проектов
 * Специализированная страница с контекстно-зависимыми сообщениями
 */
export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Не удалось загрузить проекты</h2>
        <p className="text-muted-foreground">
          Возникла ошибка при загрузке списка проектов.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => reset()}>Попробовать снова</Button>
          <Button variant="outline" asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

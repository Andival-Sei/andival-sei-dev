"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Обработка ошибок для страницы отдельного проекта
 */
export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Project Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Ошибка загрузки проекта</h2>
        <p className="text-muted-foreground">
          Не удалось загрузить информацию о проекте.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => reset()}>Попробовать снова</Button>
          <Button variant="outline" asChild>
            <Link href="/projects">Все проекты</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

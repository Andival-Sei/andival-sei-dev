"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Обработка ошибок на уровне приложения
 * Отображается для всех страниц, наследующих стили от layout
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h1 className="text-4xl font-bold">Что-то пошло не так</h1>
        <p className="text-muted-foreground max-w-md">
          {error.message ||
            "Произошла непредвиденная ошибка. Мы уже работаем над её исправлением."}
        </p>
        <div className="flex gap-4">
          <Button onClick={() => reset()}>Попробовать снова</Button>
          <Button variant="outline" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

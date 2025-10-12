import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * Страница 404 для ненайденных проектов
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Проект не найден</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          К сожалению, проект с таким идентификатором не существует или был
          удален.
        </p>
        <Button asChild>
          <Link href="/projects" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Вернуться к проектам
          </Link>
        </Button>
      </div>
    </div>
  );
}

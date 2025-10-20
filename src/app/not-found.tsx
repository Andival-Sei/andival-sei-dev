import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Глобальная страница 404
 * Отображается когда запрошенная страница не найдена
 */
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        {/* Большая 404 с градиентом */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Страница не найдена
          </h2>
        </div>

        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          К сожалению, запрошенная страница не существует или была перемещена.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              На главную
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects" className="gap-2">
              <ArrowLeft className="h-4 w-4" />К проектам
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты | Andival-Sei",
  description: "Мои проекты и работы",
};

/**
 * Страница всех проектов
 * TODO: Добавить Grid layout с карточками проектов (Этап 3)
 */
export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Проекты
        </h1>
        <p className="text-lg text-muted-foreground">
          Здесь будут представлены мои проекты и работы.
        </p>
        <div className="mt-8 text-muted-foreground">
          <p>Coming soon... 🚀</p>
        </div>
      </div>
    </div>
  );
}

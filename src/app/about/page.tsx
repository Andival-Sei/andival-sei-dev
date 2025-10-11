import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обо мне | Andival-Sei",
  description: "Информация обо мне, мой опыт и навыки",
};

/**
 * Страница "Обо мне"
 * TODO: Добавить фото, детальное описание, timeline (Этап 4)
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Обо мне
        </h1>
        <p className="text-lg text-muted-foreground">
          Информация обо мне, моём опыте и навыках.
        </p>
        <div className="mt-8 text-muted-foreground">
          <p>Coming soon... 🚀</p>
        </div>
      </div>
    </div>
  );
}

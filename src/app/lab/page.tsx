import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab | Andival-Sei",
  description: "Лаборатория экспериментов и исследований",
};

/**
 * Страница Lab (лаборатория экспериментов)
 * TODO: Добавить контент и описание (Этап 6)
 */
export default function LabPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Lab
        </h1>
        <p className="text-lg text-muted-foreground">
          Лаборатория экспериментов, исследований и новых идей.
        </p>
        <div className="mt-8 text-muted-foreground">
          <p>Coming soon... 🧪</p>
        </div>
      </div>
    </div>
  );
}

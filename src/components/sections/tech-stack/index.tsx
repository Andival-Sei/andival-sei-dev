import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Reveal } from "@/components/animation/reveal";
import { technologies } from "@/data/technologies";

const TechStackGrid = dynamic(
  () =>
    import("./tech-stack-grid").then((mod) => ({
      default: mod.TechStackGrid,
    })),
  {
    ssr: false,
    loading: () => <TechStackSkeleton />,
  }
);

function TechStackSkeleton() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-6xl animate-pulse rounded-3xl border border-dashed border-border/60 bg-muted/20 px-4 py-24 text-center text-muted-foreground">
        Загрузка стека технологий...
      </div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Мой стек технологий
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Инструменты и технологии, с помощью которых я создаю современные и
            производительные веб-приложения
          </p>
        </Reveal>
      </div>

      <Suspense fallback={<TechStackSkeleton />}>
        <TechStackGrid technologies={technologies} />
      </Suspense>

      <div className="mx-auto mt-16 max-w-7xl px-4">
        <Reveal className="text-center" delay={150}>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            От интерфейса до деплоя — я комбинирую инструменты, которые позволяют
            быстро экспериментировать и выпускать стабильные продукты. Каждый
            элемент стека выбран за надежность и поддержку best practices.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

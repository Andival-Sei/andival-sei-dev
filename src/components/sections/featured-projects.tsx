"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animation/reveal";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";

/**
 * Секция избранных проектов с каруселью
 * Отображает по одному проекту с возможностью переключения
 */
export function FeaturedProjects() {
  const projects = getFeaturedProjects();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      {/* Заголовок секции */}
      <Reveal className="mb-12 text-center md:mb-16">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Избранные проекты
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl">
          Мои лучшие работы, демонстрирующие навыки в React, TypeScript и
          современной веб-разработке
        </p>
      </Reveal>

      {/* Карусель с проектом */}
      <div className="relative max-w-6xl mx-auto">
        {/* Стрелка влево (вне карточки, только на десктопе) */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 
                     hidden lg:flex items-center justify-center
                     w-12 h-12 rounded-full bg-background border shadow-lg
                     hover:bg-accent transition-colors"
          aria-label="Предыдущий проект"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Карточка проекта с анимацией */}
        <Reveal key={currentIndex} delay={100}>
          <ProjectCard project={projects[currentIndex]} variant="featured" />
        </Reveal>

        {/* Стрелка вправо (вне карточки, только на десктопе) */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10
                     hidden lg:flex items-center justify-center
                     w-12 h-12 rounded-full bg-background border shadow-lg
                     hover:bg-accent transition-colors"
          aria-label="Следующий проект"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Индикаторы и мобильные стрелки */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Мобильная стрелка влево */}
        <button
          onClick={goToPrevious}
          className="lg:hidden flex items-center justify-center w-10 h-10 
                     rounded-full border hover:bg-accent transition-colors"
          aria-label="Предыдущий проект"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Точки-индикаторы */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Перейти к проекту ${index + 1}`}
            />
          ))}
        </div>

        {/* Мобильная стрелка вправо */}
        <button
          onClick={goToNext}
          className="lg:hidden flex items-center justify-center w-10 h-10 
                     rounded-full border hover:bg-accent transition-colors"
          aria-label="Следующий проект"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Ссылка на все проекты */}
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">Посмотреть все проекты</Link>
        </Button>
      </div>
    </section>
  );
}

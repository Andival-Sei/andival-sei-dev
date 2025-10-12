"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="mb-12 md:mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Избранные проекты
        </h2>
        <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
          Мои лучшие работы, демонстрирующие навыки в React, TypeScript и
          современной веб-разработке
        </p>
      </div>

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
        <div
          key={currentIndex}
          className="animate-in fade-in zoom-in-95 duration-500"
        >
          <ProjectCard project={projects[currentIndex]} variant="featured" />
        </div>

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

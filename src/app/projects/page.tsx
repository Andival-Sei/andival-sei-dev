"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectsFilters } from "@/components/projects-filters";
import { projects, getAllTechnologies, getProjectTypes } from "@/data/projects";

/**
 * Страница всех проектов с фильтрацией, поиском и сортировкой
 */
export default function ProjectsPage() {
  // Состояния фильтров
  const [searchQuery, setSearchQuery] = useState("");
  const [projectType, setProjectType] = useState("all");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Получение уникальных технологий и типов проектов
  const allTechnologies = useMemo(() => getAllTechnologies(), []);
  const projectTypes = useMemo(() => getProjectTypes(), []);

  // Фильтрация и сортировка проектов
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по типу проекта
    if (projectType !== "all") {
      filtered = filtered.filter((project) => project.type === projectType);
    }

    // Фильтр по технологиям
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechnologies.every((tech) =>
          project.technologies.includes(tech)
        )
      );
    }

    // Сортировка по дате
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [searchQuery, projectType, selectedTechnologies, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Проекты
          </h1>
          <p className="text-lg text-muted-foreground">
            Мои работы и проекты: от учебных до коммерческих разработок
          </p>
        </div>

        {/* Фильтры */}
        <div className="mb-8">
          <ProjectsFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            projectType={projectType}
            onProjectTypeChange={setProjectType}
            selectedTechnologies={selectedTechnologies}
            onTechnologiesChange={setSelectedTechnologies}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            allTechnologies={allTechnologies}
            projectTypes={projectTypes}
          />
        </div>

        {/* Grid с проектами */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-2">
              Проекты не найдены
            </p>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить параметры фильтрации
            </p>
          </div>
        )}

        {/* Статистика */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Показано проектов: {filteredProjects.length} из {projects.length}
        </div>
      </div>
    </div>
  );
}

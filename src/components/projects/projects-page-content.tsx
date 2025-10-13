"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/animation/reveal";
import { ProjectCard } from "@/components/project-card";
import { ProjectsFilters } from "@/components/projects-filters";
import type { Project } from "@/data/projects";

interface ProjectsPageContentProps {
  projects: Project[];
  allTechnologies: string[];
  projectTypes: { value: string; label: string }[];
}

export function ProjectsPageContent({
  projects,
  allTechnologies,
  projectTypes,
}: ProjectsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectType, setProjectType] = useState("all");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (searchQuery) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (projectType !== "all") {
      filtered = filtered.filter((project) => project.type === projectType);
    }

    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechnologies.every((tech) => project.technologies.includes(tech))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [projects, projectType, searchQuery, selectedTechnologies, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Проекты
          </h1>
          <p className="text-lg text-muted-foreground">
            Мои работы и проекты: от учебных до коммерческих разработок
          </p>
        </Reveal>

        <Reveal className="mb-8" delay={80}>
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
        </Reveal>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 60}>
                <ProjectCard project={project} variant="grid" />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="py-16 text-center" delay={100}>
            <p className="mb-2 text-xl text-muted-foreground">Проекты не найдены</p>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить параметры фильтрации
            </p>
          </Reveal>
        )}

        <Reveal
          className="mt-8 text-center text-sm text-muted-foreground"
          delay={120}
        >
          Показано проектов: {filteredProjects.length} из {projects.length}
        </Reveal>
      </div>
    </div>
  );
}

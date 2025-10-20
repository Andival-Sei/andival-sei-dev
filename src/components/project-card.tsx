import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { getMediaType } from "@/data/projects";

/**
 * Универсальный компонент карточки проекта
 * Поддерживает два варианта отображения: featured и grid
 * Поддерживает изображения, видео и GIF
 */

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "grid";
}

/**
 * Получить отображаемое название типа проекта
 */
const getProjectTypeLabel = (type: Project["type"]) => {
  const labels = {
    work: "Рабочий",
    educational: "Учебный",
    pet: "Pet-проект",
  };
  return labels[type];
};

/**
 * Компонент для отображения медиа (изображение или видео)
 */
function ProjectMedia({ project }: { project: Project }) {
  const mediaType = project.mediaType || getMediaType(project.media);

  if (mediaType === "video") {
    return (
      <video
        src={project.media}
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      >
        <source src={project.media} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    );
  }

  // Для изображений и GIF используем Next.js Image
  return (
    <Image
      src={project.media}
      alt={project.title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export function ProjectCard({ project, variant = "grid" }: ProjectCardProps) {
  if (variant === "featured") {
    // Горизонтальная карточка: изображение слева (50%) + текст справа (50%)
    return (
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Медиа слева */}
        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
          <ProjectMedia project={project} />
        </div>

        {/* Описание справа */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {project.longDescription}
          </p>

          {/* Технологии */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Посмотреть
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Вертикальная карточка для grid (для страницы /projects)
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group rounded-lg overflow-hidden border bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <div className="transition-transform group-hover:scale-105 duration-300 w-full h-full">
            <ProjectMedia project={project} />
          </div>
          {/* Тип проекта в углу превью */}
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="text-xs backdrop-blur-sm bg-background/80"
            >
              {getProjectTypeLabel(project.type)}
            </Badge>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

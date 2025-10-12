import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectById, projects } from "@/data/projects";
import { getMediaType } from "@/data/projects";
import type { Metadata } from "next";

/**
 * Генерация статических путей для всех проектов
 */
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

/**
 * Генерация метаданных для SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Проект не найден | Andival-Sei",
    };
  }

  return {
    title: `${project.title} | Andival-Sei`,
    description: project.longDescription,
  };
}

/**
 * Компонент для отображения медиа проекта
 */
function ProjectMedia({
  project,
}: {
  project: {
    media: string;
    mediaType?: "image" | "video" | "gif";
    title: string;
  };
}) {
  const mediaType = project.mediaType || getMediaType(project.media);

  if (mediaType === "video") {
    return (
      <video
        src={project.media}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={project.media} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    );
  }

  return (
    <img
      src={project.media}
      alt={project.title}
      className="w-full h-full object-cover"
    />
  );
}

/**
 * Получить отображаемое название типа проекта
 */
const getProjectTypeLabel = (type: "work" | "educational" | "pet") => {
  const labels = {
    work: "Рабочий проект",
    educational: "Учебный проект",
    pet: "Pet-проект",
  };
  return labels[type];
};

/**
 * Страница отдельного проекта
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  // Если проект не найден, показываем 404
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Кнопка "Назад" */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/projects">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Назад к проектам
          </Button>
        </Link>
      </div>

      {/* Превью медиа */}
      <div className="w-full aspect-video bg-muted overflow-hidden border-y">
        <ProjectMedia project={project} />
      </div>

      {/* Контент проекта */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Заголовок и тип */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">
                {getProjectTypeLabel(project.type)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(project.date).toLocaleDateString("ru-RU", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Посмотреть сайт
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub репозиторий
              </a>
            </Button>
          </div>

          {/* Описание */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">О проекте</h2>
            <p className="text-lg leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Технологии */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Технологии</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-base px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

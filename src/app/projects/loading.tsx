import { ProjectCardSkeleton } from "@/components/project-card-skeleton";

/**
 * Loading state для страницы со списком проектов
 * Показывает skeleton для заголовка, фильтров и сетки проектов
 */
export default function ProjectsLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Заголовок */}
        <div className="space-y-4">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-md" />
        </div>

        {/* Фильтры */}
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-muted animate-pulse rounded-md"
            />
          ))}
        </div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

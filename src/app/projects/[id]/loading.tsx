import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading state для страницы отдельного проекта
 */
export default function ProjectLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Заголовок */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Медиа */}
        <Skeleton className="aspect-video w-full rounded-lg" />

        {/* Описание */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        {/* Технологии */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}

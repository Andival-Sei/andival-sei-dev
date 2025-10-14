import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton компонент для ProjectCard
 * Поддерживает два варианта: featured и grid
 */
export function ProjectCardSkeleton({
  variant = "grid",
}: {
  variant?: "grid" | "featured";
}) {
  if (variant === "featured") {
    return (
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Медиа */}
        <Skeleton className="aspect-video rounded-lg" />

        {/* Контент */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border bg-card">
      <Skeleton className="aspect-video" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>
    </div>
  );
}

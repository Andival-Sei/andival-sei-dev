import { cn } from "@/lib/utils";

/**
 * Универсальный Skeleton компонент для loading states
 * Использует pulse анимацию для создания эффекта загрузки
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };

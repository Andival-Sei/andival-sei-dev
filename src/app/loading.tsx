/**
 * Глобальный loading state
 * Отображается при переходах между страницами
 */
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Загрузка...</p>
      </div>
    </div>
  );
}

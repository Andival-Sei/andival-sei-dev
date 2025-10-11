import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Базовый футер приложения
 * TODO: Доработать футер позже (добавить навигацию, копирайт, ссылки и т.д.)
 */
export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          {/* Плейсхолдер для будущего контента */}
          <div className="text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Andival Portfolio</p>
          </div>

          {/* Переключатель тем */}
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

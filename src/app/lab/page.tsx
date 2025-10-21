/**
 * Страница Lab (лаборатория экспериментов)
 * Временно показывает сообщение "В разработке"
 * Простой статичный компонент без анимаций
 */
export default function LabPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
          В разработке
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Здесь скоро появятся интересные эксперименты и интерактивные демо
        </p>
      </div>
    </div>
  );
}

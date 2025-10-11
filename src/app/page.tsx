import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Заголовок */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Добро пожаловать в портфолио
        </h1>
        <p className="text-lg text-muted-foreground">
          Система тем настроена и готова к использованию!
        </p>
      </div>

      {/* Демонстрация цветовой палитры */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Цветовая палитра
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Акцентный цвет */}
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="h-20 rounded-md bg-primary mb-4"></div>
            <h3 className="font-semibold text-card-foreground mb-2">
              Primary (Зелёный)
            </h3>
            <p className="text-sm text-muted-foreground">
              Основной акцентный цвет
            </p>
          </div>

          {/* Success */}
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="h-20 rounded-md bg-success mb-4"></div>
            <h3 className="font-semibold text-card-foreground mb-2">Success</h3>
            <p className="text-sm text-muted-foreground">
              Цвет успешных операций
            </p>
          </div>

          {/* Warning */}
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="h-20 rounded-md bg-warning mb-4"></div>
            <h3 className="font-semibold text-card-foreground mb-2">Warning</h3>
            <p className="text-sm text-muted-foreground">Цвет предупреждений</p>
          </div>

          {/* Error */}
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="h-20 rounded-md bg-error mb-4"></div>
            <h3 className="font-semibold text-card-foreground mb-2">Error</h3>
            <p className="text-sm text-muted-foreground">Цвет ошибок</p>
          </div>

          {/* Info */}
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="h-20 rounded-md bg-info mb-4"></div>
            <h3 className="font-semibold text-card-foreground mb-2">Info</h3>
            <p className="text-sm text-muted-foreground">Информационный цвет</p>
          </div>

          {/* Secondary */}
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="h-20 rounded-md bg-secondary mb-4"></div>
            <h3 className="font-semibold text-card-foreground mb-2">
              Secondary
            </h3>
            <p className="text-sm text-muted-foreground">Вторичный цвет</p>
          </div>
        </div>
      </div>

      {/* Примеры компонентов */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Примеры компонентов
        </h2>
        <div className="rounded-lg border border-border p-8 bg-card">
          <h3 className="font-semibold text-card-foreground mb-4">Badges</h3>
          <div className="flex flex-wrap gap-3">
            <Badge>По умолчанию</Badge>
            <Badge variant="success">Успех</Badge>
            <Badge variant="warning">Предупреждение</Badge>
            <Badge variant="destructive">Ошибка</Badge>
            <Badge variant="info">Информация</Badge>
            <Badge variant="secondary">Вторичный</Badge>
            <Badge variant="outline">Контур</Badge>
          </div>
        </div>
      </div>

      {/* Инструкции */}
      <div className="rounded-lg border border-border p-8 bg-card">
        <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
          Как использовать
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Переключатель тем в футере:
            </strong>{" "}
            Используйте три кнопки для выбора темы (Системная, Светлая, Тёмная)
          </li>
          <li>
            <strong className="text-foreground">
              Легкая замена акцентного цвета:
            </strong>{" "}
            Все зелёные оттенки сгруппированы в{" "}
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              src/app/globals.css
            </code>
          </li>
          <li>
            <strong className="text-foreground">Семантические цвета:</strong>{" "}
            Доступны цвета success, warning, error, info для использования в
            компонентах
          </li>
          <li>
            <strong className="text-foreground">Tailwind классы:</strong>{" "}
            Используйте{" "}
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              bg-primary
            </code>
            ,{" "}
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              text-success
            </code>
            ,{" "}
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              border-warning
            </code>{" "}
            и т.д.
          </li>
        </ul>
      </div>
    </div>
  );
}

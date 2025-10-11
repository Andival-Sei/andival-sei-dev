import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты | Andival-Sei",
  description: "Свяжитесь со мной",
};

/**
 * Страница контактов
 * TODO: Добавить форму обратной связи, контактную информацию (Этап 5)
 */
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Свяжитесь со мной
        </h1>
        <p className="text-lg text-muted-foreground">
          Буду рад ответить на ваши вопросы и предложения.
        </p>
        <div className="mt-8 text-muted-foreground">
          <p>Coming soon... 📧</p>
        </div>
      </div>
    </div>
  );
}

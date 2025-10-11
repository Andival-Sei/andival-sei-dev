import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

/**
 * Hero секция главной страницы
 * Содержит приветствие, краткое описание и CTA кнопки
 */
export function Hero() {
  const email = "freedomdragon777@gmail.com";

  return (
    <section className="container mx-auto px-4 py-20 md:py-32 lg:py-40">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
            Andival-Sei
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
            Frontend-разработчик
          </p>
        </div>

        {/* Описание */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Привет, я Кирилл, Frontend-разработчик. Пока что я только начинаю
            свой путь. Создаю современные и отзывчивые веб-приложения с
            использованием React и TypeScript. Учусь и развиваюсь с каждым
            проектом.
          </p>
        </div>

        {/* CTA кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {/* Кнопка "Посмотреть проекты" */}
          <Button asChild size="lg" className="group text-base">
            <Link href="/projects">
              Посмотреть проекты
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Кнопка "Отправить Email" */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group text-base"
          >
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Отправить Email
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

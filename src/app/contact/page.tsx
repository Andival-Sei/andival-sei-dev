import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { Mail } from "lucide-react";
import { FaGithub, FaTelegram, FaVk } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Контакты | Andival-Sei",
  description:
    "Свяжитесь со мной через email или социальные сети. Открыт для новых проектов и предложений.",
};

/**
 * Страница контактов
 * Минималистичный дизайн с email и социальными сетями
 */
export default function ContactPage() {
  const email = "freedomdragon777@gmail.com";

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Andival-Sei",
      icon: FaGithub,
      description: "Мои проекты и код",
    },
    {
      name: "Telegram",
      url: "https://t.me/Andiewahl",
      icon: FaTelegram,
      description: "Быстрая связь",
    },
    {
      name: "VK",
      url: "https://vk.com/andiewahl",
      icon: FaVk,
      description: "Социальная сеть",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Заголовок */}
        <Reveal className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Свяжитесь со мной
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Открыт для новых проектов и предложений. Буду рад обсудить
            возможности сотрудничества.
          </p>
        </Reveal>

        {/* Email секция */}
        <Reveal className="mb-12" delay={120}>
          <div className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent/5 sm:p-8">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Email</h2>
              <p className="mt-2 text-muted-foreground">
                Предпочитаемый способ связи для деловых вопросов
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${email}`}
                className="text-lg font-medium text-foreground hover:underline"
              >
                {email}
              </a>
              <Button asChild size="lg" className="group">
                <a href={`mailto:${email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Отправить письмо
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Социальные сети */}
        <Reveal delay={200}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Социальные сети
            </h2>
            <p className="mt-2 text-muted-foreground">
              Также можете найти меня в социальных сетях
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border bg-card p-6 transition-all hover:border-primary hover:bg-accent/5 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                    <h3 className="text-lg font-semibold">{link.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

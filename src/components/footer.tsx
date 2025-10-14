import { ThemeToggle } from "@/components/theme-toggle";
import { FaGithub, FaTelegram, FaVk } from "react-icons/fa";
import { env } from "@/lib/env";

/**
 * Футер приложения с социальными сетями, копирайтом и переключателем темы
 */
export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: env.github,
      icon: FaGithub,
    },
    {
      name: "Telegram",
      url: env.telegram,
      icon: FaTelegram,
    },
    {
      name: "VK",
      url: env.vk,
      icon: FaVk,
    },
  ].filter((link) => link.url); // Фильтруем пустые ссылки

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Копирайт */}
          <div className="text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Andival-Sei</p>
          </div>

          {/* Социальные сети */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Переключатель темы */}
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

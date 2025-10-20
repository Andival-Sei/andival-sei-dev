"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Навигационные ссылки приложения
 */
const navLinks = [
  { href: "/projects", label: "Проекты" },
  { href: "/about", label: "Обо мне" },
  { href: "/lab", label: "Lab" },
];

/**
 * Header компонент с sticky позиционированием и адаптивным дизайном
 *
 * Особенности:
 * - Sticky header с плавной анимацией при скролле
 * - Адаптивное мобильное меню (Sheet)
 * - Кнопка "Связаться" как CTA
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Отслеживание скролла для изменения стиля header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b bg-background/80 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Логотип/ник слева */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
          >
            Andival-Sei
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Кнопки справа */}
          <div className="flex items-center gap-3">
            {/* Кнопка "Связаться" - скрыта на мобильных */}
            <Button
              asChild
              size="default"
              className="hidden font-medium sm:inline-flex"
            >
              <Link href="/contact">Связаться</Link>
            </Button>

            {/* Мобильное меню */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Открыть меню"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-[20rem] sm:max-w-[22rem]"
              >
                <SheetHeader>
                  <SheetTitle>Навигация</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Button asChild size="default" className="w-full font-medium">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Связаться
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import {
  personalInfo,
  timelineEvents,
  skills,
  interests,
  getSkillsByCategory,
} from "@/data/about";
import { technologies, type Technology } from "@/data/technologies";

/**
 * Страница "Обо мне"
 * Креативная страница с фото, timeline и интерактивными элементами
 */
export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer для анимаций при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("timeline-item-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const frontendSkills = getSkillsByCategory("frontend");
  const toolsSkills = getSkillsByCategory("tools");
  const backendSkills = getSkillsByCategory("backend");
  const softSkills = getSkillsByCategory("soft");

  const skillClusters: SkillClusterProps[] = [
    {
      title: "Frontend",
      subtitle:
        "Компонентный UI, SSR/ISR в Next.js, адаптивная и доступная верстка",
      skills: frontendSkills,
    },
    {
      title: "Tools & Testing",
      subtitle:
        "CI/CD, линтинг, автотесты и поддержка продуктивного процесса разработки",
      skills: toolsSkills,
    },
    {
      title: "Backend (базовый)",
      subtitle:
        "REST API, интеграции и работа с Node.js для задач фронтенда",
      skills: backendSkills,
    },
    {
      title: "Soft Skills",
      subtitle:
        "Командная работа, фасилитация обсуждений и ясная коммуникация с бизнесом",
      skills: softSkills,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero секция с фото */}
      <section className="container relative mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div
          className={`mx-auto grid max-w-6xl gap-8 transition-all duration-1000 lg:grid-cols-2 lg:gap-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Фото профиля */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Декоративные элементы */}
            <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-3xl" />
          </div>

          {/* Основная информация */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400 sm:text-2xl">
              {personalInfo.role}
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {personalInfo.bio}
            </p>

            {/* Быстрая информация */}
            <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            </div>

            {/* Статус доступности */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              {personalInfo.availability}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Связаться со мной
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Посмотреть проекты
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline секция */}
      <section className="border-t bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Мой путь
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            Опыт работы, образование и достижения
          </p>

          <div ref={timelineRef} className="relative mx-auto max-w-4xl">
            {/* Вертикальная линия */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 sm:block lg:left-1/2" />

            {/* События timeline */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={event.id}
                    className={`timeline-item relative opacity-0 transition-all duration-700 ${
                      isLeft ? "lg:text-right" : ""
                    }`}
                  >
                    {/* Иконка события */}
                    <div
                      className={`absolute left-8 -translate-x-1/2 rounded-full border-4 border-background p-2 shadow-lg ${
                        event.type === "work"
                          ? "bg-blue-500"
                          : event.type === "education"
                            ? "bg-purple-500"
                            : "bg-pink-500"
                      } sm:left-8 lg:left-1/2`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>

                    {/* Карточка события */}
                    <div
                      className={`ml-20 sm:ml-20 ${
                        isLeft
                          ? "lg:ml-0 lg:mr-[calc(50%+3rem)]"
                          : "lg:ml-[calc(50%+3rem)]"
                      }`}
                    >
                      <div className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        {/* Градиентный акцент */}
                        <div
                          className={`absolute left-0 top-0 h-full w-1 ${
                            event.type === "work"
                              ? "bg-blue-500"
                              : event.type === "education"
                                ? "bg-purple-500"
                                : "bg-pink-500"
                          }`}
                        />

                        {/* Год */}
                        <div className="mb-2 text-sm font-semibold text-muted-foreground">
                          {event.year}
                        </div>

                        {/* Заголовок */}
                        <h3 className="mb-1 text-xl font-bold">
                          {event.title}
                        </h3>

                        {/* Организация */}
                        <div className="mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                          {event.organization}
                        </div>

                        {/* Описание */}
                        <p className="text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Навыки и технологии */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Навыки и технологии
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            От фундамента вёрстки до отлаженных процессов доставки фич в прод
          </p>

          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.65fr)]">
            <div className="space-y-6">
              {TECH_HIGHLIGHTS.map((highlight) => (
                <TechHighlightCard key={highlight.title} {...highlight} />
              ))}
            </div>
            <div className="space-y-6">
              {skillClusters.map((cluster) => (
                <SkillCluster key={cluster.title} {...cluster} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Интересы секция */}
      <section className="border-t bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Интересы и хобби
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            Чем я занимаюсь помимо кода
          </p>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {interests.map((interest) => {
              const Icon = interest.icon;
              return (
                <div
                  key={interest.name}
                  className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Градиентный фон при hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <Icon className="mb-4 h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:text-blue-400" />
                    <h3 className="mb-2 text-lg font-bold">{interest.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {interest.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center shadow-xl sm:p-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Есть интересный проект?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Я всегда открыт для обсуждения новых идей и возможностей
              сотрудничества
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Написать мне
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Посмотреть работы
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Компонент категории навыков
 */
interface SkillClusterProps {
  title: string;
  subtitle: string;
  skills: Array<{ name: string; level: number }>;
}

interface TechHighlightConfig {
  title: string;
  description: string;
  techIds: Array<Technology["id"]>;
  accent: string;
}

const LEVEL_LABELS: Record<number, string> = {
  5: "эксперт",
  4: "продвинутый",
  3: "уверенный",
  2: "практика",
  1: "основы",
};

const TECH_HIGHLIGHTS: TechHighlightConfig[] = [
  {
    title: "Фронтенд-основа",
    description:
      "Собираю адаптивные интерфейсы, держу в фокусе доступность и пиксель-перфект.",
    techIds: ["html", "css", "scss", "javascript", "typescript"],
    accent: "from-blue-500/20 via-purple-500/10 to-transparent",
  },
  {
    title: "React-экосистема",
    description:
      "Проектирую архитектуру, оптимизирую рендер и строю UI-киты на React и Next.js.",
    techIds: ["react", "typescript", "vite", "vitest", "playwright"],
    accent: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    title: "Процессы и инструменты",
    description:
      "Настраиваю CI/CD, пишу автотесты и поддерживаю прозрачную коммуникацию в команде.",
    techIds: ["git", "vercel", "figma", "gpt", "claude"],
    accent: "from-emerald-500/20 via-blue-500/10 to-transparent",
  },
];

const getLevelLabel = (level: number) => LEVEL_LABELS[level] ?? "уверенный";

function TechHighlightCard({
  title,
  description,
  techIds,
  accent,
}: TechHighlightConfig) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card/60 p-6 shadow-sm">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-80`}
      />
      <div className="relative">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {techIds.map((techId) => {
            const tech = technologies.find((item) => item.id === techId);
            if (!tech) {
              return null;
            }
            const Icon = tech.icon;
            return (
              <div
                key={techId}
                className="flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-sm font-medium shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                title={tech.description}
              >
                <Icon
                  size={20}
                  className="shrink-0"
                  style={{ color: tech.color }}
                  aria-hidden="true"
                />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SkillCluster({ title, subtitle, skills }: SkillClusterProps) {
  return (
    <div className="rounded-2xl border bg-card/60 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-sm font-medium shadow-sm"
            aria-label={`${skill.name} — уровень ${getLevelLabel(skill.level)}`}
          >
            <span>{skill.name}</span>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {getLevelLabel(skill.level)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

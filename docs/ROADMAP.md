# 🚀 Roadmap развития портфолио Andival-Sei

> **Дата создания:** 14.10.2025  
> **Текущий статус:** MVP готов на 80%, требуется оптимизация и подготовка к продакшену  
> **Покрытие тестами:** 60.86%

---

## 📊 Текущее состояние проекта

### ✅ Что уже сделано

- Базовая структура Next.js 15 + React 19
- Все основные страницы (/, /projects, /about, /contact, /lab)
- UI компоненты (shadcn/ui)
- Темная/светлая тема
- Адаптивный дизайн
- Покрытие тестами 60.86%
- ESLint + Prettier настроены

### ❌ Критические проблемы

- Отсутствие SEO оптимизации
- Нет обработки ошибок (error.tsx, not-found.tsx)
- Отсутствуют environment variables
- Нет оптимизации изображений
- Пустой next.config.ts
- Шаблонный README.md
- Отсутствует CI/CD
- Нет аналитики и мониторинга

---

## 🎯 ФАЗА 1: КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ

**Срок:** 3-4 дня  
**Цель:** Подготовить проект к production деплою

### День 1: SEO и метаданные

#### Шаг 1.1: Настройка базового SEO

- [ ] **1.1.1** Обновить `src/app/layout.tsx` - расширенные метаданные
  ```typescript
  export const metadata: Metadata = {
    metadataBase: new URL("https://your-domain.com"),
    title: {
      default: "Andival-Sei | Frontend разработчик",
      template: "%s | Andival-Sei",
    },
    description:
      "Портфолио Frontend разработчика. React, Next.js, TypeScript. Создаю современные веб-приложения.",
    keywords: ["frontend", "react", "nextjs", "typescript", "web development"],
    authors: [{ name: "Andival-Sei" }],
    creator: "Andival-Sei",
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: "https://your-domain.com",
      siteName: "Andival-Sei Portfolio",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
  ```

#### Шаг 1.2: Метаданные для всех страниц

- [ ] **1.2.1** Создать `src/app/about/metadata.ts`

  ```typescript
  import type { Metadata } from "next";

  export const metadata: Metadata = {
    title: "Обо мне",
    description:
      "Мой опыт, навыки и интересы. Frontend разработчик с фокусом на React и Next.js.",
  };
  ```

- [ ] **1.2.2** Добавить metadata в `src/app/about/layout.tsx`
- [ ] **1.2.3** Создать metadata для `/projects`
- [ ] **1.2.4** Создать metadata для `/contact`
- [ ] **1.2.5** Создать metadata для `/lab`

#### Шаг 1.3: Динамические метаданные для проектов

- [ ] **1.3.1** Создать `generateMetadata` в `src/app/projects/[id]/page.tsx`

  ```typescript
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectById(params.id);
    if (!project) return { title: "Проект не найден" };

    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.longDescription,
        images: [project.media],
      },
    };
  }
  ```

#### Шаг 1.4: Sitemap и robots.txt

- [ ] **1.4.1** Установить `pnpm add next-sitemap -D`
- [ ] **1.4.2** Создать `next-sitemap.config.js`
  ```javascript
  module.exports = {
    siteUrl: process.env.SITE_URL || "https://your-domain.com",
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: "/api/" },
      ],
    },
  };
  ```
- [ ] **1.4.3** Добавить в `package.json` скрипт: `"postbuild": "next-sitemap"`
- [ ] **1.4.4** Создать `public/robots.txt` (базовый)

#### Шаг 1.5: Структурированные данные (JSON-LD)

- [ ] **1.5.1** Создать `src/lib/structured-data.ts`
- [ ] **1.5.2** Добавить PersonSchema в `layout.tsx`
- [ ] **1.5.3** Добавить WebsiteSchema в `layout.tsx`
- [ ] **1.5.4** Добавить BreadcrumbList для страниц

#### Шаг 1.6: Open Graph изображение

- [ ] **1.6.1** Создать `public/og-image.png` (1200x630px)
- [ ] **1.6.2** Или использовать Next.js Image Generation API (опционально)

**✅ Результат Дня 1:** Полная SEO оптимизация, sitemap, robots.txt, OG теги

---

### День 2: Обработка ошибок и загрузка

#### Шаг 2.1: Глобальная обработка ошибок

- [ ] **2.1.1** Создать `src/app/error.tsx` (Error Boundary)

  ```typescript
  'use client';

  export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">Что-то пошло не так</h1>
        <p className="mb-8 text-muted-foreground">{error.message}</p>
        <Button onClick={() => reset()}>Попробовать снова</Button>
      </div>
    );
  }
  ```

#### Шаг 2.2: Глобальная 404 страница

- [ ] **2.2.1** Создать `src/app/not-found.tsx`

  ```typescript
  import Link from 'next/link';
  import { Button } from '@/components/ui/button';

  export default function NotFound() {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl">Страница не найдена</h2>
        <p className="mb-8 text-muted-foreground">
          К сожалению, запрошенная страница не существует
        </p>
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    );
  }
  ```

#### Шаг 2.3: Loading states

- [ ] **2.3.1** Создать `src/app/loading.tsx` (глобальный)
- [ ] **2.3.2** Создать `src/app/projects/loading.tsx`
- [ ] **2.3.3** Создать `src/app/projects/[id]/loading.tsx`
- [ ] **2.3.4** Создать компонент Skeleton для ProjectCard

#### Шаг 2.4: Error boundaries для критичных компонентов

- [ ] **2.4.1** Обернуть ParticleAnimation в ErrorBoundary
- [ ] **2.4.2** Добавить fallback UI для всех динамических импортов

**✅ Результат Дня 2:** Полная обработка ошибок, loading states, 404

---

### День 3: Environment Variables и Security

#### Шаг 3.1: Настройка Environment Variables

- [ ] **3.1.1** Создать `.env.example`

  ```env
  # Site Configuration
  NEXT_PUBLIC_SITE_URL=https://your-domain.com
  NEXT_PUBLIC_SITE_NAME=Andival-Sei Portfolio

  # Contact Information
  NEXT_PUBLIC_EMAIL=your-email@example.com
  NEXT_PUBLIC_GITHUB=https://github.com/yourusername
  NEXT_PUBLIC_TELEGRAM=https://t.me/yourusername
  NEXT_PUBLIC_VK=https://vk.com/yourusername

  # Analytics (Optional)
  NEXT_PUBLIC_GA_ID=
  NEXT_PUBLIC_VERCEL_ANALYTICS=true

  # Monitoring (Optional)
  SENTRY_DSN=
  ```

- [ ] **3.1.2** Создать `.env.local` (добавить в .gitignore)
- [ ] **3.1.3** Обновить `.gitignore` - добавить `.env*.local`

#### Шаг 3.2: Рефакторинг хардкода

- [ ] **3.2.1** Создать `src/lib/env.ts` для типизации env vars

  ```typescript
  export const env = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
    email: process.env.NEXT_PUBLIC_EMAIL!,
    github: process.env.NEXT_PUBLIC_GITHUB!,
    telegram: process.env.NEXT_PUBLIC_TELEGRAM!,
    vk: process.env.NEXT_PUBLIC_VK!,
  } as const;
  ```

- [ ] **3.2.2** Заменить хардкод в `src/components/footer.tsx`
- [ ] **3.2.3** Заменить хардкод в `src/app/contact/page.tsx`
- [ ] **3.2.4** Заменить хардкод в `src/data/about.ts`

#### Шаг 3.3: Security Headers

- [ ] **3.3.1** Обновить `next.config.ts` - добавить security headers
  ```typescript
  const nextConfig: NextConfig = {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            { key: "X-DNS-Prefetch-Control", value: "on" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-XSS-Protection", value: "1; mode=block" },
            { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          ],
        },
      ];
    },
  };
  ```

#### Шаг 3.4: Content Security Policy (опционально)

- [ ] **3.4.1** Добавить CSP headers в `next.config.ts`
- [ ] **3.4.2** Протестировать CSP в dev режиме

**✅ Результат Дня 3:** Environment variables, security headers, нет хардкода

---

### День 4: Next.js конфигурация и README

#### Шаг 4.1: Оптимизация Next.js config

- [ ] **4.1.1** Обновить `next.config.ts` - полная конфигурация

  ```typescript
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    // Оптимизация изображений
    images: {
      formats: ["image/webp", "image/avif"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Компрессия
    compress: true,

    // Experimental features
    experimental: {
      optimizePackageImports: ["lucide-react", "react-icons"],
    },

    // Security headers (из предыдущего шага)
    async headers() {
      /* ... */
    },
  };

  export default nextConfig;
  ```

#### Шаг 4.2: Профессиональный README.md

- [ ] **4.2.1** Переписать `README.md` - добавить:
  - Описание проекта
  - Скриншоты (сделать скриншоты всех страниц)
  - Стек технологий с badge
  - Фичи
  - Инструкция по установке
  - Структура проекта
  - Скрипты и команды
  - Deploy инструкция
  - License

- [ ] **4.2.2** Создать `docs/ARCHITECTURE.md` - описание архитектуры
- [ ] **4.2.3** Создать `CONTRIBUTING.md` (если планируется open source)

#### Шаг 4.3: Скриншоты для README

- [ ] **4.3.1** Сделать скриншоты всех страниц
- [ ] **4.3.2** Сохранить в `public/screenshots/`
- [ ] **4.3.3** Добавить в README.md

#### Шаг 4.4: Финальная проверка

- [ ] **4.4.1** Запустить `pnpm build` - проверить на ошибки
- [ ] **4.4.2** Запустить `pnpm lint` - исправить все warning
- [ ] **4.4.3** Запустить `pnpm test:run` - все тесты зеленые
- [ ] **4.4.4** Проверить TypeScript: `pnpm tsc --noEmit`

**✅ Результат Дня 4:** Полная конфигурация Next.js, профессиональный README

---

## 🎯 ФАЗА 2: ПРОИЗВОДИТЕЛЬНОСТЬ И КАЧЕСТВО

**Срок:** 3-4 дня  
**Цель:** Оптимизировать производительность и улучшить качество

### День 5: Оптимизация изображений

#### Шаг 5.1: Конвертация изображений в WebP

- [ ] **5.1.1** Установить `sharp` для обработки изображений
- [ ] **5.1.2** Конвертировать `public/images/about/myphoto.jpg` в WebP
- [ ] **5.1.3** Создать скрипт для автоматической конвертации (опционально)

#### Шаг 5.2: Оптимизация Image компонентов

- [ ] **5.2.1** Добавить `priority` для above-the-fold изображений
  - Hero изображения
  - Фото профиля на /about
- [ ] **5.2.2** Добавить `placeholder="blur"` для всех статичных изображений
- [ ] **5.2.3** Оптимизировать `sizes` prop для адаптивности

#### Шаг 5.3: Lazy loading для тяжелых компонентов

- [ ] **5.3.1** Создать `src/components/lab/particle-animation.lazy.tsx`

  ```typescript
  import dynamic from 'next/dynamic';

  export const ParticleAnimationLazy = dynamic(
    () => import('./particle-animation'),
    {
      ssr: false,
      loading: () => <div className="animate-pulse bg-muted" />
    }
  );
  ```

- [ ] **5.3.2** Использовать в `/lab` странице

#### Шаг 5.4: Prefetching для критичных роутов

- [ ] **5.4.1** Добавить `prefetch={true}` для главных Link в Header
- [ ] **5.4.2** Настроить prefetch стратегию для проектов

**✅ Результат Дня 5:** Оптимизированные изображения, lazy loading

---

### День 6: Performance аудит и оптимизация

#### Шаг 6.1: Bundle Size анализ

- [ ] **6.1.1** Установить `@next/bundle-analyzer`
  ```bash
  pnpm add @next/bundle-analyzer -D
  ```
- [ ] **6.1.2** Добавить в `next.config.ts`

  ```typescript
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });

  module.exports = withBundleAnalyzer(nextConfig);
  ```

- [ ] **6.1.3** Запустить анализ: `ANALYZE=true pnpm build`
- [ ] **6.1.4** Оптимизировать большие бандлы

#### Шаг 6.2: Lighthouse аудит

- [ ] **6.2.1** Запустить Lighthouse для главной страницы
- [ ] **6.2.2** Запустить Lighthouse для /projects
- [ ] **6.2.3** Запустить Lighthouse для /about
- [ ] **6.2.4** Исправить проблемы (цель: 90+ по всем метрикам)

#### Шаг 6.3: Core Web Vitals оптимизация

- [ ] **6.3.1** Оптимизировать LCP (Largest Contentful Paint)
  - Preload критичных шрифтов
  - Оптимизировать hero изображения
- [ ] **6.3.2** Оптимизировать CLS (Cumulative Layout Shift)
  - Фиксированные размеры для изображений
  - Skeleton loaders
- [ ] **6.3.3** Оптимизировать FID/INP (First Input Delay / Interaction to Next Paint)
  - Оптимизировать JS

#### Шаг 6.4: Fonts оптимизация

- [ ] **6.4.1** Использовать `next/font` для Geist шрифтов (уже есть)
- [ ] **6.4.2** Добавить `font-display: swap` если нужно
- [ ] **6.4.3** Preload критичных шрифтов в layout

**✅ Результат Дня 6:** 90+ по Lighthouse, оптимизированные Core Web Vitals

---

### День 7: CI/CD и автоматизация

#### Шаг 7.1: GitHub Actions - Basic CI

- [ ] **7.1.1** Создать `.github/workflows/ci.yml`

  ```yaml
  name: CI

  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main]

  jobs:
    test:
      runs-on: ubuntu-latest

      steps:
        - uses: actions/checkout@v4

        - uses: pnpm/action-setup@v3
          with:
            version: 8

        - uses: actions/setup-node@v4
          with:
            node-version: "20"
            cache: "pnpm"

        - name: Install dependencies
          run: pnpm install

        - name: Run linter
          run: pnpm lint

        - name: Run type check
          run: pnpm tsc --noEmit

        - name: Run tests
          run: pnpm test:run

        - name: Build project
          run: pnpm build
  ```

#### Шаг 7.2: Pre-commit hooks с Husky

- [ ] **7.2.1** Установить Husky
  ```bash
  pnpm add husky lint-staged -D
  pnpm exec husky init
  ```
- [ ] **7.2.2** Создать `.husky/pre-commit`
  ```bash
  pnpm lint-staged
  ```
- [ ] **7.2.3** Добавить в `package.json`:
  ```json
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
  ```

#### Шаг 7.3: Commitlint

- [ ] **7.3.1** Установить commitlint
  ```bash
  pnpm add @commitlint/cli @commitlint/config-conventional -D
  ```
- [ ] **7.3.2** Создать `.commitlintrc.json`
- [ ] **7.3.3** Создать `.husky/commit-msg`
- [ ] **7.3.4** Обновить `docs/commit_guidelines.md` с новыми правилами

#### Шаг 7.4: Dependabot для обновлений

- [ ] **7.4.1** Создать `.github/dependabot.yml`
  ```yaml
  version: 2
  updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule:
        interval: "weekly"
      open-pull-requests-limit: 10
  ```

**✅ Результат Дня 7:** Полный CI/CD pipeline, автоматические проверки

---

### День 8: Accessibility и финальные тесты

#### Шаг 8.1: A11Y аудит с axe DevTools

- [ ] **8.1.1** Установить axe DevTools extension
- [ ] **8.1.2** Проверить главную страницу
- [ ] **8.1.3** Проверить страницу проектов
- [ ] **8.1.4** Проверить страницу "Обо мне"
- [ ] **8.1.5** Исправить все найденные проблемы

#### Шаг 8.2: Клавиатурная навигация

- [ ] **8.2.1** Проверить tab navigation на всех страницах
- [ ] **8.2.2** Добавить visible focus indicators где нужно
- [ ] **8.2.3** Проверить модальные окна (Sheet)
- [ ] **8.2.4** Добавить skip-to-content ссылку

#### Шаг 8.3: Screen Reader тестирование

- [ ] **8.3.1** Протестировать с NVDA (Windows)
- [ ] **8.3.2** Проверить ARIA labels на всех интерактивных элементах
- [ ] **8.3.3** Проверить alt текст для изображений
- [ ] **8.3.4** Проверить семантическую структуру HTML

#### Шаг 8.4: Контраст и цвета

- [ ] **8.4.1** Проверить контраст с WebAIM Contrast Checker
- [ ] **8.4.2** Исправить проблемы с контрастом (WCAG AA стандарт)
- [ ] **8.4.3** Проверить цвета в темной теме
- [ ] **8.4.4** Добавить reduced-motion для анимаций

#### Шаг 8.5: Финальное тестирование

- [ ] **8.5.1** Тестирование на разных браузерах (Chrome, Firefox, Safari)
- [ ] **8.5.2** Тестирование на мобильных устройствах
- [ ] **8.5.3** Проверка на разных разрешениях
- [ ] **8.5.4** Regression тесты - все фичи работают

**✅ Результат Дня 8:** WCAG AA compliance, полная accessibility

---

## 🎯 ФАЗА 3: РАСШИРЕНИЕ ФУНКЦИОНАЛЬНОСТИ

**Срок:** 4-5 дней  
**Цель:** Добавить аналитику, мониторинг и новые фичи

### День 9: Аналитика и мониторинг

#### Шаг 9.1: Vercel Analytics

- [ ] **9.1.1** Включить Vercel Analytics в проекте
- [ ] **9.1.2** Добавить `<Analytics />` в layout
- [ ] **9.1.3** Настроить Web Vitals tracking

#### Шаг 9.2: Google Analytics (опционально)

- [ ] **9.2.1** Создать GA4 property
- [ ] **9.2.2** Добавить GA ID в `.env`
- [ ] **9.2.3** Создать `src/components/analytics.tsx`
- [ ] **9.2.4** Добавить в layout

#### Шаг 9.3: Event tracking

- [ ] **9.3.1** Создать `src/lib/analytics.ts` для tracking events
  ```typescript
  export const trackEvent = (name: string, properties?: object) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", name, properties);
    }
  };
  ```
- [ ] **9.3.2** Добавить tracking для важных действий:
  - Клик на "Связаться"
  - Клик на email
  - Просмотр проекта
  - Переход по социальным сетям

#### Шаг 9.4: Sentry для мониторинга ошибок

- [ ] **9.4.1** Установить `@sentry/nextjs`
- [ ] **9.4.2** Настроить `sentry.client.config.ts`
- [ ] **9.4.3** Настроить `sentry.server.config.ts`
- [ ] **9.4.4** Добавить SENTRY_DSN в `.env`
- [ ] **9.4.5** Протестировать отправку ошибок

**✅ Результат Дня 9:** Полная аналитика и мониторинг ошибок

---

### День 10-11: Форма обратной связи

#### Шаг 10.1: Backend для формы

- [ ] **10.1.1** Выбрать email сервис (Resend/SendGrid/Nodemailer)
- [ ] **10.1.2** Создать `src/app/api/contact/route.ts`

  ```typescript
  import { NextResponse } from "next/server";
  import { z } from "zod";

  const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
  });

  export async function POST(request: Request) {
    // Валидация и отправка email
  }
  ```

#### Шаг 10.2: Rate limiting

- [ ] **10.2.1** Установить `@upstash/ratelimit` или аналог
- [ ] **10.2.2** Добавить rate limiting в API route
- [ ] **10.2.3** Добавить Redis/KV для хранения (Vercel KV)

#### Шаг 10.3: Frontend формы

- [ ] **10.3.1** Установить `react-hook-form` и `zod`
- [ ] **10.3.2** Создать `src/components/contact-form.tsx`
- [ ] **10.3.3** Добавить валидацию на клиенте
- [ ] **10.3.4** Добавить состояния (loading, success, error)

#### Шаг 10.4: reCAPTCHA

- [ ] **10.4.1** Настроить Google reCAPTCHA v3
- [ ] **10.4.2** Добавить в форму
- [ ] **10.4.3** Проверять на сервере

#### Шаг 10.5: Обновить страницу /contact

- [ ] **10.5.1** Заменить простые ссылки на форму
- [ ] **10.5.2** Оставить email как запасной вариант
- [ ] **10.5.3** Добавить тесты для формы

**✅ Результат Дня 10-11:** Рабочая форма обратной связи с защитой

---

### День 12: UX улучшения

#### Шаг 12.1: Page transitions

- [ ] **12.1.1** Установить `framer-motion`
- [ ] **12.1.2** Создать `src/components/page-transition.tsx`
- [ ] **12.1.3** Добавить плавные переходы между страницами
- [ ] **12.1.4** Оптимизировать для производительности

#### Шаг 12.2: Scroll enhancements

- [ ] **12.2.1** Создать компонент BackToTop
- [ ] **12.2.2** Добавить scroll progress indicator
- [ ] **12.2.3** Smooth scroll для якорных ссылок

#### Шаг 12.3: Улучшенные анимации

- [ ] **12.3.1** Рефакторинг анимаций на Framer Motion
- [ ] **12.3.2** Добавить `prefers-reduced-motion` проверку
- [ ] **12.3.3** Оптимизировать производительность анимаций

#### Шаг 12.4: Micro-interactions

- [ ] **12.4.1** Добавить ripple effect для кнопок
- [ ] **12.4.2** Улучшить hover states
- [ ] **12.4.3** Добавить success feedback для действий
- [ ] **12.4.4** Улучшить loading states

**✅ Результат Дня 12:** Улучшенный UX с плавными переходами

---

### День 13: Финальная полировка

#### Шаг 13.1: Content review

- [ ] **13.1.1** Проверить все тексты на грамматику
- [ ] **13.1.2** Улучшить формулировки где нужно
- [ ] **13.1.3** Добавить CTA на каждую страницу
- [ ] **13.1.4** Проверить consistency стиля текстов

#### Шаг 13.2: Visual polish

- [ ] **13.2.1** Проверить spacing и alignment
- [ ] **13.2.2** Проверить consistency цветов
- [ ] **13.2.3** Проверить responsive на всех брейкпоинтах
- [ ] **13.2.4** Финальный design review

#### Шаг 13.3: Performance final check

- [ ] **13.3.1** Lighthouse audit на prod build
- [ ] **13.3.2** Проверить bundle size
- [ ] **13.3.3** Проверить Core Web Vitals
- [ ] **13.3.4** Оптимизировать если нужно

#### Шаг 13.4: Pre-launch checklist

- [ ] **13.4.1** Все environment variables настроены
- [ ] **13.4.2** Analytics работает
- [ ] **13.4.3** SEO полностью настроено
- [ ] **13.4.4** Форма обратной связи работает
- [ ] **13.4.5** Все ссылки рабочие
- [ ] **13.4.6** Проверено на разных устройствах

**✅ Результат Дня 13:** Проект готов к production deploy

---

## 🚀 ДЕПЛОЙ И ЗАПУСК

### Vercel Deploy

- [ ] **D.1** Подключить репозиторий к Vercel
- [ ] **D.2** Настроить environment variables в Vercel
- [ ] **D.3** Настроить custom domain
- [ ] **D.4** Deploy to production
- [ ] **D.5** Проверить работу на production
- [ ] **D.6** Настроить preview deploys для PR

### Post-launch

- [ ] **P.1** Мониторинг первую неделю
- [ ] **P.2** Собрать feedback
- [ ] **P.3** Исправить критичные баги
- [ ] **P.4** Планировать следующие фичи

---

## 🎯 ФАЗА 4: РАСШИРЕННЫЕ ФИЧИ (ОПЦИОНАЛЬНО)

**Срок:** 2-3 недели  
**Цель:** Сделать портфолио выдающимся

### Неделя 3: Блог

#### Шаг B.1: Настройка MDX

- [ ] **B.1.1** Установить `@next/mdx` и зависимости
- [ ] **B.1.2** Настроить `next.config.ts` для MDX
- [ ] **B.1.3** Создать структуру для блог постов

#### Шаг B.2: Layout для блога

- [ ] **B.2.1** Создать `src/app/blog/page.tsx` - список постов
- [ ] **B.2.2** Создать `src/app/blog/[slug]/page.tsx` - страница поста
- [ ] **B.2.3** Создать компоненты для MDX (Code, Callout, etc.)

#### Шаг B.3: Функциональность блога

- [ ] **B.3.1** Syntax highlighting (rehype-highlight / shiki)
- [ ] **B.3.2** Table of Contents
- [ ] **B.3.3** Reading time
- [ ] **B.3.4** Tags и категории
- [ ] **B.3.5** Search по постам

#### Шаг B.4: Первые посты

- [ ] **B.4.1** Написать 3-5 технических постов
- [ ] **B.4.2** Добавить изображения
- [ ] **B.4.3** Настроить SEO для постов
- [ ] **B.4.4** RSS feed

**✅ Результат: Полноценный блог с MDX**

---

### Неделя 4: GitHub Integration

#### Шаг G.1: GitHub API setup

- [ ] **G.1.1** Создать GitHub Personal Access Token
- [ ] **G.1.2** Создать `src/app/api/github/route.ts`
- [ ] **G.1.3** Настроить rate limiting и кэширование

#### Шаг G.2: Автоматическое обновление проектов

- [ ] **G.2.1** Фетчить репозитории из GitHub
- [ ] **G.2.2** Маппинг GitHub data -> Project interface
- [ ] **G.2.3** Кэширование с revalidation
- [ ] **G.2.4** Fallback на статичные данные

#### Шаг G.3: GitHub статистика

- [ ] **G.3.1** Показывать stars, forks
- [ ] **G.3.2** Показывать last commit date
- [ ] **G.3.3** Показывать основной язык
- [ ] **G.3.4** Показывать contributors

#### Шаг G.4: GitHub activity

- [ ] **G.4.1** Создать `/activity` страницу (опционально)
- [ ] **G.4.2** Показывать недавние commits
- [ ] **G.4.3** Contribution calendar
- [ ] **G.4.4** Языковая статистика

**✅ Результат: Интеграция с GitHub, live данные**

---

### Неделя 5: Advanced Features

#### Шаг A.1: Multi-language (i18n)

- [ ] **A.1.1** Установить `next-intl`
- [ ] **A.1.2** Настроить русский/английский
- [ ] **A.1.3** Перевести все тексты
- [ ] **A.1.4** Language switcher в Header

#### Шаг A.2: Dark mode improvements

- [ ] **A.2.1** Добавить больше тем (не только dark/light)
- [ ] **A.2.2** Кастомные цветовые схемы
- [ ] **A.2.3** Theme preview
- [ ] **A.2.4** Сохранение в cookies для SSR

#### Шаг A.3: Advanced analytics

- [ ] **A.3.1** Dashboard для метрик
- [ ] **A.3.2** Heatmap (Hotjar интеграция)
- [ ] **A.3.3** Conversion tracking
- [ ] **A.3.4** A/B testing setup

#### Шаг A.4: PWA

- [ ] **A.4.1** Настроить `next-pwa`
- [ ] **A.4.2** Service Worker
- [ ] **A.4.3** Offline support
- [ ] **A.4.4** Install prompt

**✅ Результат: Продвинутые фичи, PWA, i18n**

---

## 📊 МЕТРИКИ УСПЕХА

### После Фазы 1 (Production Ready)

- ✅ Lighthouse Score: 90+ (все метрики)
- ✅ SEO Score: 95+
- ✅ Accessibility Score: 95+
- ✅ 0 критических ошибок в production
- ✅ Покрытие тестами: 60%+

### После Фазы 2 (Optimized)

- ✅ Bundle size < 200kb (gzipped)
- ✅ TTI (Time to Interactive) < 3s
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ CI/CD настроен и работает

### После Фазы 3 (Enhanced)

- ✅ Форма обратной связи работает
- ✅ Аналитика собирает данные
- ✅ Мониторинг ошибок активен
- ✅ UX полированный

### После Фазы 4 (Advanced)

- ✅ Блог с 5+ постами
- ✅ GitHub интеграция активна
- ✅ Multi-language support
- ✅ PWA готов

---

## 🔄 ПРОЦЕСС РАБОТЫ

### Git Workflow

1. **Создать feature ветку** для каждой фазы/дня

   ```bash
   git checkout -b feature/phase-1-seo
   ```

2. **Коммиты по шагам** с понятными сообщениями

   ```bash
   git commit -m "feat: добавить базовые метаданные для SEO"
   ```

3. **После завершения фазы**
   ```bash
   git checkout main
   git merge feature/phase-1-seo
   git push origin main
   ```

### Quality Checks (перед каждым merge)

```bash
pnpm format          # Форматирование
pnpm lint           # Линтинг
pnpm test:run       # Тесты
pnpm build          # Проверка сборки
```

### Daily Review

- [ ] Код-ревью собственного кода
- [ ] Обновление этого документа (прогресс)
- [ ] Проверка не сломано ли что-то

---

## 📝 ЗАМЕТКИ

### Приоритеты

1. **MUST HAVE:** Фаза 1 - критично для запуска
2. **SHOULD HAVE:** Фаза 2 - важно для качества
3. **NICE TO HAVE:** Фаза 3 - улучшает UX
4. **ADVANCED:** Фаза 4 - можно добавить позже

### Тайминг

- **MVP to Production:** Фаза 1-2 (1 неделя)
- **Production to Enhanced:** Фаза 3 (~1 неделя)
- **Enhanced to Advanced:** Фаза 4 (2-3 недели)

### Гибкость

- Можно менять приоритеты внутри фаз
- Некоторые шаги можно пропустить
- Фаза 4 полностью опциональна

---

## ✅ КОНТРОЛЬНЫЕ ТОЧКИ

### Checkpoint 1: После Фазы 1

- [ ] Все критические исправления сделаны
- [ ] Проект готов к деплою
- [ ] README профессиональный
- [ ] CI/CD работает

### Checkpoint 2: После Фазы 2

- [ ] Lighthouse 90+
- [ ] Accessibility WCAG AA
- [ ] Performance оптимизирована
- [ ] Bundle size оптимален

### Checkpoint 3: После Фазы 3

- [ ] Форма работает
- [ ] Аналитика собирает данные
- [ ] UX на высоте
- [ ] Готов к продвижению

### Checkpoint 4: После Фазы 4 (опционально)

- [ ] Блог запущен
- [ ] GitHub интеграция работает
- [ ] i18n настроен
- [ ] PWA работает

---

## 🎯 ФИНАЛЬНАЯ ЦЕЛЬ

**Создать выдающееся портфолио**, которое:

- ⚡ Быстро загружается (< 3s TTI)
- 🎨 Красиво выглядит (современный дизайн)
- ♿ Доступно всем (WCAG AA)
- 🔍 Хорошо индексируется (SEO оптимизация)
- 📱 Работает везде (responsive + PWA)
- 🚀 Легко поддерживать (чистый код, тесты, CI/CD)
- 💡 Показывает ваши навыки (качество = резюме)

---

**Удачи в реализации! 🚀**

_Последнее обновление: 14.10.2025_

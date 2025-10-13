# План тестирования портфолио Andival-Sei

> **Последнее обновление:** 13.10.2025  
> **Текущий этап:** Этап 3.1 завершен - Hero секция 100% ✅  
> **Покрытие кода:** 40.26% (было 38.58%) → Цель: 80%+

---

## 📊 Текущий статус покрытия

```
Всего тестов: 428 | Файлов с тестами: 14 | Покрытие: 40.26%
```

### ✅ Полностью покрыто (100%)

- **Layout:** Footer, Header, ThemeToggle
- **UI:** Badge, Button, Checkbox, Input, Popover (базовые), Select (базовые), Sheet, Toggle, ToggleGroup
- **Компоненты проектов:** ProjectCard, ProjectsFilters
- **Секции:** Hero
- **Lib:** utils.ts

### ⏳ Не покрыто (0%)

- **Страницы:** 7 файлов (app/\*)
- **Компоненты:** ParticleAnimation
- **Секции:** TechStack, FeaturedProjects
- **Данные:** projects.ts, technologies.tsx, about.ts

### 📝 Примечание

**Select и Popover:** Базовые unit-тесты готовы (рендеринг, props, accessibility). Полное тестирование взаимодействий с Radix UI Portal (открытие/закрытие, клики, навигация) будет реализовано в E2E тестах (Этап 7).

---

## 🔄 Git Workflow и процесс разработки

### Стратегия работы с ветками

Для каждого **ЭТАПА** создаётся отдельная feature-ветка:

```bash
# Структура веток
main
  ├── feature/tests-project-components  # Этап 2.2
  ├── feature/tests-sections            # Этап 3
  ├── feature/tests-lab                 # Этап 4
  ├── feature/tests-pages               # Этап 5
  ├── feature/tests-data                # Этап 6
  └── feature/e2e-setup                 # Этап 7
```

### Workflow для каждого этапа

```bash
# 1. Создать ветку для этапа
git checkout -b feature/tests-[название-этапа]

# 2. Работать над тестами, делая коммиты по мере выполнения
# После завершения реализации и проверки тестов/build:
git add src/components/__tests__/component.test.tsx docs/TESTING.md
git commit -m "test: add Component tests"

# Примечание: Тесты и обновление TESTING.md коммитятся ВМЕСТЕ
# Это логически связанные изменения, нет смысла разделять их

# 3. Перед мерджем - ОБЯЗАТЕЛЬНЫЕ ПРОВЕРКИ
pnpm format          # Форматирование кода ✅
pnpm test:run        # Все тесты должны пройти ✅
pnpm build           # Build должен пройти без ошибок ✅

# 5. Если проверки прошли - мержить в main
git checkout main
git merge feature/tests-[название-этапа]
git push origin main

# 6. Удалить ветку после успешного merge
git branch -d feature/tests-[название-этапа]
```

### ⚠️ Чеклист перед мерджем

**ОБЯЗАТЕЛЬНО проверить перед каждым merge в main:**

- [ ] `pnpm format` - код отформатирован
- [ ] `pnpm test:run` - все тесты проходят (зелёные ✅)
- [ ] `pnpm build` - сборка проходит без ошибок
- [ ] `pnpm test:coverage` - покрытие увеличилось
- [ ] `docs/TESTING.md` обновлен и закоммичен вместе с тестами
- [ ] Нет console errors в тестах
- [ ] Нет TypeScript ошибок

### Naming convention для веток

```bash
# Этапы тестирования
feature/tests-project-components
feature/tests-sections
feature/tests-lab
feature/tests-pages
feature/tests-data

# E2E тесты
feature/e2e-setup
e2e/navigation
e2e/projects-flow

# Исправления
fix/test-[описание]
```

### Commit messages

Следуйте конвенции из `.cursor/rules/commit-messages.mdc`:

**⚠️ ВАЖНО: Все commit messages должны быть на РУССКОМ языке (кроме type prefix)!**

```bash
# ✅ Правильно (описание на русском)
test: добавить тесты для компонента ProjectCard
test: добавить тесты рендеринга секции Hero
test(ui): улучшить тесты доступности Button
fix(test): исправить snapshot для ProjectCard
docs: обновить TESTING.md с прогрессом этапа

# ❌ Неправильно (описание на английском)
test: add ProjectCard component tests
docs: update TESTING.md with stage progress
```

---

## 📋 Этап 1: UI компоненты shadcn/ui

### 1.1 Базовые UI компоненты (✅ Готово)

#### Badge (`src/components/ui/badge.tsx`)

- [x] Рендеринг с текстом
- [x] Различные варианты (default, secondary, outline, destructive)
- [x] Применение кастомных className
- [x] Snapshot тест

**Файл:** `src/components/ui/__tests__/badge.test.tsx` (23 теста) ✅

---

#### Input (`src/components/ui/input.tsx`)

- [x] Рендеринг компонента
- [x] Различные типы (text, email, password, number)
- [x] Placeholder
- [x] Состояние disabled
- [x] Value и onChange
- [x] Accessibility (labels, aria-\*)
- [x] Кастомные className
- [x] Ref forwarding

**Файл:** `src/components/ui/__tests__/input.test.tsx` (42 теста) ✅

---

#### Checkbox (`src/components/ui/checkbox.tsx`)

- [x] Рендеринг компонента
- [x] Checked/unchecked/indeterminate состояния
- [x] onChange события (onCheckedChange)
- [x] Disabled состояние
- [x] Accessibility (role, aria-\*)
- [x] Контролируемый и неконтролируемый режимы
- [x] Snapshot тесты

**Файл:** `src/components/ui/__tests__/checkbox.test.tsx` (37 тестов) ✅

---

#### Toggle & ToggleGroup (`src/components/ui/toggle.tsx`, `toggle-group.tsx`)

- [x] Рендеринг компонента Toggle
- [x] Переключение состояния (pressed/not pressed)
- [x] Различные размеры (sm, default, lg)
- [x] Различные варианты (default, outline)
- [x] Disabled состояние
- [x] Accessibility (aria-pressed, aria-label)
- [x] ToggleGroup - single режим
- [x] ToggleGroup - multiple режим
- [x] ToggleGroup - контролируемый режим

**Файл:** `src/components/ui/__tests__/toggle.test.tsx` (36 тестов) ✅

---

#### Sheet (`src/components/ui/sheet.tsx`)

- [x] Рендеринг компонента
- [x] Открытие/закрытие
- [x] Различные стороны (left, right, top, bottom)
- [x] Overlay и закрытие по клику
- [x] Accessibility (role='dialog', aria-\*)
- [x] Подкомпоненты (Header, Title, Footer, Close)
- [x] Контролируемый режим через props

**Файл:** `src/components/ui/__tests__/sheet.test.tsx` (23 теста) ✅

---

### 1.2 UI компоненты без тестов (✅ Завершено)

#### Button (`src/components/ui/button.tsx`)

- [x] Рендеринг с различными вариантами (default, destructive, outline, secondary, ghost, link)
- [x] Различные размеры (sm, default, lg, icon, icon-sm, icon-lg)
- [x] Состояние disabled
- [x] AsChild prop для композиции с Slot
- [x] Клик события
- [x] Accessibility (role, aria-\*)
- [x] Snapshot тесты для всех вариантов

**Файл:** `src/components/ui/__tests__/button.test.tsx` ✅  
**Приоритет:** Высокий  
**Статус:** 59 тестов, 100% покрытие

---

#### Popover (`src/components/ui/popover.tsx`)

- [x] Рендеринг компонента (базовые проверки)
- [x] Props и состояния (open, onOpenChange)
- [x] Позиционирование (align, side, sideOffset)
- [x] Accessibility (role, aria-\*)
- [x] PopoverAnchor
- [x] Кастомные className и props
- [ ] Открытие/закрытие по клику (→ E2E тесты)
- [ ] Закрытие по ESC (→ E2E тесты)
- [ ] Закрытие по клику вне компонента (→ E2E тесты)

**Файл:** `src/components/ui/__tests__/popover.test.tsx` ✅  
**Приоритет:** Низкий (не используется в проекте)  
**Статус:** 26 unit-тестов (базовый рендеринг и props)  
**Примечание:** Полное тестирование взаимодействий с порталом будет в E2E

---

#### Select (`src/components/ui/select.tsx`)

- [x] Рендеринг компонента (Trigger, Value, иконка)
- [x] Props и состояния (value, onValueChange)
- [x] Disabled состояние
- [x] Размеры SelectTrigger (default, sm)
- [x] Accessibility (role, aria-\*)
- [x] Базовые стили и классы
- [x] Подкомпоненты структуры (Content, Item, Group, Label, Separator)
- [x] Клавиатурная навигация (focus, tab)
- [ ] Открытие/закрытие dropdown (→ E2E тесты)
- [ ] Выбор опции через клик (→ E2E тесты)
- [ ] Навигация стрелками по опциям (→ E2E тесты)

**Файл:** `src/components/ui/__tests__/select.test.tsx` ✅  
**Приоритет:** Средний (используется в ProjectsFilters)  
**Статус:** 28 unit-тестов (базовый рендеринг и props)  
**Примечание:** Полное тестирование взаимодействий с порталом будет в E2E

---

## 🧩 Этап 2: Layout и основные компоненты

### 2.1 Layout компоненты (✅ Готово)

#### Header (`src/components/header.tsx`)

- [x] Рендеринг компонента
- [x] Логотип и ссылка на главную
- [x] Desktop навигация (Проекты, Обо мне, Lab)
- [x] Кнопка "Связаться"
- [x] Скролл эффекты (backdrop-blur, shadow)
- [x] Мобильное меню (Sheet)
- [x] Адаптивный дизайн
- [x] Accessibility

**Файл:** `src/components/__tests__/header.test.tsx` (23 теста) ✅

---

#### Footer (`src/components/footer.tsx`)

- [x] Рендеринг компонента
- [x] Копирайт с актуальным годом
- [x] Социальные сети (GitHub, Telegram, VK)
- [x] Правильные URL ссылок
- [x] Атрибуты безопасности (target="\_blank", rel="noopener noreferrer")
- [x] Accessibility (aria-labels)
- [x] ThemeToggle компонент
- [x] Адаптивный дизайн

**Файл:** `src/components/__tests__/footer.test.tsx` (13 тестов) ✅

---

#### ThemeToggle (`src/components/theme-toggle.tsx`)

- [x] Рендеринг компонента
- [x] Три кнопки (Light, System, Dark)
- [x] Aria-labels для accessibility
- [x] Иконки (Sun, Monitor, Moon)
- [x] Переключение темы (setTheme)
- [x] SSR-safe (не рендерится до mounted)

**Файл:** `src/components/__tests__/theme-toggle.test.tsx` (12 тестов) ✅

---

### 2.2 Компоненты проектов (✅ Готово)

#### ProjectCard (`src/components/project-card.tsx`)

- [x] Рендеринг компонента (grid и featured варианты)
- [x] Отображение названия и краткого описания
- [x] Медиа превью (video/image с fallback)
- [x] Теги технологий (Badge компоненты)
- [x] Тип проекта (work/educational/pet)
- [x] Ссылка на детальную страницу (/projects/[id])
- [x] Hover эффекты (масштабирование, overlay)
- [x] Стили и классы
- [x] Accessibility (aria-labels, alt текст)

**Файл:** `src/components/__tests__/project-card.test.tsx` ✅  
**Текущее покрытие:** 100% (36 тестов)  
**Приоритет:** Высокий

---

#### ProjectsFilters (`src/components/projects-filters.tsx`)

- [x] Рендеринг компонента
- [x] Поиск по названию (Input с onChange)
- [x] Debounce для поиска
- [x] Фильтр по технологиям (Popover с Checkbox группой)
- [x] Фильтр по типу проекта (Select)
- [x] Сортировка по дате (Select: новые/старые)
- [x] Callback функции вызываются с правильными параметрами
- [x] Адаптивный дизайн (мобильная версия)
- [x] Accessibility

**Файл:** `src/components/__tests__/projects-filters.test.tsx` ✅  
**Текущее покрытие:** 100% (45 тестов)  
**Приоритет:** Высокий

---

## 🎨 Этап 3: Секции главной страницы

### 3.1 Hero секция

#### Hero (`src/components/sections/hero.tsx`)

- [x] Рендеринг компонента
- [x] Заголовок "Andival-Sei" отображается
- [x] Подзаголовок "Frontend-разработчик"
- [x] Краткое описание (2 абзаца)
- [x] CTA кнопка "Посмотреть проекты" с ссылкой на /projects
- [x] CTA кнопка "Отправить Email" с mailto: ссылкой
- [x] Правильные aria-labels
- [x] Адаптивный дизайн (колонки на desktop)

**Файл:** `src/components/sections/__tests__/hero.test.tsx` ✅  
**Текущее покрытие:** 100% (25 тестов)  
**Приоритет:** Средний

---

### 3.2 Стек технологий

#### TechStack (`src/components/sections/tech-stack.tsx`)

- [ ] Рендеринг компонента
- [ ] Заголовок "Технологии и инструменты"
- [ ] Отображение всех технологий из `technologies.tsx`
- [ ] Каждая технология имеет иконку
- [ ] Каждая технология имеет название
- [ ] Grid layout с правильными классами
- [ ] Смещенные ряды (offset для четных рядов)
- [ ] Hover эффекты (glow, scale)
- [ ] Адаптивный дизайн (1-2-3-4 колонки)

**Файл:** `src/components/sections/__tests__/tech-stack.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Средний

---

### 3.3 Избранные проекты

#### FeaturedProjects (`src/components/sections/featured-projects.tsx`)

- [ ] Рендеринг компонента
- [ ] Заголовок "Избранные проекты"
- [ ] Отображение ровно 3 избранных проектов
- [ ] Карусель с индикаторами (точки)
- [ ] Навигация стрелками (prev/next)
- [ ] Автоматическая прокрутка каждые 5 секунд
- [ ] Пауза автопрокрутки при hover
- [ ] Клик по индикатору переключает слайд
- [ ] Ссылка "Посмотреть все проекты" → /projects
- [ ] Адаптивный дизайн
- [ ] Cleanup таймера при unmount

**Файл:** `src/components/sections/__tests__/featured-projects.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Средний

---

## 🧪 Этап 4: Lab компоненты

### 4.1 Анимация частиц

#### ParticleAnimation (`src/components/lab/particle-animation.tsx`)

- [ ] Рендеринг компонента
- [ ] Canvas элемент создается
- [ ] Canvas имеет правильные размеры (window size)
- [ ] Создается 100 частиц при инициализации
- [ ] Частицы имеют случайные позиции
- [ ] Частицы имеют случайные скорости
- [ ] Анимация запускается (requestAnimationFrame)
- [ ] Поддержка светлой темы (цвет частиц)
- [ ] Поддержка темной темы (цвет частиц)
- [ ] Cleanup при unmount (cancelAnimationFrame)
- [ ] Resize observer обновляет размеры canvas

**Файл:** `src/components/lab/__tests__/particle-animation.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Низкий (сложная анимация)

---

## 📄 Этап 5: Страницы приложения

### 5.1 Главная страница

#### Home page (`src/app/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Hero секция присутствует
- [ ] TechStack секция присутствует
- [ ] FeaturedProjects секция присутствует
- [ ] Секции в правильном порядке
- [ ] Адаптивный layout

**Файл:** `src/app/__tests__/page.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Высокий

---

### 5.2 Страница проектов

#### Projects page (`src/app/projects/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Заголовок "Проекты" отображается
- [ ] ProjectsFilters компонент присутствует
- [ ] Отображаются все проекты по умолчанию
- [ ] Grid layout адаптивный (1-2-3 колонки)
- [ ] Фильтры работают (фильтрация проектов)
- [ ] Поиск работает (поиск по названию)
- [ ] Сортировка работает (по дате)
- [ ] Сообщение "Проекты не найдены" при пустом результате
- [ ] Каждый проект это ProjectCard
- [ ] SEO: H1 заголовок присутствует

**Файл:** `src/app/projects/__tests__/page.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Высокий

---

### 5.3 Детальная страница проекта

#### Project Detail page (`src/app/projects/[id]/page.tsx`)

- [ ] Рендеринг страницы с существующим проектом
- [ ] Заголовок проекта (H1)
- [ ] Описание проекта (параграфы)
- [ ] Медиа работает (video с autoplay/loop или image)
- [ ] Технологии отображаются (Badge)
- [ ] GitHub ссылка работает (если есть)
- [ ] Live Demo ссылка работает (если есть)
- [ ] Кнопка "Назад к проектам" → /projects
- [ ] Redirect на 404 для несуществующего проекта
- [ ] Адаптивный дизайн
- [ ] SEO: Dynamic metadata

**Файл:** `src/app/projects/[id]/__tests__/page.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Средний

---

#### Not Found page (`src/app/projects/[id]/not-found.tsx`)

- [ ] Рендеринг страницы
- [ ] Заголовок "404 - Проект не найден"
- [ ] Описание с объяснением
- [ ] Ссылка "Вернуться к проектам" → /projects
- [ ] Адаптивный дизайн

**Файл:** `src/app/projects/[id]/__tests__/not-found.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Низкий

---

### 5.4 Страница "Обо мне"

#### About page (`src/app/about/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Заголовок "Обо мне" (H1)
- [ ] Фото профиля отображается (Image)
- [ ] Секция "О себе" с текстом
- [ ] Секция "Образование и опыт" (timeline)
- [ ] Timeline содержит записи (минимум 3)
- [ ] Каждая запись timeline имеет дату, заголовок, описание
- [ ] Секция "Интересы"
- [ ] Интересы отображаются (grid или список)
- [ ] Адаптивный дизайн (мобильная версия)
- [ ] SEO: Metadata

**Файл:** `src/app/about/__tests__/page.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Средний

---

### 5.5 Страница контактов

#### Contact page (`src/app/contact/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Заголовок "Свяжитесь со мной" (H1)
- [ ] Подзаголовок с описанием
- [ ] Email ссылка (mailto:)
- [ ] GitHub ссылка (внешняя, target="\_blank")
- [ ] Telegram ссылка (внешняя)
- [ ] VK ссылка (внешняя)
- [ ] Все внешние ссылки имеют rel="noopener noreferrer"
- [ ] Иконки социальных сетей
- [ ] Адаптивный дизайн
- [ ] SEO: Metadata

**Файл:** `src/app/contact/__tests__/page.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Средний

---

### 5.6 Страница Lab

#### Lab page (`src/app/lab/page.tsx`)

- [ ] Рендеринг страницы
- [ ] ParticleAnimation компонент присутствует
- [ ] Текст "Скоро здесь что-то появится" отображается
- [ ] Адаптивный дизайн
- [ ] SEO: Metadata

**Файл:** `src/app/lab/__tests__/page.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Низкий

---

## 🛠️ Этап 6: Утилиты и данные

### 6.1 Утилиты (✅ Готово)

#### Utils (`src/lib/utils.ts`)

- [x] Функция `cn` правильно объединяет классы
- [x] Обработка undefined/null значений
- [x] Tailwind классы мержатся корректно с tailwind-merge
- [x] clsx корректно обрабатывает условные классы
- [x] Edge cases (пустые строки, массивы)

**Файл:** `src/lib/__tests__/utils.test.ts` ✅  
**Текущее покрытие:** 100% (тесты уже существуют из-за использования в других компонентах)

---

### 6.2 Данные проектов

#### Projects Data (`src/data/projects.ts`)

- [ ] `getAllProjects()` возвращает массив проектов (3 проекта)
- [ ] `getProjectById()` возвращает правильный проект по id
- [ ] `getProjectById()` возвращает undefined для несуществующего id
- [ ] `getFeaturedProjects()` возвращает только featured проекты (3 шт)
- [ ] `filterByTechnology()` фильтрует по технологии
- [ ] `filterByTechnology()` работает с массивом технологий
- [ ] `filterByType()` фильтрует по типу (commercial/personal/educational)
- [ ] `searchByName()` ищет по названию (case-insensitive)
- [ ] `sortByDate()` сортирует по дате (asc/desc)
- [ ] Все проекты имеют обязательные поля (id, title, description и т.д.)

**Файл:** `src/data/__tests__/projects.test.ts` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Высокий

---

### 6.3 Данные технологий

#### Technologies Data (`src/data/technologies.tsx`)

- [ ] `technologies` массив не пустой
- [ ] Каждая технология имеет поле `name`
- [ ] Каждая технология имеет поле `icon`
- [ ] Иконки являются React компонентами
- [ ] Иконки рендерятся без ошибок
- [ ] Минимум 10 технологий в списке
- [ ] Технологии включают: Next.js, React, TypeScript, Tailwind CSS и др.

**Файл:** `src/data/__tests__/technologies.test.tsx` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Средний

---

### 6.4 Данные "Обо мне"

#### About Data (`src/data/about.ts`)

- [ ] `profileData` объект существует
- [ ] `profileData` имеет поле `name`
- [ ] `profileData` имеет поле `role`
- [ ] `profileData` имеет поле `bio`
- [ ] `profileData` имеет поле `avatar`
- [ ] `timeline` массив не пустой
- [ ] Каждая запись timeline имеет `year`, `title`, `description`
- [ ] `interests` массив не пустой
- [ ] `skills` массив не пустой (если есть)

**Файл:** `src/data/__tests__/about.test.ts` ❌  
**Текущее покрытие:** 0%  
**Приоритет:** Низкий

---

## 🎭 Этап 7: E2E тесты (Playwright) - Будущий этап

> **Важно:** Переходить к E2E тестам только после достижения 80%+ покрытия unit-тестами

### 7.1 Когда начинать E2E?

- [ ] Unit покрытие: 80%+
- [ ] Все критичные компоненты покрыты
- [ ] Утилиты и данные протестированы
- [ ] Страницы имеют базовое покрытие

### 7.1.1 Компоненты с Radix UI Portal

**Select и Popover** - Эти компоненты имеют базовые unit-тесты (props, рендеринг, accessibility), но полное тестирование взаимодействий будет в E2E:

- **Select:** Открытие dropdown, выбор опций, навигация клавишами, закрытие
- **Popover:** Открытие/закрытие по клику, Escape, клик вне области

Эти взаимодействия требуют реального браузера из-за особенностей работы порталов Radix UI.

---

### 7.2 Установка Playwright

- [ ] Установить `@playwright/test`
- [ ] Создать `playwright.config.ts`
- [ ] Создать директорию `e2e/`
- [ ] Настроить npm скрипты (test:e2e, test:e2e:ui)
- [ ] Добавить в .gitignore: `playwright-report/`, `test-results/`

---

### 7.3 Критичные пути пользователя

#### E2E-1: Навигация по сайту

- [ ] Загрузка главной страницы (/)
- [ ] Клик на "Проекты" в Header → переход на /projects
- [ ] Клик на "Обо мне" → переход на /about
- [ ] Клик на "Lab" → переход на /lab
- [ ] Клик на логотип → возврат на главную
- [ ] Открытие мобильного меню (< 768px)
- [ ] Навигация через мобильное меню
- [ ] Кнопка "Связаться" → переход на /contact

**Файл:** `e2e/navigation.spec.ts` ❌

---

#### E2E-2: Просмотр проектов

- [ ] Открытие страницы /projects
- [ ] Отображение всех проектов (3 шт)
- [ ] Применение фильтра по технологии (Select компонент)
- [ ] Поиск проекта по названию
- [ ] Изменение сортировки (новые/старые)
- [ ] Клик на карточку проекта → переход на /projects/[id]
- [ ] Просмотр детальной страницы проекта
- [ ] Воспроизведение видео (если есть)
- [ ] Клик на "GitHub" → открытие внешней ссылки
- [ ] Клик "Назад к проектам" → возврат на /projects
- [ ] **Select фильтры:** Открытие dropdown, выбор опции, закрытие

**Файл:** `e2e/projects.spec.ts` ❌  
**Примечание:** Включает полное тестирование Select компонента в реальном браузере

---

#### E2E-3: Контакты и социальные сети

- [ ] Открытие страницы /contact
- [ ] Клик по email → открытие mailto: ссылки
- [ ] Клик на GitHub → открытие в новой вкладке
- [ ] Клик на Telegram → открытие в новой вкладке
- [ ] Клик на VK → открытие в новой вкладке
- [ ] Проверка атрибутов безопасности (rel="noopener noreferrer")

**Файл:** `e2e/contact.spec.ts` ❌

---

#### E2E-4: Переключение темы

- [ ] Проверка default темы при загрузке
- [ ] Клик на "Light" → переключение на светлую тему
- [ ] Проверка стилей светлой темы (background, text color)
- [ ] Клик на "Dark" → переключение на темную тему
- [ ] Проверка стилей темной темы
- [ ] Клик на "System" → использование системной темы
- [ ] Перезагрузка страницы → тема сохраняется (localStorage)
- [ ] Проверка темы на всех страницах (/, /projects, /about, /contact, /lab)

**Файл:** `e2e/theme.spec.ts` ❌

---

#### E2E-5: Адаптивность

- [ ] Проверка на мобильном (360x800)
- [ ] Проверка на планшете (768x1024)
- [ ] Проверка на desktop (1280x720)
- [ ] Проверка на ultra-wide (1920x1080)
- [ ] Мобильное меню работает (< 768px)
- [ ] Desktop меню работает (>= 768px)
- [ ] Grid layout адаптируется (1-2-3 колонки)
- [ ] Секции адаптивны на всех устройствах

**Файл:** `e2e/responsive.spec.ts` ❌

---

#### E2E-6: SEO и метаданные

- [ ] Главная страница имеет `<title>`
- [ ] Главная страница имеет `<meta description>`
- [ ] Каждая страница имеет уникальный `<title>`
- [ ] Open Graph метатеги присутствуют
- [ ] Структурированные данные JSON-LD (если есть)
- [ ] H1 заголовок на каждой странице
- [ ] Семантические HTML теги (`<header>`, `<main>`, `<footer>`, `<nav>`)

**Файл:** `e2e/seo.spec.ts` ❌

---

## 📈 Метрики и цели покрытия

### Целевое покрытие по этапам

| Этап | Компонент/Область       | Текущее | Целевое |
| ---- | ----------------------- | ------- | ------- |
| 1    | UI компоненты           | 100%    | 100% ✅ |
| 2    | Layout компоненты       | 100%    | 100% ✅ |
| 2    | Проектные компоненты    | 100%    | 100% ✅ |
| 3    | Секции главной страницы | 33%     | 90%     |
| 4    | Lab компоненты          | 0%      | 80%     |
| 5    | Страницы                | 0%      | 70%     |
| 6    | Утилиты                 | 100%    | 100% ✅ |
| 6    | Данные                  | 0%      | 90%     |

### Общие целевые метрики

- **Текущее покрытие:** 40.26% (↑ с 38.58%, было 25.37%)
- **После Этапа 1-2:** 38.58% (Этапы 1-2 завершены ✅)
- **После Этапа 3.1:** 40.26% (Hero готов ✅)
- **После Этапа 3-4:** ~55%
- **После Этапа 5-6:** **80%+** ✅
- **Финальная цель:** 85%+

---

## 🚀 Запуск тестов

### Команды

```bash
# Разработка с hot reload
pnpm test

# UI интерфейс Vitest
pnpm test:ui

# Однократный запуск
pnpm test:run

# Покрытие кода с отчетом
pnpm test:coverage

# E2E тесты (после настройки Playwright)
pnpm test:e2e
pnpm test:e2e:ui
```

### CI/CD интеграция

- [ ] Настроить GitHub Actions для запуска тестов
- [ ] Блокировать merge при failing тестах
- [ ] Отслеживать покрытие кода (codecov.io или similar)
- [ ] Запускать E2E тесты на staging

---

## ✅ Чеклист готовности к продакшену

### Unit/Component тесты

- [ ] Все компоненты покрыты тестами (80%+)
- [ ] Все утилиты протестированы (95%+)
- [ ] Все данные протестированы (90%+)
- [ ] Страницы имеют базовое покрытие (70%+)
- [ ] Все тесты проходят (зелёные)
- [ ] Нет snapshot тестов для динамического контента
- [ ] Моки правильно настроены (next-themes, next/navigation)

### E2E тесты

- [ ] Критичные пути покрыты (6+ сценариев)
- [ ] Тесты проходят в Chromium, Firefox, WebKit
- [ ] Тесты проходят на разных разрешениях (mobile, tablet, desktop)
- [ ] Нет flaky тестов
- [ ] Тесты выполняются за < 3 минут

### Производительность

- [ ] Unit тесты выполняются за < 30 секунд
- [ ] E2E тесты выполняются за < 3 минут
- [ ] Нет медленных тестов (> 500ms для unit)
- [ ] Coverage генерируется за < 1 минуту

---

## 📊 Прогресс выполнения

### Легенда

- ✅ Полностью выполнено (100%)
- 🟡 Частично выполнено (1-99%)
- ❌ Не начато (0%)

### Общий прогресс по этапам

| Этап | Название                     | Статус | Прогресс |
| ---- | ---------------------------- | ------ | -------- |
| 1    | UI компоненты                | ✅     | 100%     |
| 2    | Layout и основные компоненты | ✅     | 100%     |
| 3    | Секции главной страницы      | 🟡     | 33%      |
| 4    | Lab компоненты               | ❌     | 0%       |
| 5    | Страницы приложения          | ❌     | 0%       |
| 6    | Утилиты и данные             | 🟡     | 25%      |
| 7    | E2E тесты                    | ❌     | 0%       |

**Общий прогресс unit-тестов:** ~40.26% → Цель: 80%+

---

## 🎯 Порядок выполнения (Roadmap)

### Фаза 1: Завершить базовые компоненты (Недели 1-2) ✅

1. [x] **Этап 1.2** - Дописать UI компоненты (Button, Popover, Select) ✅
2. [x] **Этап 2.2** - Покрыть ProjectCard и ProjectsFilters ✅
3. [x] **Цель покрытия:** 38.58%+ ✅

### Фаза 2: Секции и данные (Недели 3-4)

4. [ ] **Этап 3** - Покрыть секции (Hero, TechStack, FeaturedProjects)
5. [ ] **Этап 6.2-6.4** - Покрыть данные (projects, technologies, about)
6. [ ] **Цель покрытия:** 55%+

### Фаза 3: Страницы и Lab (Недели 5-6)

7. [ ] **Этап 4** - Покрыть ParticleAnimation
8. [ ] **Этап 5** - Покрыть все страницы (7 файлов)
9. [ ] **Цель покрытия:** **80%+** ✅

### Фаза 4: E2E и финализация (Недели 7-8)

10. [ ] **Этап 7** - Настроить Playwright
11. [ ] **Этап 7** - Написать 6 критичных E2E сценариев
12. [ ] **Финальная цель:** 85%+ unit + E2E готов

---

## 📝 Примечания и рекомендации

### Общие принципы тестирования

1. **AAA Pattern:** Arrange (настройка) → Act (действие) → Assert (проверка)
2. **Тестируй поведение, а не имплементацию:** Что видит пользователь, а не как код работает
3. **Один тест = одна проверка:** Тесты должны быть изолированы и атомарны
4. **Моки с умом:** Мокировать внешние зависимости, но не слишком много

### Что тестировать?

✅ **Тестировать:**

- Пользовательские взаимодействия (клик, ввод, hover)
- Рендеринг с разными props
- Условная логика и состояния
- Accessibility (aria-\*, role, alt)
- Integration между компонентами

❌ **Не тестировать:**

- Стили напрямую (лучше visual regression тесты)
- Сторонние библиотеки (они уже протестированы)
- TypeScript типы (проверяет компилятор)
- Очевидные вещи (кнопка рендерится)

### Snapshot тесты

- Использовать **избирательно** для UI компонентов
- **Не использовать** для динамического контента (даты, ID)
- Обновлять снимки только после review изменений

### Моки в проекте

- `next-themes` → мокируется через `__mocks__`
- `next/navigation` → мокируется useRouter, usePathname
- `window.matchMedia` → мокируется в setup.ts
- Canvas API (для ParticleAnimation) → мокировать через jest.fn()

---

## 📚 Полезные ссылки

### Документация

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event API](https://testing-library.com/docs/user-event/intro)
- [Playwright Documentation](https://playwright.dev/)

### Best Practices

- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing)

### Примеры

- [React Testing Library Examples](https://github.com/testing-library/react-testing-library/tree/main/examples)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## 📝 История изменений

### 13.10.2025 - Этап 3.1 завершен

**Что сделано:**

- ✅ Создано 25 тестов для Hero секции
  - Рендеринг и структура компонента (4 теста)
  - Заголовки (3 теста)
  - Контент (3 теста)
  - CTA кнопки (7 тестов)
  - Accessibility (4 теста)
  - Адаптивный дизайн (4 теста)
- ✅ Все тесты проходят (428 тестов)
- ✅ Build успешен

**Итоги:**

- Всего тестов: 428 (было 403, +25 тестов)
- Покрытие: 40.26% (было 38.58%, прирост +1.68%)
- Этап 3: 33% завершен (Hero готов, осталось TechStack и FeaturedProjects)
- Hero секция: 100% покрытие ✅

---

### 13.10.2025 - Этап 2.2 завершен

**Что сделано:**

- ✅ Создано 36 тестов для ProjectCard компонента
  - Grid вариант (вертикальная карточка)
  - Featured вариант (горизонтальная карточка)
  - Медиа превью (video/image)
  - Технологии и типы проектов
  - Accessibility и snapshot тесты
- ✅ Создано 45 тестов для ProjectsFilters компонента
  - Поиск с debounce
  - Фильтр по типу проекта (Select)
  - Фильтр по технологиям (Popover + Checkbox)
  - Сортировка
  - Очистка фильтров
- ✅ Создан mock файл с тестовыми данными проектов
- ✅ Добавлен mock для next/image в test setup
- ✅ Все тесты проходят (403 теста)
- ✅ Build успешен

**Итоги:**

- Всего тестов: 403 (было 322, +81 тест)
- Покрытие: 38.58% (было 25.37%, прирост +13.21%)
- Этап 2 полностью завершен ✅
- Компоненты проектов: 100% покрытие

---

### 13.10.2025 - Добавлен Git Workflow

**Что добавлено:**

- ✅ Секция "Git Workflow и процесс разработки"
- ✅ Стратегия работы с ветками (feature-ветка для каждого этапа)
- ✅ Чеклист обязательных проверок перед мерджем:
  - `pnpm test:run` - все тесты должны проходить
  - `pnpm build` - сборка должна проходить без ошибок
- ✅ Naming convention для веток и коммитов
- ✅ Пошаговый workflow для каждого этапа

**Зачем это нужно:**

Чёткая стратегия работы помогает поддерживать чистую историю Git, предотвращает ошибки при мердже и гарантирует, что код в main всегда рабочий.

---

### 13.10.2025 - Этап 1.2 завершен

**Что сделано:**

- ✅ Создан полный набор тестов для Button (59 тестов)
- ✅ Созданы базовые тесты для Select (28 тестов)
- ✅ Созданы базовые тесты для Popover (26 тестов)
- ✅ Добавлены моки для Radix UI в setup.ts (hasPointerCapture, scrollIntoView)
- ✅ Все UI компоненты shadcn/ui теперь покрыты тестами (100%)

**Итоги:**

- Всего тестов: 322 (было 209)
- Покрытие: 25.37% (было 18.57%, прирост +6.8%)
- UI компоненты: 100% покрытие ✅

**Примечание:**
Select и Popover используют Radix UI Portal, что усложняет unit-тестирование в jsdom. Созданы базовые тесты (props, рендеринг, accessibility). Полное тестирование взаимодействий (открытие/закрытие, клики, навигация) будет в E2E тестах.

---

> **Важно:** Этот документ будет обновляться по мере прогресса. После завершения каждого этапа обновляйте статус и покрытие.

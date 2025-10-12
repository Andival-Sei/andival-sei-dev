# План тестирования портфолио Andival-Sei

> **Последнее обновление:** 12.10.2025  
> **Текущий этап:** Базовое покрытие компонентов (Footer, Header, ThemeToggle)

---

## 📖 Введение

### Зачем нужны тесты?

Тестирование кода обеспечивает:

- **Стабильность** - предотвращение регрессий при изменениях
- **Уверенность** - гарантия что код работает как ожидается
- **Документация** - тесты показывают как использовать компоненты
- **Рефакторинг** - безопасное изменение кода с проверкой работоспособности

### Типы тестов в проекте

1. **Unit/Component тесты (Vitest + React Testing Library)**
   - Изолированное тестирование компонентов
   - Проверка логики, рендеринга, взаимодействий
   - Быстрые, запускаются часто
   - Целевое покрытие: **80%+**

2. **E2E тесты (Playwright) - будущий этап**
   - Полные пользовательские сценарии
   - Тестирование в реальном браузере
   - Проверка интеграций и флоу
   - Критически важные пути пользователя

### Используемые технологии

- **Vitest** - фреймворк для unit-тестов (совместим с Vite)
- **React Testing Library** - утилиты для тестирования React компонентов
- **@testing-library/jest-dom** - расширенные матчеры для DOM
- **@testing-library/user-event** - симуляция действий пользователя
- **jsdom** - эмуляция браузерного окружения

---

## 📊 Текущий прогресс

### ✅ Выполнено

#### Настройка инфраструктуры

- [x] Установлен Vitest и зависимости
- [x] Создан `vitest.config.ts` с настройками
- [x] Создан `src/test/setup.ts` с моками
- [x] Добавлены npm скрипты для запуска тестов

#### Покрытые компоненты

- [x] **Footer** - полное покрытие (копирайт, социальные сети, ThemeToggle)
- [x] **Header** - полное покрытие (логотип, навигация, скролл, мобильное меню)
- [x] **ThemeToggle** - полное покрытие (переключение тем, accessibility)

### 🔄 В процессе

- [ ] UI компоненты из shadcn/ui
- [ ] Секции главной страницы
- [ ] Карточки проектов и фильтры

### ⏳ Запланировано

- [ ] Страницы приложения
- [ ] Утилиты и функции
- [ ] E2E тесты с Playwright

---

## 🎯 Приоритеты тестирования

### Высокий приоритет

1. **Критичные компоненты** - Header, Footer (✅ готово)
2. **UI компоненты** - Button, Badge, Input и др.
3. **Бизнес-логика** - фильтрация проектов, получение данных
4. **Секции главной страницы** - Hero, TechStack, FeaturedProjects

### Средний приоритет

5. **Страницы** - Projects, About, Contact, Lab
6. **Карточки и списки** - ProjectCard, ProjectsFilters
7. **Утилиты** - cn функция, вспомогательные функции

### Низкий приоритет

8. **Статические данные** - technologies.ts, about.ts
9. **Типы** - TypeScript интерфейсы
10. **Конфигурации** - не требуют тестирования

---

## 🧩 Компоненты

### Layout компоненты (✅ Готово)

#### Header (`src/components/header.tsx`)

- [x] Рендеринг компонента
- [x] Логотип и ссылка на главную
- [x] Desktop навигация (Проекты, Обо мне, Lab)
- [x] Кнопка "Связаться"
- [x] Скролл эффекты (backdrop-blur, shadow)
- [x] Мобильное меню (Sheet)
- [x] Адаптивный дизайн
- [x] Accessibility

**Файл тестов:** `src/components/__tests__/header.test.tsx`

#### Footer (`src/components/footer.tsx`)

- [x] Рендеринг компонента
- [x] Копирайт с актуальным годом
- [x] Социальные сети (GitHub, Telegram, VK)
- [x] Правильные URL ссылок
- [x] Атрибуты безопасности (target, rel)
- [x] Accessibility (aria-labels)
- [x] ThemeToggle компонент
- [x] Адаптивный дизайн

**Файл тестов:** `src/components/__tests__/footer.test.tsx`

#### ThemeToggle (`src/components/theme-toggle.tsx`)

- [x] Рендеринг компонента
- [x] Три кнопки (Light, System, Dark)
- [x] Aria-labels для accessibility
- [x] Иконки (Sun, Monitor, Moon)
- [x] Переключение темы (setTheme)
- [x] SSR-safe (не рендерится до mounted)

**Файл тестов:** `src/components/__tests__/theme-toggle.test.tsx`

---

### UI компоненты (shadcn/ui)

#### Button (`src/components/ui/button.tsx`)

- [ ] Рендеринг с различными вариантами (default, ghost, outline)
- [ ] Различные размеры (sm, default, lg, icon)
- [ ] Состояние disabled
- [ ] AsChild prop для композиции
- [ ] Клик события
- [ ] Accessibility (role, aria-\*)

**Файл тестов:** `src/components/ui/__tests__/button.test.tsx`

#### Badge (`src/components/ui/badge.tsx`)

- [ ] Рендеринг с текстом
- [ ] Различные варианты (default, secondary, outline)
- [ ] Стили и CSS классы
- [ ] Snapshot тест

**Файл тестов:** `src/components/ui/__tests__/badge.test.tsx`

#### Input (`src/components/ui/input.tsx`)

- [ ] Рендеринг компонента
- [ ] Различные типы (text, email, password)
- [ ] Placeholder
- [ ] Состояние disabled
- [ ] Value и onChange
- [ ] Accessibility (labels, aria-\*)

**Файл тестов:** `src/components/ui/__tests__/input.test.tsx`

#### Checkbox (`src/components/ui/checkbox.tsx`)

- [ ] Рендеринг компонента
- [ ] Checked/unchecked состояния
- [ ] onChange события
- [ ] Disabled состояние
- [ ] Accessibility

**Файл тестов:** `src/components/ui/__tests__/checkbox.test.tsx`

#### Select (`src/components/ui/select.tsx`)

- [ ] Рендеринг компонента
- [ ] Открытие/закрытие dropdown
- [ ] Выбор опции
- [ ] Placeholder
- [ ] Disabled состояние
- [ ] Accessibility

**Файл тестов:** `src/components/ui/__tests__/select.test.tsx`

#### Sheet (`src/components/ui/sheet.tsx`)

- [ ] Рендеринг компонента
- [ ] Открытие/закрытие
- [ ] Различные стороны (left, right, top, bottom)
- [ ] Overlay и закрытие по клику
- [ ] Accessibility (role, aria-\*)

**Файл тестов:** `src/components/ui/__tests__/sheet.test.tsx`

#### Toggle & ToggleGroup (`src/components/ui/toggle.tsx`, `toggle-group.tsx`)

- [ ] Рендеринг компонента
- [ ] Переключение состояния
- [ ] Single/multiple режимы (для ToggleGroup)
- [ ] Disabled состояние
- [ ] Accessibility

**Файл тестов:** `src/components/ui/__tests__/toggle.test.tsx`, `toggle-group.test.tsx`

---

### Секции главной страницы

#### Hero (`src/components/sections/hero.tsx`)

- [ ] Рендеринг компонента
- [ ] Заголовок и описание
- [ ] CTA кнопки ("Посмотреть проекты", "Отправить Email")
- [ ] Ссылки на правильные страницы
- [ ] Адаптивный дизайн
- [ ] Анимации (если есть)

**Файл тестов:** `src/components/sections/__tests__/hero.test.tsx`

#### TechStack (`src/components/sections/tech-stack.tsx`)

- [ ] Рендеринг компонента
- [ ] Отображение всех технологий из данных
- [ ] Иконки технологий
- [ ] Grid layout
- [ ] Hover эффекты
- [ ] Адаптивный дизайн

**Файл тестов:** `src/components/sections/__tests__/tech-stack.test.tsx`

#### FeaturedProjects (`src/components/sections/featured-projects.tsx`)

- [ ] Рендеринг компонента
- [ ] Отображение 3 избранных проектов
- [ ] Карусель с навигацией
- [ ] Стрелки и индикаторы
- [ ] Ссылка "Посмотреть все проекты"
- [ ] Адаптивный дизайн
- [ ] Автопрокрутка (если есть)

**Файл тестов:** `src/components/sections/__tests__/featured-projects.test.tsx`

---

### Компоненты проектов

#### ProjectCard (`src/components/project-card.tsx`)

- [ ] Рендеринг компонента
- [ ] Отображение названия и описания
- [ ] Медиа превью (изображение/видео)
- [ ] Теги технологий (Badge)
- [ ] Ссылка на детальную страницу
- [ ] Hover эффекты
- [ ] Адаптивный дизайн

**Файл тестов:** `src/components/__tests__/project-card.test.tsx`

#### ProjectsFilters (`src/components/projects-filters.tsx`)

- [ ] Рендеринг компонента
- [ ] Фильтр по технологиям (Checkbox)
- [ ] Фильтр по типу проекта (Select)
- [ ] Поиск по названию (Input с debounce)
- [ ] Сортировка по дате
- [ ] Применение фильтров
- [ ] Сброс фильтров

**Файл тестов:** `src/components/__tests__/projects-filters.test.tsx`

---

### Lab компоненты

#### ParticleAnimation (`src/components/lab/particle-animation.tsx`)

- [ ] Рендеринг компонента
- [ ] Canvas элемент
- [ ] Анимация частиц
- [ ] Поддержка светлой/тёмной темы
- [ ] Производительность (не тормозит)
- [ ] Cleanup при unmount

**Файл тестов:** `src/components/lab/__tests__/particle-animation.test.tsx`

---

## 📄 Страницы

### Home page (`src/app/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Наличие всех секций (Hero, TechStack, FeaturedProjects)
- [ ] SEO метаданные (title, description)
- [ ] Адаптивный layout

**Файл тестов:** `src/app/__tests__/page.test.tsx`

### Projects page (`src/app/projects/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Отображение всех проектов
- [ ] Фильтры работают
- [ ] Поиск работает
- [ ] Сортировка работает
- [ ] Grid layout адаптивный
- [ ] SEO метаданные

**Файл тестов:** `src/app/projects/__tests__/page.test.tsx`

### Project Detail page (`src/app/projects/[id]/page.tsx`)

- [ ] Рендеринг страницы с правильным проектом
- [ ] Все данные проекта отображаются
- [ ] Медиа работает (видео/изображение)
- [ ] Ссылки (GitHub, Live Demo) работают
- [ ] 404 страница для несуществующих проектов
- [ ] SEO метаданные динамические

**Файл тестов:** `src/app/projects/[id]/__tests__/page.test.tsx`

### About page (`src/app/about/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Фото профиля
- [ ] Описание и биография
- [ ] Timeline образования/карьеры
- [ ] Интересы и увлечения
- [ ] SEO метаданные

**Файл тестов:** `src/app/about/__tests__/page.test.tsx`

### Contact page (`src/app/contact/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Контактная информация
- [ ] Ссылки на социальные сети
- [ ] Email ссылка (mailto:)
- [ ] SEO метаданные

**Файл тестов:** `src/app/contact/__tests__/page.test.tsx`

### Lab page (`src/app/lab/page.tsx`)

- [ ] Рендеринг страницы
- [ ] Анимация частиц работает
- [ ] Текст "Скоро здесь что-то появится"
- [ ] SEO метаданные

**Файл тестов:** `src/app/lab/__tests__/page.test.tsx`

---

## 🛠️ Утилиты и данные

### Utils (`src/lib/utils.ts`)

- [ ] Функция `cn` правильно объединяет классы
- [ ] Обработка undefined/null значений
- [ ] Tailwind классы мержатся корректно
- [ ] Edge cases (пустые строки, массивы)

**Файл тестов:** `src/lib/__tests__/utils.test.ts`

### Projects Data (`src/data/projects.ts`)

- [ ] `getAllProjects()` возвращает все проекты
- [ ] `getProjectById()` возвращает правильный проект
- [ ] `getProjectById()` возвращает undefined для несуществующего
- [ ] `getFeaturedProjects()` возвращает только featured проекты
- [ ] Фильтры по технологиям работают
- [ ] Фильтры по типу работают
- [ ] Поиск по названию работает
- [ ] Сортировка по дате работает

**Файл тестов:** `src/data/__tests__/projects.test.ts`

### Technologies Data (`src/data/technologies.tsx`)

- [ ] Список технологий не пустой
- [ ] Каждая технология имеет name и icon
- [ ] Иконки рендерятся как React компоненты

**Файл тестов:** `src/data/__tests__/technologies.test.tsx`

### About Data (`src/data/about.ts`)

- [ ] Данные профиля существуют
- [ ] Timeline содержит записи
- [ ] Интересы и навыки заполнены

**Файл тестов:** `src/data/__tests__/about.test.ts`

---

## 🎭 E2E тесты (Playwright) - Будущий этап

### Когда переходить на E2E?

После достижения:

- Unit покрытие компонентов: **80%+**
- Все критичные компоненты покрыты
- Утилиты и данные протестированы

### Сценарии для E2E тестов

#### Критичные пути пользователя

1. **Навигация по сайту**
   - Переход между страницами через Header
   - Работа мобильного меню
   - Кнопки CTA ведут на правильные страницы

2. **Просмотр проектов**
   - Открытие страницы проектов
   - Применение фильтров
   - Поиск проекта
   - Переход на детальную страницу проекта
   - Воспроизведение видео

3. **Контакты**
   - Открытие страницы контактов
   - Клик по email открывает почтовый клиент
   - Социальные ссылки открываются в новой вкладке

4. **Темная тема**
   - Переключение между темами
   - Тема сохраняется при перезагрузке
   - Все страницы поддерживают обе темы

5. **Адаптивность**
   - Сайт работает на мобильных (320px+)
   - Сайт работает на планшетах (768px+)
   - Сайт работает на desktop (1280px+)
   - Сайт работает на ultra-wide (1920px+)

### Настройка Playwright

Когда будем готовы:

1. Установить `@playwright/test`
2. Создать `playwright.config.ts`
3. Создать тесты в `e2e/` директории
4. Настроить CI/CD для E2E тестов

---

## 📈 Метрики и цели

### Целевое покрытие кода

- **Общее покрытие:** 80%+
- **Компоненты:** 90%+
- **Утилиты:** 95%+
- **Страницы:** 70%+

### Запуск тестов

```bash
# Разработка (watch mode)
pnpm test

# UI интерфейс
pnpm test:ui

# Однократный запуск
pnpm test:run

# Проверка покрытия
pnpm test:coverage
```

### Непрерывная интеграция (CI)

- Тесты должны проходить перед каждым коммитом
- Покрытие отслеживается автоматически
- Failing тесты блокируют merge в main

---

## ✅ Чеклист перед деплоем

### Unit/Component тесты

- [ ] Все компоненты покрыты тестами
- [ ] Все утилиты и данные протестированы
- [ ] Покрытие кода: 80%+
- [ ] Все тесты проходят (зелёные)

### E2E тесты

- [ ] Критичные пути покрыты
- [ ] Тесты проходят в Chromium, Firefox, WebKit
- [ ] Тесты проходят на разных разрешениях экрана

### Производительность

- [ ] Тесты выполняются быстро (< 30 сек unit, < 2 мин E2E)
- [ ] Нет медленных тестов
- [ ] Нет flaky тестов

---

## 🚀 Следующие шаги

1. **Немедленно:**
   - Запустить тесты для Footer, Header, ThemeToggle
   - Проверить что всё работает
   - Зафиксировать baseline покрытия

2. **На этой неделе:**
   - Покрыть UI компоненты (Button, Badge, Input)
   - Написать тесты для секций (Hero, TechStack, FeaturedProjects)
   - Достичь 50% покрытия

3. **В ближайший месяц:**
   - Покрыть все компоненты и утилиты
   - Написать тесты для страниц
   - Достичь целевого покрытия 80%+

4. **Долгосрочно:**
   - Настроить Playwright
   - Написать E2E тесты
   - Интегрировать в CI/CD

---

## 📝 Полезные ссылки

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Playwright](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

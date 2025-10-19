# 🔐 Настройка GitHub Secrets для CI/CD

## ✅ Что уже сделано автоматически

- ✅ Созданы все GitHub Actions workflows
- ✅ Настроена интеграция с Codecov (для public репо токен не нужен)
- ✅ Обновлен README с badges
- ✅ Добавлены новые скрипты в package.json
- ✅ Обновлен ROADMAP.md

## 🔧 Что нужно настроить вручную (2-3 минуты)

### 1. Создать VERCEL_TOKEN

**Важно:** Токены создаются в личном профиле, а не в Team Settings!

1. Зайдите на [Vercel Dashboard](https://vercel.com/dashboard)
2. **Убедитесь, что вы в личном профиле** (не в "Andival-Sei's projects")
   - Если видите "Andival-Sei's projects" в верхнем левом углу, нажмите на него и выберите личный профиль
3. Перейдите в **Settings** → **Tokens**
4. Нажмите **Create Token**
5. Введите название: `GitHub Actions Deploy`
6. Выберите срок действия (рекомендуется **No Expiration**)
7. Скопируйте созданный токен

**Альтернативный способ через CLI:**

```bash
npm i -g vercel
vercel login
vercel tokens add "GitHub Actions Deploy"
```

### 2. Добавить Secrets в GitHub

1. Зайдите в ваш репозиторий: https://github.com/Andival-Sei/andival-sei-dev
2. Перейдите в **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret** и добавьте:

#### VERCEL_TOKEN

- **Name:** `VERCEL_TOKEN`
- **Value:** токен из шага 1

#### VERCEL_ORG_ID

- **Name:** `VERCEL_ORG_ID`
- **Value:** `team_jNkl1wPoshB4uLZ6i9QgCUEq`

#### VERCEL_PROJECT_ID

- **Name:** `VERCEL_PROJECT_ID`
- **Value:** `prj_AhpEwVgDjKws6Ka0w8EGbKiCnb8L`

## 🚀 Проверка работы

После добавления всех secrets:

1. **Проверьте CI:** https://github.com/Andival-Sei/andival-sei-dev/actions
   - Должен запуститься workflow "CI" после push
   - Все проверки должны пройти успешно

2. **Проверьте Codecov:** https://codecov.io/gh/Andival-Sei/andival-sei-dev
   - После первого успешного CI появится отчет о покрытии
   - Badge в README будет обновляться автоматически

3. **Проверьте Deploy:**
   - После успешного CI автоматически запустится Deploy workflow
   - Сайт обновится на Vercel

## 📊 Ожидаемые результаты

### CI Pipeline (2-3 минуты)

- ✅ ESLint проверка
- ✅ TypeScript проверка типов
- ✅ Prettier проверка форматирования
- ✅ Запуск всех тестов с coverage
- ✅ Production сборка
- ✅ Загрузка coverage в Codecov

### CodeQL Security (5-7 минут)

- ✅ Анализ безопасности JavaScript/TypeScript кода
- ✅ Создание security alerts при найденных уязвимостях

### Deploy (1-2 минуты)

- ✅ Запуск только после успешного CI
- ✅ Deploy на production Vercel
- ✅ Обновление сайта

## 🎯 Badges в README

После настройки в README будут отображаться:

- **CI Status** - статус последнего запуска CI
- **Codecov** - покрытие кода тестами
- **License** - MIT лицензия

## 🔧 Локальные команды

Теперь доступны новые команды:

```bash
# Проверка типов TypeScript
pnpm typecheck

# Полный CI pipeline локально
pnpm ci

# Только тесты с coverage
pnpm test:coverage
```

## 🆘 Если что-то не работает

1. **CI не запускается:** Проверьте, что файлы в папке `.github/workflows/` корректны
2. **Deploy не работает:** Проверьте, что все 3 secrets добавлены в GitHub
3. **Codecov не работает:** Подождите 5-10 минут после первого успешного CI
4. **CodeQL ошибки:** Это нормально для первого запуска, может занять до 10 минут

## 📞 Поддержка

Если возникли проблемы:

- Проверьте логи в GitHub Actions
- Убедитесь, что все secrets добавлены
- Проверьте, что Vercel проект подключен к GitHub

---

**Готово! 🎉** Ваш CI/CD pipeline настроен и готов к работе!

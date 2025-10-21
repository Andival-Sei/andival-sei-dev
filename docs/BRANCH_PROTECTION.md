# 🛡️ Настройка защиты ветки main в GitHub

> **Цель:** Настроить защиту ветки main для предотвращения прямых push и обеспечения прохождения CI перед merge

## 📋 Обзор

Защита ветки main - это критически важная практика для любого серьезного проекта. Она обеспечивает:

- ✅ Автоматический контроль качества кода
- ✅ Защиту от случайных поломок production
- ✅ Документирование всех изменений через Pull Request
- ✅ Демонстрацию профессиональных практик

## 🚀 Пошаговая настройка

### Шаг 1: Переход в настройки репозитория

1. Откройте ваш репозиторий на GitHub
2. Перейдите в **Settings** (вкладка в верхнем меню)
3. В левом меню выберите **Branches**

### Шаг 2: Создание правила защиты

1. Нажмите кнопку **Add rule**
2. В поле **Branch name pattern** введите: `main`
3. Нажмите **Create**

### Шаг 3: Настройка требований

#### ✅ Обязательные настройки

**Require status checks to pass before merging**

- ☑️ Включить эту опцию
- ☑️ В списке статус-чеков выбрать **CI Pipeline**
- ☑️ Включить **Require branches to be up to date before merging**

**Do not allow bypassing the above settings**

- ☑️ Включить эту опцию (критически важно!)

#### ❌ Настройки для пропуска (solo-разработка)

**Require pull request reviews before merging**

- ❌ Оставить выключенным (работаем один)

**Require review from code owners**

- ❌ Оставить выключенным

**Dismiss stale reviews when new commits are pushed**

- ❌ Оставить выключенным

### Шаг 4: Сохранение настроек

1. Прокрутите вниз и нажмите **Save changes**
2. Подтвердите создание правила

## 🔍 Проверка настройки

После настройки вы увидите:

- ✅ Правило защиты для ветки `main`
- ✅ Требование прохождения CI Pipeline
- ✅ Блокировку прямых push в main

## 📝 Workflow для работы с защищенной веткой

### Создание новой фичи

```bash
# 1. Переключиться на main и обновить
git checkout main
git pull origin main

# 2. Создать feature branch
git checkout -b feature/my-new-feature

# 3. Внести изменения
# ... редактирование файлов ...

# 4. Добавить и закоммитить изменения
git add .
git commit -m "feat: добавить новую функциональность"

# 5. Push в feature branch
git push origin feature/my-new-feature
```

### Создание Pull Request

1. Перейдите на GitHub в ваш репозиторий
2. Нажмите **Compare & pull request** (появится после push)
3. Заполните описание PR:
   - **Title:** Краткое описание изменений
   - **Description:** Детальное описание того, что изменилось
4. Нажмите **Create pull request**

### Процесс merge

1. **Дождитесь прохождения CI** - статус должен быть зеленым ✅
2. Если CI упал - исправьте ошибки и push новые коммиты
3. После успешного CI нажмите **Merge pull request**
4. Выберите тип merge (рекомендуется **Squash and merge**)
5. Подтвердите merge

### Очистка после merge

```bash
# 1. Переключиться на main
git checkout main

# 2. Обновить локальную ветку
git pull origin main

# 3. Удалить feature branch
git branch -d feature/my-new-feature
git push origin --delete feature/my-new-feature
```

## ⚠️ Важные моменты

### Что НЕ работает после настройки

- ❌ `git push origin main` - будет заблокирован
- ❌ Прямые коммиты в main через GitHub UI
- ❌ Merge без прохождения CI

### Что работает

- ✅ Создание feature branches
- ✅ Push в feature branches
- ✅ Создание Pull Request
- ✅ Merge через GitHub UI после успешного CI

## 🔧 Troubleshooting

### CI не проходит

1. Проверьте локально:

   ```bash
   pnpm ci  # запустить все проверки
   ```

2. Исправьте ошибки и push новые коммиты:
   ```bash
   git add .
   git commit -m "fix: исправить ошибки CI"
   git push origin feature/my-feature
   ```

### Нужно срочно исправить критический баг

Если нужно срочно исправить что-то в main:

1. Создайте hotfix branch:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-fix
   ```

2. Исправьте и создайте PR как обычно
3. После merge удалите hotfix branch

## 📊 Преимущества для портфолио

- **Профессиональность** - показывает знание современных практик
- **Качество кода** - все изменения проходят проверки
- **История изменений** - каждый PR документирует развитие проекта
- **Безопасность** - защита от случайных поломок

## 🎯 Следующие шаги

После настройки защиты ветки:

1. Протестируйте workflow - создайте тестовый PR
2. Убедитесь, что CI проходит успешно
3. Выполните merge через GitHub UI
4. Продолжайте разработку с новым workflow

---

**Готово!** Теперь ваш репозиторий защищен и готов к профессиональной разработке. 🚀

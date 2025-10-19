module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Разрешаем русские описания коммитов
    "subject-case": [0], // Отключаем проверку регистра для поддержки русского языка
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 50],
    "subject-min-length": [2, "always", 10],

    // Стандартные правила для типов коммитов
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],

    // Обязательные правила
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],

    // Правила для тела коммита (опционально)
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 72],
    "footer-leading-blank": [2, "always"],
    "footer-max-line-length": [2, "always", 72],
  },
};

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Базовые Next.js конфигурации
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // TypeScript ESLint recommended
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  // JSX A11y recommended (полный набор правил доступности)
  ...compat.extends("plugin:jsx-a11y/recommended"),

  // Import plugin recommended
  ...compat.extends("plugin:import/recommended", "plugin:import/typescript"),

  // Prettier должен быть последним
  ...compat.extends("plugin:prettier/recommended"),

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "coverage/**",
      ".husky/**",
      "*.config.{js,ts,mjs}",
    ],
  },

  // Кастомные правила для переопределения
  {
    rules: {
      // TypeScript: разрешаем any в некоторых случаях для миграции
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Import: настройка порядка импортов
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // A11y: ужесточаем некоторые правила
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    },
  },
];

export default eslintConfig;

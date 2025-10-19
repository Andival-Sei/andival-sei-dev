import { ImageResponse } from "next/og";

/**
 * Интерфейс для параметров OG изображения
 */
export interface OGImageProps {
  title: string;
  subtitle?: string;
  accent?: string;
  colorScheme?: "default" | "blue" | "purple" | "green" | "orange";
}

/**
 * Цветовые схемы для разных страниц
 */
const colorSchemes = {
  default: {
    gradient: "linear-gradient(to bottom right, #1e293b, #0f172a)",
    titleColor: "white",
    subtitleColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "rgba(255, 255, 255, 0.7)",
  },
  blue: {
    gradient: "linear-gradient(to bottom right, #1e40af, #1e3a8a)",
    titleColor: "white",
    subtitleColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "rgba(147, 197, 253, 0.8)",
  },
  purple: {
    gradient: "linear-gradient(to bottom right, #7c3aed, #5b21b6)",
    titleColor: "white",
    subtitleColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "rgba(196, 181, 253, 0.8)",
  },
  green: {
    gradient: "linear-gradient(to bottom right, #059669, #047857)",
    titleColor: "white",
    subtitleColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "rgba(134, 239, 172, 0.8)",
  },
  orange: {
    gradient: "linear-gradient(to bottom right, #ea580c, #c2410c)",
    titleColor: "white",
    subtitleColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "rgba(253, 186, 116, 0.8)",
  },
};

/**
 * Базовый шаблон для генерации OG изображений
 * Переиспользуемый компонент для создания Open Graph изображений
 */
export function createOGImage({
  title,
  subtitle,
  accent,
  colorScheme = "default",
}: OGImageProps) {
  const colors = colorSchemes[colorScheme];

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: colors.gradient,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: colors.titleColor,
          padding: "40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Основной заголовок */}
        <div
          style={{
            fontSize: 96,
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>

        {/* Подзаголовок */}
        {subtitle && (
          <div
            style={{
              fontSize: 48,
              color: colors.subtitleColor,
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Акцентный текст */}
        {accent && (
          <div
            style={{
              fontSize: 32,
              color: colors.accentColor,
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {accent}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

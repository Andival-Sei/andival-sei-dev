"use client";

import { useEffect, useMemo, useState } from "react";

import { technologies, Technology } from "@/data/technologies";

interface TechGridProps {
  technologies: Technology[];
}

const GRID_COLUMNS = 24;
const GRID_ROWS = 5;
const CELL_SIZE_PX = 96;
const COLUMN_GAP_PX = 12;
const ROW_GAP_PX = 24;
const GRID_WIDTH_PX =
  GRID_COLUMNS * CELL_SIZE_PX + (GRID_COLUMNS - 1) * COLUMN_GAP_PX;

const POSITION_MAP = {
  xl: [
    GRID_COLUMNS * 2 + 11,
    GRID_COLUMNS * 2 + 12,
    GRID_COLUMNS * 2 + 13,
    GRID_COLUMNS * 2 + 14,
    GRID_COLUMNS * 3 + 11,
    GRID_COLUMNS * 3 + 12,
    GRID_COLUMNS * 3 + 13,
    GRID_COLUMNS * 3 + 14,
  ],
  lg: [
    GRID_COLUMNS * 2 + 10,
    GRID_COLUMNS * 2 + 11,
    GRID_COLUMNS * 2 + 12,
    GRID_COLUMNS * 2 + 13,
    GRID_COLUMNS * 3 + 10,
    GRID_COLUMNS * 3 + 11,
    GRID_COLUMNS * 3 + 12,
    GRID_COLUMNS * 3 + 13,
  ],
  md: [
    GRID_COLUMNS * 2 + 9,
    GRID_COLUMNS * 2 + 10,
    GRID_COLUMNS * 2 + 11,
    GRID_COLUMNS * 2 + 12,
    GRID_COLUMNS * 3 + 9,
    GRID_COLUMNS * 3 + 10,
    GRID_COLUMNS * 3 + 11,
    GRID_COLUMNS * 3 + 12,
  ],
  sm: [
    GRID_COLUMNS * 2 + 8,
    GRID_COLUMNS * 2 + 9,
    GRID_COLUMNS * 2 + 10,
    GRID_COLUMNS * 2 + 11,
    GRID_COLUMNS * 3 + 8,
    GRID_COLUMNS * 3 + 9,
    GRID_COLUMNS * 3 + 10,
    GRID_COLUMNS * 3 + 11,
  ],
  xs: [
    GRID_COLUMNS * 2 + 7,
    GRID_COLUMNS * 2 + 8,
    GRID_COLUMNS * 2 + 9,
    GRID_COLUMNS * 2 + 10,
    GRID_COLUMNS * 3 + 7,
    GRID_COLUMNS * 3 + 8,
    GRID_COLUMNS * 3 + 9,
    GRID_COLUMNS * 3 + 10,
  ],
} as const;

type BreakpointKey = keyof typeof POSITION_MAP;

const pickPositionKey = (width: number): BreakpointKey => {
  if (width >= 1440) return "xl";
  if (width >= 1200) return "lg";
  if (width >= 992) return "md";
  if (width >= 768) return "sm";
  return "xs";
};

const TechGrid = ({ technologies }: TechGridProps) => {
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window === "undefined" ? GRID_WIDTH_PX : window.innerWidth
  );
  const [positionsKey, setPositionsKey] = useState<BreakpointKey>(() => {
    if (typeof window === "undefined") {
      return "xl";
    }
    return pickPositionKey(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      const nextKey = pickPositionKey(window.innerWidth);
      setPositionsKey((prev) => (prev === nextKey ? prev : nextKey));
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const grid = useMemo<(Technology | null)[]>(() => {
    const template: (Technology | null)[] = new Array(
      GRID_COLUMNS * GRID_ROWS
    ).fill(null);
    const positions = POSITION_MAP[positionsKey];

    technologies.forEach((tech, index) => {
      if (index < positions.length) {
        template[positions[index]] = tech;
      }
    });

    return template;
  }, [positionsKey, technologies]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* Градиентные тени по краям */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Левая тень */}
        {positionsKey !== "sm" && positionsKey !== "xs" && (
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background via-background/80 to-transparent" />
        )}
        {/* Правая тень */}
        {positionsKey !== "sm" && positionsKey !== "xs" && (
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background via-background/80 to-transparent" />
        )}
        {/* Верхняя тень */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent" />
        {/* Нижняя тень */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Фиксированная сетка — двигаются только технологии */}
      <div className="relative flex justify-center overflow-visible">
        <div
          className="relative tech-grid"
          style={{
            width: `${GRID_WIDTH_PX}px`,
            transform:
              viewportWidth >= GRID_WIDTH_PX
                ? undefined
                : `translateX(${(viewportWidth - GRID_WIDTH_PX) / 2}px)`,
          }}
        >
          {grid.map((tech, index) => {
            const row = Math.floor(index / GRID_COLUMNS);
            const col = index % GRID_COLUMNS;

            // Смещение рядов: 1, 3 ряды ровно; 2, 4 ряды смещены
            const isOffsetRow = row % 2 === 1; // Четные ряды (индексы 1, 3)
            const offset = isOffsetRow ? 0.5 : 0;

            return (
              <div
                key={tech ? tech.id : `empty-${index}`}
                className={`
                  rounded-lg border border-border/60 bg-muted/10
                  flex items-center justify-center
                  relative transition-transform duration-300 ease-in-out
                  ${tech ? "cursor-pointer group tech-block" : "cursor-default empty-block"}
                `}
                style={{
                  gridColumn: `${col + 1} / ${col + 2}`,
                  gridRow: `${row + 1} / ${row + 2}`,
                  transform: `translateX(${offset * 100}%)`,
                  width: `${CELL_SIZE_PX}px`,
                  height: `${CELL_SIZE_PX}px`,
                  ...(tech &&
                    ({
                      "--glow-color": tech.color,
                    } as React.CSSProperties)),
                  ...(!tech &&
                    ({
                      "--offset": `${offset * 100}%`,
                    } as React.CSSProperties)),
                }}
              >
                {tech && (
                  <>
                    {/* Иконка */}
                    <tech.icon
                      size={40}
                      className="transition-all duration-300 ease-in-out relative z-10"
                      style={{
                        color: tech.color,
                      }}
                    />

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none whitespace-nowrap z-20 border border-border/20">
                      {tech.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Стили для эффекта свечения, анимации и адаптивности */}
      <style jsx>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(${GRID_COLUMNS}, ${CELL_SIZE_PX}px);
          column-gap: ${COLUMN_GAP_PX}px;
          row-gap: ${ROW_GAP_PX}px;
          padding-top: 6rem;
          padding-bottom: 6rem;
          margin: 0 auto;
        }

        @media (max-width: 991px) {
          .tech-grid {
            margin-left: calc(
              (100vw - 4 * ${CELL_SIZE_PX}px - 3 * ${COLUMN_GAP_PX}px) / 2
            );
            margin-right: calc(
              (100vw - 4 * ${CELL_SIZE_PX}px - 3 * ${COLUMN_GAP_PX}px) / 2
            );
          }

          .tech-grid > div {
            width: ${CELL_SIZE_PX}px;
            height: ${CELL_SIZE_PX}px;
          }
        }

        .tech-block {
          box-shadow: 0 0 0 0 transparent;
          transition:
            all 300ms ease-in-out,
            box-shadow 150ms ease-in !important;
        }

        /* Подсветка для блоков с технологиями */
        .tech-block:hover {
          box-shadow:
            0 0 10px 3px var(--glow-color),
            0 0 17px 5px var(--glow-color),
            0 0 24px 7px var(--glow-color) !important;
        }

        .tech-block:not(:hover) {
          transition:
            all 300ms ease-in-out,
            box-shadow 800ms ease-out !important;
        }

        /* Уменьшение для пустых блоков */
        .empty-block:hover {
          transform: translateX(var(--offset, 0%)) scale(0.85) !important;
          transition: transform 150ms ease-in !important;
        }

        .empty-block:not(:hover) {
          transition: transform 800ms ease-out !important;
        }
      `}</style>
    </div>
  );
};

export default function TechStack() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Мой стек технологий
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Инструменты и технологии, которые я использую для создания
            современных веб-приложений
          </p>
        </div>
      </div>

      {/* Сетка технологий - на всю ширину */}
      <TechGrid technologies={technologies} />

      <div className="max-w-7xl mx-auto px-4">
        {/* Описание */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            От фронтенда до бэкенда, от дизайна до деплоя — я работаю с полным
            стеком современных технологий. Каждый инструмент выбран для
            максимальной эффективности и качества результата.
          </p>
        </div>
      </div>
    </section>
  );
}

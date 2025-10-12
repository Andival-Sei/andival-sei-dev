"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { technologies, Technology } from "@/data/technologies";

interface TechGridProps {
  technologies: Technology[];
}

const GRID_COLUMNS = 24;
const GRID_ROWS = 5;
const CELL_SIZE_PX = 96;
const GRID_GAP_PX = 24;
const CLUSTER_COLUMNS = 5; // Максимальное количество колонок в ряду
const GRID_WIDTH_PX =
  GRID_COLUMNS * CELL_SIZE_PX + (GRID_COLUMNS - 1) * GRID_GAP_PX;

// Мобильные размеры (для экранов < 600px)
const MOBILE_CELL_SIZE_PX = 72;
const MOBILE_GRID_GAP_PX = 16;

// Создает позиции для 3 рядов: 5 блоков, 5 блоков, 5 блоков
const createPositions = (startColumn: number) =>
  [
    // Ряд 1: 5 блоков (HTML, CSS, SCSS, JS, Playwright)
    GRID_COLUMNS + startColumn,
    GRID_COLUMNS + startColumn + 1,
    GRID_COLUMNS + startColumn + 2,
    GRID_COLUMNS + startColumn + 3,
    GRID_COLUMNS + startColumn + 4,
    // Ряд 2: 5 блоков (Vite, Vitest, Git, Vercel, Figma)
    GRID_COLUMNS * 2 + startColumn,
    GRID_COLUMNS * 2 + startColumn + 1,
    GRID_COLUMNS * 2 + startColumn + 2,
    GRID_COLUMNS * 2 + startColumn + 3,
    GRID_COLUMNS * 2 + startColumn + 4,
    // Ряд 3: 5 блоков (React, TypeScript, Cursor, GPT, Claude)
    GRID_COLUMNS * 3 + startColumn,
    GRID_COLUMNS * 3 + startColumn + 1,
    GRID_COLUMNS * 3 + startColumn + 2,
    GRID_COLUMNS * 3 + startColumn + 3,
    GRID_COLUMNS * 3 + startColumn + 4,
  ] as const;

// Центрируем относительно самого широкого ряда (5 блоков)
const CENTER_COLUMN_OFFSET = Math.floor((GRID_COLUMNS - 5) / 2);

const TechGrid = ({ technologies }: TechGridProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(GRID_WIDTH_PX);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resolveWidth = () => {
      const windowWidth = window.innerWidth;

      if (!containerRef.current) {
        return windowWidth;
      }

      const parentWidth =
        containerRef.current.parentElement?.getBoundingClientRect().width;
      const selfWidth = containerRef.current.getBoundingClientRect().width;

      const measuredWidth = parentWidth ?? selfWidth ?? windowWidth;

      return Math.min(windowWidth, measuredWidth);
    };

    const handleResize = () => {
      const currentWidth = resolveWidth();
      setViewportWidth((prev) => (prev === currentWidth ? prev : currentWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(
        containerRef.current.parentElement ?? containerRef.current
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, []);

  // Определяем мобильный layout для маленьких экранов
  const isMobileLayout = viewportWidth < 600;

  // Вычисляем стартовую колонку на основе ширины viewport
  const calculateStartCol = useMemo(() => {
    // Используем размеры в зависимости от layout
    const cellSize = isMobileLayout ? MOBILE_CELL_SIZE_PX : CELL_SIZE_PX;
    const gridGap = isMobileLayout ? MOBILE_GRID_GAP_PX : GRID_GAP_PX;
    const columnStride = cellSize + gridGap;
    const gridWidth = GRID_COLUMNS * cellSize + (GRID_COLUMNS - 1) * gridGap;

    if (viewportWidth >= gridWidth) {
      // Полная сетка видна - центрируем
      return CENTER_COLUMN_OFFSET;
    }

    // Вычисляем сколько колонок примерно помещается на экране
    const visibleColumns = Math.floor(viewportWidth / columnStride);

    // Вычисляем смещение: сколько колонок нужно "пропустить" слева
    // чтобы кластер оказался в центре видимой области
    const shift = Math.max(0, Math.floor((GRID_COLUMNS - visibleColumns) / 2));

    // Но не смещаем дальше, чем позволяет сетка
    const maxStartCol = GRID_COLUMNS - CLUSTER_COLUMNS;
    return Math.min(CENTER_COLUMN_OFFSET + shift, maxStartCol);
  }, [viewportWidth, isMobileLayout]);

  // Вычисляем позиции на основе текущей ширины
  // Layout: 3 ряда (5 блоков, 5 блоков, 5 блоков)
  const positions = useMemo(() => {
    return createPositions(calculateStartCol);
  }, [calculateStartCol]);

  const startColumn =
    positions.length > 0 ? positions[0] % GRID_COLUMNS : CENTER_COLUMN_OFFSET;

  // Максимальное количество колонок в ряду
  const clusterColumns = CLUSTER_COLUMNS;

  // Используем мобильные размеры для расчетов, если это мобильный layout
  const cellSize = isMobileLayout ? MOBILE_CELL_SIZE_PX : CELL_SIZE_PX;
  const gridGap = isMobileLayout ? MOBILE_GRID_GAP_PX : GRID_GAP_PX;
  const columnStride = cellSize + gridGap;
  const gridWidth = GRID_COLUMNS * cellSize + (GRID_COLUMNS - 1) * gridGap;
  const gridHeight = GRID_ROWS * cellSize + (GRID_ROWS - 1) * gridGap;

  const clusterWidth =
    clusterColumns * cellSize + (clusterColumns - 1) * gridGap;
  const clusterCenter = startColumn * columnStride + clusterWidth / 2;

  // Центрируем grid через translate
  const translate =
    viewportWidth >= gridWidth ? 0 : viewportWidth / 2 - clusterCenter;

  const grid = useMemo<(Technology | null)[]>(() => {
    const template: (Technology | null)[] = new Array(
      GRID_COLUMNS * GRID_ROWS
    ).fill(null);

    technologies.forEach((tech, index) => {
      if (index < positions.length) {
        template[positions[index]] = tech;
      }
    });

    return template;
  }, [positions, technologies]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: `calc(${gridHeight}px + 12rem)`,
      }}
    >
      {/* Градиентные тени по краям */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Левая тень */}
        {!isMobileLayout && viewportWidth >= 800 && (
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background via-background/80 to-transparent" />
        )}
        {/* Правая тень */}
        {!isMobileLayout && viewportWidth >= 800 && (
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background via-background/80 to-transparent" />
        )}
        {/* Верхняя тень */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent" />
        {/* Нижняя тень */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Фиксированная сетка — двигаются только технологии */}
      <div
        ref={containerRef}
        className={`relative flex overflow-visible ${viewportWidth >= gridWidth ? "justify-center" : "justify-start"}`}
      >
        <div
          className="relative tech-grid"
          style={{
            width: `${gridWidth}px`,
            transform:
              viewportWidth >= gridWidth
                ? undefined
                : `translateX(${translate}px)`,
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
                  width: isMobileLayout
                    ? `${MOBILE_CELL_SIZE_PX}px`
                    : `${CELL_SIZE_PX}px`,
                  height: isMobileLayout
                    ? `${MOBILE_CELL_SIZE_PX}px`
                    : `${CELL_SIZE_PX}px`,
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
                      size={isMobileLayout ? 32 : 40}
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
          grid-template-columns: repeat(
            ${GRID_COLUMNS},
            ${isMobileLayout ? MOBILE_CELL_SIZE_PX : CELL_SIZE_PX}px
          );
          column-gap: ${isMobileLayout ? MOBILE_GRID_GAP_PX : GRID_GAP_PX}px;
          row-gap: ${isMobileLayout ? MOBILE_GRID_GAP_PX : GRID_GAP_PX}px;
          padding-top: 6rem;
          padding-bottom: 6rem;
          margin: 0 auto;
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

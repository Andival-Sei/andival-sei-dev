"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";

import type { Technology } from "@/data/technologies";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface TechGridProps {
  technologies: Technology[];
}

const GRID_COLUMNS = 24;
const GRID_ROWS = 5;
const CELL_SIZE_PX = 96;
const GRID_GAP_PX = 24;
const CLUSTER_COLUMNS = 5;
const GRID_WIDTH_PX =
  GRID_COLUMNS * CELL_SIZE_PX + (GRID_COLUMNS - 1) * GRID_GAP_PX;

const MOBILE_CELL_SIZE_PX = 72;
const MOBILE_GRID_GAP_PX = 16;
const COMPACT_BREAKPOINT = 768;

const createPositions = (startColumn: number) =>
  [
    GRID_COLUMNS + startColumn,
    GRID_COLUMNS + startColumn + 1,
    GRID_COLUMNS + startColumn + 2,
    GRID_COLUMNS + startColumn + 3,
    GRID_COLUMNS + startColumn + 4,
    GRID_COLUMNS * 2 + startColumn,
    GRID_COLUMNS * 2 + startColumn + 1,
    GRID_COLUMNS * 2 + startColumn + 2,
    GRID_COLUMNS * 2 + startColumn + 3,
    GRID_COLUMNS * 2 + startColumn + 4,
    GRID_COLUMNS * 3 + startColumn,
    GRID_COLUMNS * 3 + startColumn + 1,
    GRID_COLUMNS * 3 + startColumn + 2,
    GRID_COLUMNS * 3 + startColumn + 3,
    GRID_COLUMNS * 3 + startColumn + 4,
  ] as const;

const CENTER_COLUMN_OFFSET = Math.floor((GRID_COLUMNS - CLUSTER_COLUMNS) / 2);

export function TechStackGrid({ technologies }: TechGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
  });
  const [viewportWidth, setViewportWidth] = useState<number>(GRID_WIDTH_PX);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const resolveWidth = () => {
      const windowWidth = window.innerWidth;
      const parentWidth = containerRef.current?.parentElement?.getBoundingClientRect().width;
      const selfWidth = containerRef.current?.getBoundingClientRect().width;
      const measuredWidth = parentWidth ?? selfWidth ?? windowWidth;
      return Math.min(windowWidth, measuredWidth);
    };

    const handleResize = () => {
      const nextWidth = resolveWidth();
      setViewportWidth((prev) => (prev === nextWidth ? prev : nextWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => handleResize());
      const target = containerRef.current.parentElement ?? containerRef.current;
      resizeObserver.observe(target);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [isInView]);

  const isCompactLayout = viewportWidth < COMPACT_BREAKPOINT;

  const cellSize = isCompactLayout ? MOBILE_CELL_SIZE_PX : CELL_SIZE_PX;
  const gridGap = isCompactLayout ? MOBILE_GRID_GAP_PX : GRID_GAP_PX;
  const columnStride = cellSize + gridGap;
  const gridWidth = GRID_COLUMNS * cellSize + (GRID_COLUMNS - 1) * gridGap;
  const gridHeight = GRID_ROWS * cellSize + (GRID_ROWS - 1) * gridGap;

  const calculateStartCol = useMemo(() => {
    if (!isInView || isCompactLayout) {
      return CENTER_COLUMN_OFFSET;
    }

    if (viewportWidth >= gridWidth) {
      return CENTER_COLUMN_OFFSET;
    }

    const visibleColumns = Math.floor(viewportWidth / columnStride);
    const shift = Math.max(0, Math.floor((GRID_COLUMNS - visibleColumns) / 2));
    const maxStartCol = GRID_COLUMNS - CLUSTER_COLUMNS;

    return Math.min(CENTER_COLUMN_OFFSET + shift, maxStartCol);
  }, [columnStride, gridWidth, isCompactLayout, isInView, viewportWidth]);

  const positions = useMemo(() => {
    if (!isInView || isCompactLayout) {
      return [] as number[];
    }

    return [...createPositions(calculateStartCol)];
  }, [calculateStartCol, isCompactLayout, isInView]);

  const startColumn =
    positions.length > 0 ? positions[0] % GRID_COLUMNS : CENTER_COLUMN_OFFSET;
  const clusterWidth =
    CLUSTER_COLUMNS * cellSize + (CLUSTER_COLUMNS - 1) * gridGap;
  const clusterCenter = startColumn * columnStride + clusterWidth / 2;
  const translate =
    viewportWidth >= gridWidth ? 0 : viewportWidth / 2 - clusterCenter;

  const grid = useMemo<(Technology | null)[]>(() => {
    if (!isInView || isCompactLayout) {
      return [];
    }

    const template: (Technology | null)[] = new Array(
      GRID_COLUMNS * GRID_ROWS
    ).fill(null);

    technologies.forEach((tech, index) => {
      if (index < positions.length) {
        template[positions[index]] = tech;
      }
    });

    return template;
  }, [isCompactLayout, isInView, positions, technologies]);

  const animationClasses = prefersReducedMotion
    ? "opacity-100"
    : isInView
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6";

  const animationStyles = prefersReducedMotion
    ? undefined
    : { transition: "opacity 600ms ease, transform 600ms ease" };

  if (isCompactLayout) {
    return (
      <div
        ref={sectionRef}
        className={cn(
          "relative w-full overflow-hidden",
          animationClasses
        )}
        style={animationStyles}
      >
        <div className="-mx-4 overflow-x-auto pb-6">
          <ul className="flex min-w-full gap-3 px-4" aria-label="Технологии">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <li key={tech.id}>
                  <div
                    className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-4 py-3 text-center shadow-sm backdrop-blur-sm"
                    style={{
                      boxShadow: `0 10px 30px -12px ${tech.color}33`,
                    }}
                  >
                    <Icon className="h-8 w-8" style={{ color: tech.color }} />
                    <span className="text-sm font-medium text-muted-foreground">
                      {tech.name}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={cn("relative w-full overflow-hidden", animationClasses)}
      style={animationStyles}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      >
        {viewportWidth >= 800 && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background via-background/80 to-transparent" />
          </>
        )}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative flex overflow-visible transition-transform duration-700 ease-out",
          viewportWidth >= gridWidth ? "justify-center" : "justify-start"
        )}
        style={{
          transform:
            viewportWidth >= gridWidth
              ? undefined
              : `translateX(${translate}px)`,
        }}
      >
        <div
          className="relative"
          style={{
            width: `${gridWidth}px`,
            minHeight: `calc(${gridHeight}px + 12rem)`,
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${cellSize}px)`,
              columnGap: `${gridGap}px`,
              rowGap: `${gridGap}px`,
              paddingTop: "6rem",
              paddingBottom: "6rem",
            }}
          >
            {grid.map((tech, index) => {
              const row = Math.floor(index / GRID_COLUMNS);
              const col = index % GRID_COLUMNS;
              const isOffsetRow = row % 2 === 1;
              const offset = isOffsetRow ? 0.5 : 0;

              return (
                <div
                  key={tech ? tech.id : `empty-${index}`}
                  className={cn(
                    "tech-cell flex items-center justify-center rounded-lg border border-border/60 bg-muted/10 transition-transform duration-300 ease-in-out",
                    tech ? "cursor-pointer group" : "tech-cell--empty cursor-default"
                  )}
                  style={{
                    gridColumn: `${col + 1} / ${col + 2}`,
                    gridRow: `${row + 1} / ${row + 2}`,
                    transform: `translateX(${offset * 100}%)`,
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    ...(tech
                      ? ({ "--glow-color": tech.color } as CSSProperties)
                      : undefined),
                    ...(!tech
                      ? ({ "--offset": `${offset * 100}%` } as CSSProperties)
                      : undefined),
                  }}
                >
                  {tech && (
                    <>
                      <tech.icon
                        size={40}
                        className="relative z-10 transition-all duration-300 ease-in-out"
                        style={{ color: tech.color }}
                      />
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/20 bg-popover px-3 py-1 text-sm text-popover-foreground opacity-0 shadow-sm transition-opacity duration-200 ease-in-out group-hover:opacity-100">
                        {tech.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .tech-cell {
          box-shadow: 0 0 0 0 transparent;
          transition: all 300ms ease-in-out,
            box-shadow 150ms ease-in !important;
        }

        .tech-cell.group:hover {
          box-shadow: 0 0 10px 3px var(--glow-color),
            0 0 17px 5px var(--glow-color),
            0 0 24px 7px var(--glow-color) !important;
        }

        .tech-cell.group:not(:hover) {
          transition: all 300ms ease-in-out,
            box-shadow 800ms ease-out !important;
        }

        .tech-cell--empty:hover {
          transform: translateX(var(--offset, 0%)) scale(0.85) !important;
          transition: transform 150ms ease-in !important;
        }

        .tech-cell--empty:not(:hover) {
          transition: transform 800ms ease-out !important;
        }
      `}</style>
    </div>
  );
}

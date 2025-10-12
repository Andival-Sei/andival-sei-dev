/**
 * Типы и интерфейсы для страницы Lab
 */

// Интерфейс для частицы в анимации
export interface Particle {
  x: number; // текущая позиция X
  y: number; // текущая позиция Y
  vx: number; // скорость по X
  vy: number; // скорость по Y
  size: number; // размер частицы
}

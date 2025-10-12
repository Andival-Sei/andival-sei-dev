"use client";

import { useEffect, useRef } from "react";
import type { Particle } from "@/types/lab";

/**
 * Компонент минималистичной анимации частиц для страницы Lab
 * Плавающие светящиеся частицы с текстом "Скоро здесь что-то появится"
 */
export function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Настройка размера canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Константы
    const PARTICLE_COUNT = 100;
    const PARTICLE_SIZE = 2;
    const MAX_SPEED = 0.5;

    // Инициализация частиц
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * MAX_SPEED,
          vy: (Math.random() - 0.5) * MAX_SPEED,
          size: PARTICLE_SIZE + Math.random() * 1.5,
        });
      }
    };

    // Получение цвета primary из CSS переменной
    const getPrimaryColor = () => {
      const styles = getComputedStyle(document.documentElement);
      const primaryColor = styles.getPropertyValue("--primary").trim();

      // Парсинг oklch цвета
      // Формат: oklch(l c h)
      if (primaryColor.startsWith("oklch")) {
        // Для упрощения используем emerald цвет напрямую
        const isDark = document.documentElement.classList.contains("dark");
        return isDark
          ? "rgba(52, 211, 153, 0.6)" // emerald-400
          : "rgba(34, 197, 94, 0.6)"; // emerald-600
      }

      return "rgba(34, 197, 94, 0.6)"; // fallback
    };

    // Анимационный цикл
    const animate = () => {
      // Очистка canvas с легким эффектом следа
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const primaryColor = getPrimaryColor();

      // Обновление и отрисовка частиц
      particlesRef.current.forEach((particle) => {
        // Простое движение
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Отскок от границ
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Отрисовка частицы с свечением
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );

        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Продолжение анимации
      animationRef.current = requestAnimationFrame(animate);
    };

    // Запуск анимации
    initParticles();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Canvas с фоновой анимацией */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-background"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Текстовый контент поверх canvas */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-center animate-fadeIn">
          Скоро здесь что-то появится
        </h1>
      </div>
    </div>
  );
}

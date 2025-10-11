"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/**
 * Компонент переключателя тем с тремя положениями:
 * - System (системная тема по умолчанию)
 * - Light (светлая тема)
 * - Dark (тёмная тема)
 */
export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect выполняется только на клиенте,
  // предотвращая hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Возвращаем null пока компонент не смонтирован на клиенте
  if (!mounted) {
    return null;
  }

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      className="border rounded-lg p-1"
    >
      <ToggleGroupItem
        value="light"
        aria-label="Светлая тема"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="system"
        aria-label="Системная тема"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        aria-label="Тёмная тема"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

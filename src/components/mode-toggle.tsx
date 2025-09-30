'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import styles from './mode-toggle.module.scss';

export default function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  // Отложенное вычисление, чтобы избежать несоответствий между SSR и клиентом
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      // До монтирования не добавляем active-класс, чтобы разметка совпала с SSR
      className={cn(styles.toggle, isDark ? styles.active : undefined)}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className={styles.icon} aria-hidden>
        <Sun />
      </span>
      <span className={styles.knob} />
      <span className={styles.icon} aria-hidden>
        <Moon />
      </span>
    </button>
  );
}

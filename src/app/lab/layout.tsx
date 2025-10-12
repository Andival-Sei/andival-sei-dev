import type { Metadata } from "next";

/**
 * Метаданные для страницы Lab
 */
export const metadata: Metadata = {
  title: "Lab | Andival-Sei",
  description:
    "Лаборатория экспериментов - страница с интерактивными анимациями и будущими проектами",
  openGraph: {
    title: "Lab | Andival-Sei",
    description: "Лаборатория экспериментов - скоро здесь что-то появится",
  },
};

/**
 * Layout для страницы Lab
 */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}

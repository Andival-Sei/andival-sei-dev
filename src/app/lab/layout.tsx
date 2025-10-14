import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лаборатория",
  description: "Эксперименты, анимации и интерактивные компоненты",
  openGraph: {
    title: "Лаборатория | Andival-Sei",
  },
  alternates: {
    canonical: "/lab",
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Портфолио проектов: веб-приложения на React, Next.js, TypeScript",
  openGraph: {
    title: "Проекты | Andival-Sei",
    description: "Мои проекты и разработки",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

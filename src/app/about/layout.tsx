import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обо мне | Andival-Sei",
  description:
    "Frontend разработчик, специализирующийся на React и Next.js. Узнайте больше о моем опыте, навыках и интересах.",
  openGraph: {
    title: "Обо мне | Andival-Sei",
    description:
      "Frontend разработчик, специализирующийся на React и Next.js. Узнайте больше о моем опыте, навыках и интересах.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Мой опыт, навыки и интересы. Frontend разработчик с фокусом на React и Next.js.",
  openGraph: {
    title: "Обо мне | Andival-Sei",
    description: "Мой опыт, навыки и интересы в веб-разработке",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

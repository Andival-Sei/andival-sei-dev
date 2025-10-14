import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { env } from "@/lib/env";
import { getPersonSchema, getWebsiteSchema } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Andival-Sei | Frontend разработчик",
    template: "%s | Andival-Sei",
  },
  description:
    "Портфолио Frontend разработчика. React, Next.js, TypeScript, Tailwind CSS. Создаю современные веб-приложения.",
  keywords: [
    "frontend",
    "react",
    "nextjs",
    "typescript",
    "tailwind css",
    "web development",
    "разработка",
    "портфолио",
  ],
  authors: [{ name: "Andival-Sei" }],
  creator: "Andival-Sei",
  publisher: "Andival-Sei",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: env.siteName,
    title: "Andival-Sei | Frontend разработчик",
    description: "Портфолио Frontend разработчика. React, Next.js, TypeScript.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andival-Sei Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andival-Sei | Frontend разработчик",
    description: "Портфолио Frontend разработчика",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  verification: {
    google: env.googleVerification,
    yandex: env.yandexVerification,
  },
  alternates: {
    canonical: "/",
  },
};

// Viewport экспортируем отдельно (современная практика Next.js 15)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

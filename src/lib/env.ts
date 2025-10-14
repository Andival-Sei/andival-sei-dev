export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://andival-sei.vercel.app",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Andival-Sei Portfolio",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  github: process.env.NEXT_PUBLIC_GITHUB || "",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM || "",
  vk: process.env.NEXT_PUBLIC_VK || "",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
} as const;

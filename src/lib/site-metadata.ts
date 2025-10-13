import type { Metadata } from "next";

export const siteMetadata = {
  name: "Andival-Sei",
  author: "Кирилл Андиваль",
  title: "Andival-Sei — Frontend-разработчик",
  description:
    "Портфолио фронтенд-разработчика Кирилла Андиваль: современные веб-приложения на React, Next.js и TypeScript.",
  url: "https://andival-sei.dev",
  locale: "ru_RU",
  keywords: [
    "Andival-Sei",
    "Frontend",
    "React",
    "Next.js",
    "TypeScript",
    "Портфолио разработчика",
  ],
  ogImage: "/images/about/myphoto.jpg",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: "%s | Andival-Sei",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.name,
    images: [
      {
        url: new URL(siteMetadata.ogImage, siteMetadata.url).toString(),
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [new URL(siteMetadata.ogImage, siteMetadata.url).toString()],
  },
  alternates: {
    canonical: siteMetadata.url,
  },
};

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  images?: string[];
}

export function createMetadata({
  title,
  description,
  path,
  images,
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = new URL(path, siteMetadata.url).toString();
  const resolvedImages = images?.map((image) =>
    image.startsWith("http")
      ? image
      : new URL(image, siteMetadata.url).toString()
  );

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | ${siteMetadata.name}`,
      description,
      url: canonicalUrl,
      images:
        resolvedImages?.map((url) => ({
          url,
          width: 1200,
          height: 630,
          alt: title,
        })) ?? baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | ${siteMetadata.name}`,
      description,
      images: resolvedImages ?? baseMetadata.twitter?.images,
    },
  };
}

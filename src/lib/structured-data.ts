import { env } from "./env";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andival-Sei",
    url: env.siteUrl,
    jobTitle: "Frontend Developer",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
    ],
    sameAs: [env.github, env.telegram, env.vk].filter(Boolean),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: env.siteName,
    url: env.siteUrl,
    description: "Портфолио Frontend разработчика",
    author: {
      "@type": "Person",
      name: "Andival-Sei",
    },
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${env.siteUrl}${item.url}`,
    })),
  };
}

export function getProjectSchema(project: {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Andival-Sei",
    },
    keywords: project.technologies.join(", "),
    ...(project.demoUrl && { url: project.demoUrl }),
    ...(project.githubUrl && {
      codeRepository: project.githubUrl,
    }),
  };
}

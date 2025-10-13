import type { Metadata } from "next";

import { ProjectsPageContent } from "@/components/projects/projects-page-content";
import { createMetadata, siteMetadata } from "@/lib/site-metadata";
import {
  getAllTechnologies,
  getProjectTypes,
  projects,
} from "@/data/projects";

export const metadata: Metadata = createMetadata({
  title: "Проекты",
  description:
    "Полная подборка моих проектов: учебные, pet и коммерческие работы на React, Next.js и TypeScript.",
  path: "/projects",
  images: ["/images/about/myphoto.jpg"],
});

export default function ProjectsPage() {
  const allTechnologies = getAllTechnologies();
  const projectTypes = getProjectTypes();

  const projectCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Проекты Andival-Sei",
    description:
      "Коллекция проектов фронтенд-разработчика Кирилла Андиваль с использованием React, Next.js и TypeScript.",
    url: new URL("/projects", siteMetadata.url).toString(),
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.longDescription,
      datePublished: project.date,
      url: project.liveUrl,
      sameAs: project.githubUrl,
      programmingLanguage: project.technologies,
    })),
  } as const;

  return (
    <>
      <ProjectsPageContent
        projects={projects}
        allTechnologies={allTechnologies}
        projectTypes={projectTypes}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectCollectionJsonLd),
        }}
      />
    </>
  );
}

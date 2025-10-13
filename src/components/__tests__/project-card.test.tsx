import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

describe("ProjectCard", () => {
  const project = projects[0];

  it("рендерит карточку в grid-варианте", () => {
    render(<ProjectCard project={project} variant="grid" />);

    expect(
      screen.getByRole("heading", { level: 3, name: project.title })
    ).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(project.title, "i") })
    ).toHaveAttribute(
      "href",
      `/projects/${project.id}`
    );
  });

  it("отображает все технологии и ссылки в featured-варианте", () => {
    render(<ProjectCard project={project} variant="featured" />);

    project.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });

    expect(screen.getByRole("link", { name: /посмотреть/i })).toHaveAttribute(
      "href",
      project.liveUrl
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      project.githubUrl
    );
  });
});

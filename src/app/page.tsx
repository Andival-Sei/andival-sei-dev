import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import TechStack from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <FeaturedProjects />
    </main>
  );
}

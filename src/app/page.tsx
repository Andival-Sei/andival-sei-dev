import { Hero } from "@/components/sections/hero";
import TechStack from "@/components/sections/tech-stack";
import { FeaturedProjects } from "@/components/sections/featured-projects";

export default function Home() {
  return (
    <div>
      <Hero />
      <TechStack />
      <FeaturedProjects />
    </div>
  );
}

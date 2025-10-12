import { Hero } from "@/components/sections/hero";
import TechStack from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      {/* TODO: Добавить секцию Featured Projects */}
    </main>
  );
}

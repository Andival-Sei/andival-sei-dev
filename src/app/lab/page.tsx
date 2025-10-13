import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { createMetadata } from "@/lib/site-metadata";

const ParticleAnimation = dynamic(
  () =>
    import("@/components/lab/particle-animation").then((mod) => ({
      default: mod.ParticleAnimation,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Загрузка лаборатории...
      </div>
    ),
  }
);

export const metadata: Metadata = createMetadata({
  title: "Lab",
  description:
    "Экспериментальная лаборатория: превью идей, прототипов и визуальных эффектов.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <div className="min-h-[70vh]">
      <ParticleAnimation />
    </div>
  );
}

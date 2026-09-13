import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ProjectDetail } from "@/components/project-detail";

export const metadata: Metadata = { title: "Research project · ResearchVault" };

export default async function ProjectPage({ params }: { params: Promise<{ id: string; }>; }) {
  const { id } = await params;
  return <AppShell activeNav="Projects">
    <ProjectDetail key={id} id={id} />
  </AppShell>;
}

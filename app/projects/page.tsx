import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ProjectsView } from "@/components/projects-view";

export const metadata: Metadata = { title: "Research projects · ResearchVault" };

export default function ProjectsPage() {
  return <AppShell activeNav="Projects">
    <ProjectsView />
  </AppShell>;
}

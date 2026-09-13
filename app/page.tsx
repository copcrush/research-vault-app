import { AppShell } from "@/components/app-shell";
import { KnowledgeLibrary } from "@/components/knowledge-library";
import { ResearchWorkspace } from "@/components/research-workspace";

export default function Home() {
  return (
    <AppShell>
      <ResearchWorkspace />
      <KnowledgeLibrary />
    </AppShell>
  );
}

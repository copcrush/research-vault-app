import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ResearchChat } from "@/components/research-chat";
export const metadata: Metadata = { title: "Research AI · ResearchVault" };
export default function Page() {
  return <AppShell activeNav="Research AI">
    <ResearchChat />
  </AppShell>;
}

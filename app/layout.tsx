import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workspace overview · ResearchVault",
  description:
    "ResearchVault: a research project workspace built with Next.js, TypeScript, Go, and PostgreSQL. Explore the interactive portfolio demo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

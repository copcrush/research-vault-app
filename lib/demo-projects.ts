import type { Project, ProjectInput, ProjectStatus } from "./projects-api";

// Public portfolio data only. This module never contacts the Go API.
const key = "researchvault.portfolio.projects.v1";
const date = "2026-01-15T09:00:00.000Z";
const samples: Project[] = [
  { id: "12a47281-1838-4c60-9753-2ddbb4634781", name: "Human-centered AI adoption", description: "Synthetic sample: explore how researchers evaluate and adopt AI tools while keeping people in control.", status: "active", created_at: date, updated_at: date, archived_at: null },
  { id: "bd1ff114-132d-416f-b751-a3e083635fcc", name: "Trust in digital research libraries", description: "Synthetic sample: investigate how source clarity and accessible design support research workflows.", status: "active", created_at: date, updated_at: date, archived_at: null },
  { id: "032aa948-adfe-49e6-b209-880c2cbd8a26", name: "Exploratory literature review", description: "Synthetic archived example. Finished projects retain their context and become read-only.", status: "archived", created_at: date, updated_at: date, archived_at: date },
];

function read(): Project[] {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return structuredClone(samples);
    const rows: unknown = JSON.parse(saved);
    if (!Array.isArray(rows) || !rows.every(p => p && typeof p.id === "string" && typeof p.name === "string" && typeof p.description === "string" && ["active", "archived"].includes(p.status) && Number.isFinite(Date.parse(p.created_at)) && Number.isFinite(Date.parse(p.updated_at)) && (p.archived_at === null || Number.isFinite(Date.parse(p.archived_at))))) throw new Error();
    return rows as Project[];
  } catch {
    throw new Error("Demo storage is unavailable or invalid. Enable browser storage or reset the demo.");
  }
}
function write(rows: Project[]) {
  try { localStorage.setItem(key, JSON.stringify(rows)); }
  catch { throw new Error("Unable to save this demo in your browser. Check available browser storage."); }
}
function validate(input: ProjectInput): ProjectInput {
  const name = input.name.trim();
  const description = input.description.trim();
  if (!name || Array.from(name).length > 120 || name.includes("\0")) throw new Error("Project name must contain 1–120 characters.");
  if (Array.from(description).length > 5000 || description.includes("\0")) throw new Error("Description must contain at most 5000 characters.");
  return { name, description };
}
function find(rows: Project[], id: string): Project {
  const project = rows.find(p => p.id === id);
  if (!project) throw Object.assign(new Error("Project not found"), { status: 404, code: "PROJECT_NOT_FOUND" });
  return project;
}
export const demoProjects = {
  async list(status: ProjectStatus) { return { projects: read().filter(p => p.status === status).sort((a, b) => b.created_at.localeCompare(a.created_at)) }; },
  async get(id: string) { return find(read(), id); },
  async create(input: ProjectInput) {
    const rows = read();
    if (rows.length >= 100) throw new Error("This demo allows 100 projects. Reset the demo to start again.");
    const now = new Date().toISOString();
    const project: Project = { ...validate(input), id: crypto.randomUUID(), status: "active", created_at: now, updated_at: now, archived_at: null };
    write([project, ...rows]);
    return project;
  },
  async update(id: string, input: ProjectInput) {
    const rows = read();
    const project = find(rows, id);
    if (project.status === "archived") throw new Error("Archived projects are read-only");
    Object.assign(project, validate(input), { updated_at: new Date().toISOString() });
    write(rows);
    return project;
  },
  async archive(id: string) {
    const rows = read();
    const project = find(rows, id);
    if (project.status !== "archived") {
      const now = new Date().toISOString();
      Object.assign(project, { status: "archived", archived_at: now, updated_at: now });
      write(rows);
    }
    return project;
  },
};
export function resetDemoProjects() { write(structuredClone(samples)); }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projectsApi, projectError, formatProjectDate, type Project, type ProjectStatus } from "@/lib/projects-api";
import { Icon } from "./icon";
import { ProjectForm } from "./project-form";

function ProjectList({ status }: { status: ProjectStatus; }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    projectsApi.list(status, controller.signal)
      .then(result => { if (!controller.signal.aborted) setProjects(result.projects); })
      .catch(error => { if (!controller.signal.aborted) setError(projectError(error)); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [status, attempt]);

  if (loading) return <div className="project-state" role="status">
    <Icon name="clock" size={24} />
    <h2>Loading projects…</h2>
    <p>Connecting to your research workspace.</p>
  </div>;
  if (error) return <div className="project-state">
    <p className="api-error" role="alert">{error}</p>
    <button className="secondary-button" onClick={() => { setLoading(true); setError(""); setAttempt(value => value + 1); }}>Try again</button>
  </div>;
  if (projects.length === 0) return <div className="project-state">
    <span className="empty-project-icon">
      <Icon name="folder" size={28} />
    </span>
    <h2>{status === "active" ? "No research projects yet." : "No archived projects."}</h2>
    <p>{status === "active" ? "Create a project to start organizing your research." : "Projects you archive will remain available here."}</p>
  </div>;
  return <ul className="project-list" aria-label={`${status} projects`}>{projects.map(project => <li key={project.id}>
    <Link className="project-row" href={`/projects/${project.id}`}>
      <span className="project-icon">
        <Icon name="folder" size={22} />
      </span>
      <div className="project-row-copy">
        <div className="project-row-title">
          <h2>{project.name}</h2>
          <span className={`project-status ${project.status}`}>{project.status}</span>
        </div>
        <p>{project.description || "No description yet."}</p>
        <span className="project-dates">Updated {formatProjectDate(project.updated_at)}</span>
      </div>
      <Icon name="chevron" size={17} />
    </Link>
  </li>)}</ul>;
}

export function ProjectsView() {
  const router = useRouter();
  const [status, setStatus] = useState<ProjectStatus>("active");
  const [creating, setCreating] = useState(false);
  const newButton = useRef<HTMLButtonElement>(null);
  return (
    <>
      <main id="workspace" className="research-workspace projects-workspace" tabIndex={-1}>
        <div className="breadcrumb">
          <Link href="/">Workspace</Link>
          <Icon name="chevron" size={12} />Projects</div>
        <div className="projects-heading">
          <div>
            <h1>Research projects</h1>
            <p>A focused space for every research question.</p>
          </div>
          <button ref={newButton} className="primary-button" disabled={creating} onClick={() => setCreating(true)}>
            <Icon name="plus" size={16} />New Project</button>
        </div>
        {creating ? <ProjectForm onCancel={() => { setCreating(false); requestAnimationFrame(() => newButton.current?.focus()); }} onSave={async input => { const project = await projectsApi.create(input); router.push(`/projects/${project.id}`); }} /> : <>
          <div className="project-filters" role="group" aria-label="Project status">
            <button aria-pressed={status === "active"} onClick={() => setStatus("active")}>Active projects</button>
            <button aria-pressed={status === "archived"} onClick={() => setStatus("archived")}>Archived</button>
          </div>
          <ProjectList key={status} status={status} />
        </>}
        <footer className="workspace-footer">
          <Icon name="shield" size={15} />
          <p>Phase 2 · Projects are saved locally. Authentication and confidential-data protection are not yet available.</p>
        </footer>
      </main>
      <aside className="knowledge-panel project-context-panel" aria-label="About research projects">
        <div className="library-heading">
          <Icon name="folder" size={20} />
          <h2>Room for your research</h2>
        </div>
        <p className="context-description">Start with a project. Give it a purpose. Build a focused body of knowledge over time.</p>
        <div className="source-principle">
          <Icon name="book" size={21} />
          <h3>One project, one context.</h3>
          <p>Documents and AI will eventually work within the project you select.</p>
          <span className="tiny-badge">Documents & AI · Coming soon</span>
        </div>
        <div className="source-principle">
          <Icon name="clock" size={21} />
          <h3>Archive, don’t erase.</h3>
          <p>Finished projects stay available in the Archived view. Their information is preserved.</p>
        </div>
      </aside>
    </>
  );
}

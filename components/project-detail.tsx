"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ApiError, projectsApi, projectError, formatProjectDate, type Project } from "@/lib/projects-api";
import { Icon } from "./icon";
import { ProjectForm } from "./project-form";

export function ProjectDetail({ id }: { id: string; }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [missing, setMissing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const [attempt, setAttempt] = useState(0);
  const editButton = useRef<HTMLButtonElement>(null);
  const archiveButton = useRef<HTMLButtonElement>(null);
  const archiveHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (confirmArchive) archiveHeading.current?.focus(); }, [confirmArchive]);
  useEffect(() => {
    const controller = new AbortController();
    projectsApi.get(id, controller.signal)
      .then(project => { if (!controller.signal.aborted) setProject(project); })
      .catch(error => { if (!controller.signal.aborted) { setMissing(error instanceof ApiError && error.status === 404); setLoadError(projectError(error)); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, attempt]);

  async function archive() {
    if (archiving) return;
    setArchiving(true); setActionError(""); setNotice("");
    try { setProject(await projectsApi.archive(id)); setConfirmArchive(false); setNotice("Project archived. Its information has been preserved."); }
    catch (error) { setActionError(projectError(error)); }
    finally { setArchiving(false); }
  }

  return (
    <>
      <main id="workspace" className="research-workspace projects-workspace" tabIndex={-1}>
        <div className="breadcrumb">
          <Link href="/projects">Projects</Link>
          <Icon name="chevron" size={12} />
          <span>{project?.name ?? "Project"}</span>
        </div>
        {loading ? <div className="project-state" role="status">
          <h1>Loading project…</h1>
        </div> : loadError ? <div className="project-state">
          <h1>{missing ? "Project not found" : "Unable to load project"}</h1>
          <p role="alert">{loadError}</p>
          <Link href="/projects" className="secondary-button">Back to projects</Link>{!missing && <button className="secondary-button" onClick={() => { setLoading(true); setLoadError(""); setAttempt(value => value + 1); }}>Try again</button>}</div> : project && <>
            <div className="projects-heading project-detail-heading">
              <div>
                <span className={`project-status ${project.status}`}>{project.status}</span>
                <h1>{project.name}</h1>
              </div>{project.status === "active" && <div className="detail-actions">
                <button ref={editButton} className="secondary-button" disabled={editing || confirmArchive} onClick={() => { setEditing(true); setNotice(""); }}>Edit project</button>
                <button ref={archiveButton} className="secondary-button" disabled={editing || confirmArchive} onClick={() => { setConfirmArchive(true); setActionError(""); }}>Archive</button>
              </div>}</div>
            <p role="status" className="success-message">{notice}</p>
            {project.status === "archived" && <div className="archive-notice">
              <Icon name="clock" size={19} />
              <p>This project is archived and read-only. Its name, description, and history timestamps are preserved.</p>
            </div>}
            {editing ? <ProjectForm initial={project} onCancel={() => { setEditing(false); requestAnimationFrame(() => editButton.current?.focus()); }} onSave={async input => { const updated = await projectsApi.update(id, input); setProject(updated); setEditing(false); setNotice("Project changes saved."); }} /> : <section className="project-description" aria-labelledby="description-heading">
              <h2 id="description-heading">Research purpose</h2>
              <p>{project.description || "No description yet. Add one to describe what you’re exploring."}</p>
            </section>}
            {confirmArchive && <section className="archive-confirmation" aria-labelledby="archive-title">
              <h2 id="archive-title" tabIndex={-1} ref={archiveHeading}>Archive this project?</h2>
              <p>It will move to Archived and become read-only. No project data will be deleted. Restoring projects is not available in this phase.</p>{actionError && <p role="alert" className="api-error">{actionError}</p>}<div className="form-actions">
                <button className="secondary-button" disabled={archiving} onClick={() => { setConfirmArchive(false); requestAnimationFrame(() => archiveButton.current?.focus()); }}>Cancel</button>
                <button className="primary-button" disabled={archiving} onClick={archive}>{archiving ? "Archiving…" : "Archive project"}</button>
              </div>
            </section>}
            <dl className="project-metadata">
              <div>
                <dt>Created</dt>
                <dd>{formatProjectDate(project.created_at)}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{formatProjectDate(project.updated_at)}</dd>
              </div>{project.archived_at && <div>
                <dt>Archived</dt>
                <dd>{formatProjectDate(project.archived_at)}</dd>
              </div>}</dl>
            <section className="project-future" aria-labelledby="future-heading">
              <Icon name="spark" size={22} />
              <h2 id="future-heading">Your research starts here.</h2>
              <p>This project is saved. Research AI supports planning conversations; document-grounded answers and file management are still future work.</p>
              <div className="future-controls">
                <button disabled>
                  <Icon name="file" size={17} />Add document <span>Soon</span>
                </button>
                <Link href="/research-ai" className="secondary-button">
                  <Icon name="spark" size={17} />Open Research AI</Link>
              </div>
            </section>
          </>}
        <footer className="workspace-footer">
          <Icon name="shield" size={15} />
          <p>Phase 2 · Local development only. Authentication and access controls are not implemented.</p>
        </footer>
      </main>
      <aside className="knowledge-panel project-context-panel" aria-label="Project knowledge">
        <div className="library-heading">
          <Icon name="book" size={20} />
          <h2>Project knowledge</h2>
        </div>
        <div className="sources-empty">
          <span className="sources-icon">
            <Icon name="file" size={25} />
          </span>
          <h3>Documents belong<br />with their research.</h3>
          <p>Document management is not available in Phase 2. No sample library is attached to this project.</p>
          <span className="tiny-badge">Documents & citations · Coming soon</span>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { projectError, type ProjectInput } from "@/lib/projects-api";

type Props = {
  initial?: ProjectInput;
  onSave: (input: ProjectInput) => Promise<void>;
  onCancel: () => void;
};

export function ProjectForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => { nameInput.current?.focus(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const input = { name: name.trim(), description: description.trim() };
    if (!input.name || Array.from(input.name).length > 120) {
      setError("Project name must contain 1–120 characters.");
      nameInput.current?.focus();
      return;
    }
    if (Array.from(input.description).length > 5000) {
      setError("Description must contain at most 5000 characters.");
      return;
    }
    setBusy(true);
    setError("");
    try { await onSave(input); }
    catch (error) {
      setError(projectError(error) + (!initial ? " If the result is uncertain, check the project list before creating again." : ""));
      setBusy(false);
    }
  }

  return (
    <form className="project-form" onSubmit={submit} aria-labelledby="project-form-title" aria-busy={busy}>
      <h2 id="project-form-title">{initial ? "Edit project" : "New research project"}</h2>
      <p>Give your research a name and a clear purpose.</p>
      <label htmlFor="project-name">Project name <span aria-hidden="true">*</span>
      </label>
      <input ref={nameInput} id="project-name" name="name" value={name} onChange={event => setName(event.target.value)} required disabled={busy} aria-describedby="name-help project-form-error" placeholder="e.g. Human-centered AI adoption" />
      <span id="name-help" className="field-help">Required · Up to 120 characters</span>
      <label htmlFor="project-description">Description <span className="optional-label">Optional</span>
      </label>
      <textarea id="project-description" name="description" value={description} onChange={event => setDescription(event.target.value)} rows={4} disabled={busy} aria-describedby="description-help" placeholder="What are you exploring?" />
      <span id="description-help" className="field-help">Up to 5,000 characters. Use non-confidential content for this local phase.</span>
      <div id="project-form-error">{error && <p className="api-error" role="alert">{error}</p>}</div>
      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="primary-button" type="submit" disabled={busy}>{busy ? "Saving…" : initial ? "Save changes" : "Create project"}</button>
      </div>
    </form>
  );
}

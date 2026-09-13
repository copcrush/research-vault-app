"use client";

import { useState } from "react";
import { resetDemoProjects } from "@/lib/demo-projects";

export function DemoBanner() {
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  return <section className="demo-banner" aria-label="Portfolio demo">
    <div>
      <strong>Portfolio demo</strong>
      <p>Try creating, editing, and archiving projects. Synthetic examples and your changes stay in this browser. Use sample content only.</p>
    </div>
    <div className="demo-links">
      <a href="https://github.com/copcrush/research-vault-app" target="_blank" rel="noreferrer">Frontend source ↗</a>
      <a href="https://github.com/copcrush/research-vault-api" target="_blank" rel="noreferrer">Go API source ↗</a>
      <button onClick={() => setConfirm(true)}>Reset demo</button>
    </div>
    {confirm && <div className="demo-reset">
      <p>Replace this browser’s demo projects with the original samples?</p>
      <button onClick={() => setConfirm(false)}>Cancel</button>
      <button onClick={() => { try { resetDemoProjects(); window.location.assign(new URL("/projects", window.location.origin).href); } catch { setError("Unable to reset browser storage. Please check your browser settings."); } }}>Restore samples</button>
    </div>}
    {error && <p role="alert">{error}</p>}
  </section>;
}

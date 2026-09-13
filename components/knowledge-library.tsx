"use client";

import { useState } from "react";
import { Icon } from "./icon";

// Display-only synthetic metadata. No files, document contents, or upload state.
const documents = [
  { name: "AI Adoption Study.pdf", type: "PDF", size: "2.4 MB", pages: "24 pages", ready: true },
  { name: "Interview Notes 01.pdf", type: "PDF", size: "1.2 MB", pages: "12 pages", ready: true },
  { name: "Literature Review.pdf", type: "PDF", size: "8.1 MB", pages: "48 pages", ready: true },
  { name: "Research Methodology.docx", type: "DOCX", size: "840 KB", pages: "16 pages", ready: false },
];

export function KnowledgeLibrary() {
  const [view, setView] = useState<"library" | "sources">("library");
  return (
    <aside id="knowledge-library" className="knowledge-panel" aria-labelledby="knowledge-title" tabIndex={-1}>
      <div className="library-heading">
        <span className="library-heading-icon">
          <Icon name="book" size={20} />
        </span>
        <div>
          <h2 id="knowledge-title">Knowledge Library</h2>
          <p>The foundation of your research</p>
        </div>
      </div>
      <div className="panel-switch" role="group" aria-label="Knowledge panel view">
        <button aria-pressed={view === "library"} onClick={() => setView("library")} aria-controls="knowledge-content">
          <Icon name="file" size={15} /> Documents <span>4</span>
        </button>
        <button aria-pressed={view === "sources"} onClick={() => setView("sources")} aria-controls="knowledge-content">
          <Icon name="quote" size={15} /> Sources</button>
      </div>
      <div id="knowledge-content" className="knowledge-content">
        {view === "library" ? (
          <section aria-label="Synthetic document library">
            <div className="library-section-label">
              <span className="eyebrow">Project documents</span>
              <span className="tiny-badge">Sample data</span>
            </div>
            <div className="document-list">{documents.map((doc) => <article className="document-item" key={doc.name}>
              <div className={`document-icon ${doc.type === "DOCX" ? "docx" : ""}`}>
                <Icon name="file" size={21} />
                <span>{doc.type}</span>
              </div>
              <div className="document-copy">
                <h3>{doc.name}</h3>
                <p>{doc.size}<span>·</span>{doc.pages}</p>
                <span className={`document-status ${doc.ready ? "ready" : "processing"}`}>
                  <Icon name={doc.ready ? "check" : "clock"} size={11} />{doc.ready ? "Ready" : "Processing"}<span className="sr-only"> — example status only</span>
                </span>
              </div>
            </article>)}</div>
            <p className="sample-note">Illustrative files and statuses. Nothing has been uploaded or processed.</p>
            <button className="add-document" disabled aria-describedby="upload-availability">
              <Icon name="plus" size={16} /> Add document<span>Soon</span>
            </button>
            <p id="upload-availability" className="upload-note">Document uploads are not enabled yet.</p>
          </section>
        ) : (
          <section className="sources-empty" aria-labelledby="sources-title">
            <span className="sources-icon">
              <Icon name="quote" size={25} />
            </span>
            <span className="eyebrow">Contextual sources</span>
            <h3 id="sources-title">Every answer starts<br />with a source.</h3>
            <p>References from your project documents will appear here when Research AI is available.</p>
            <div className="source-flow">
              <span>Answer</span>
              <Icon name="chevron" size={12} />
              <span>Citation</span>
              <Icon name="chevron" size={12} />
              <span>Passage</span>
            </div>
            <span className="tiny-badge">Citation retrieval is not enabled</span>
          </section>
        )}
      </div>
      <div className="library-bottom">
        <div className="source-principle">
          <span className="principle-icon">
            <Icon name="quote" size={19} />
          </span>
          <h3>Knowledge you can trace.</h3>
          <p>The next step: answers linked to the exact document and passage behind them.</p>
          <span className="future-label">Designed for verifiable research <Icon name="right" size={14} />
          </span>
        </div>
        <div className="panel-footer">
          <Icon name="lock" size={13} />
          <span>One workspace. A focused body of knowledge.</span>
        </div>
      </div>
    </aside>
  );
}

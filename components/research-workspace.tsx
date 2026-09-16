import Link from "next/link";
import { Icon, type IconName } from "./icon";

const prompts: { icon: IconName; text: string; }[] = [
  { icon: "file", text: "Summarize key findings" },
  { icon: "branch", text: "Compare research sources" },
  { icon: "quote", text: "Find supporting evidence" },
];

export function ResearchWorkspace() {
  return (
    <main id="workspace" className="research-workspace" tabIndex={-1}>
      <div className="page-heading">
        <div>
          <div className="breadcrumb">Workspace <Icon name="chevron" size={12} /> Overview</div>
          <h1>Workspace overview</h1>
        </div>
        <span className="phase-badge">Phase 2 <span>Projects</span>
        </span>
      </div>
      <div className="workspace-intro">
        <span className="eyebrow">A space for deeper thinking</span>
        <h2>Your private<br /> research workspace<span>.</span>
        </h2>
        <p>Bring your documents, questions, and ideas together.<br className="desktop-break" /> Build knowledge grounded in your research.</p>
      </div>
      <section className="project-context" aria-labelledby="project-title">
        <div className="project-icon">
          <Icon name="folder" size={23} />
        </div>
        <div className="project-copy">
          <div className="flex items-center gap-2">
            <span className="eyebrow">Project preview</span>
            <span className="tiny-badge">Synthetic</span>
          </div>
          <h3 id="project-title">Human-centered AI adoption</h3>
          <p>Understanding how people work with emerging technology.</p>
        </div>
        <span className="project-boundary" title="Project isolation is planned">
          <Icon name="lock" size={14} />
          <span>Workspace<br />boundary</span>
        </span>
      </section>
      <section id="research-ai" className="research-area" aria-labelledby="research-title">
        <div className="section-heading">
          <div className="flex items-center gap-2.5">
            <Icon name="spark" size={19} />
            <h3 id="research-title">Research AI</h3>
          </div>
          <span className="muted-label">Your questions. Your sources.</span>
        </div>
        <div className="question-box">
          <label className="sr-only" htmlFor="research-question">Ask your research workspace — AI is not enabled</label>
          <textarea id="research-question" placeholder="Ask your research workspace…" disabled rows={2} aria-describedby="ai-availability" />
          <div className="question-toolbar">
            <span>
              <Icon name="book" size={15} /> Project knowledge</span>
            <button disabled aria-label="Submit question — AI is not enabled" className="send-button">
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
        <p id="ai-availability" className="availability">
          <span className="hollow-dot" /> Open Research AI for local chat or the public scripted preview. This overview does not send questions.</p>
        <Link href="/research-ai" className="secondary-button">Open Research AI</Link>
        <div className="prompt-examples" aria-label="Example questions for future Research AI">{prompts.map((prompt) => <div className="prompt-example" key={prompt.text}>
          <Icon name={prompt.icon} size={16} />
          <span>{prompt.text}</span>
        </div>)}</div>
      </section>
      <section className="research-path" aria-labelledby="research-path-title">
        <div className="section-heading">
          <h3 id="research-path-title">From documents to understanding</h3>
          <span className="muted-label">The road ahead</span>
        </div>
        <div className="path-steps">
          <div className="path-step">
            <div className="step-top">
              <span className="step-icon">
                <Icon name="folder" size={19} />
              </span>
              <span className="step-number">01</span>
            </div>
            <h4>Gather your knowledge</h4>
            <p>Keep research sources together within a project.</p>
          </div>
          <div className="path-step">
            <div className="step-top">
              <span className="step-icon">
                <Icon name="spark" size={19} />
              </span>
              <span className="step-number">02</span>
            </div>
            <h4>Ask better questions</h4>
            <p>Explore ideas across your project documents.</p>
          </div>
          <div className="path-step">
            <div className="step-top">
              <span className="step-icon">
                <Icon name="quote" size={19} />
              </span>
              <span className="step-number">03</span>
            </div>
            <h4>Trace every insight</h4>
            <p>Follow citations back to the original passage.</p>
          </div>
        </div>
      </section>
      <footer className="workspace-footer">
        <Icon name="shield" size={15} />
        <p>Overview preview · Synthetic content only. Confidential-data protection is not yet implemented.</p>
      </footer>
    </main>
  );
}

import { DemoBanner } from "./demo-banner";

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "./icon";

const navigation: { label: string; icon: IconName; href?: string; }[] = [
  { label: "Overview", icon: "grid", href: "/" },
  { label: "Projects", icon: "folder", href: "/projects" },
  { label: "Documents", icon: "file" },
  { label: "Research AI", icon: "spark", href: "/research-ai" },
];

export function AppShell({ children, activeNav = "Overview" }: { children: ReactNode; activeNav?: "Overview" | "Projects" | "Research AI"; }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#workspace">Skip to workspace</a>
      <header className="topbar">
        <Link href="/" className="brand" aria-label="ResearchVault overview">
          <span className="brand-mark">
            <Icon name="vault" size={23} />
          </span>
          <span>Research<span className="brand-light">Vault</span>
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <div className="workspace-context">
          <span className="context-divider" />
          <span>{isDemo ? "Interactive portfolio" : "Personal workspace"}</span>
          <span className="private-badge">
            <Icon name="lock" size={12} /> {isDemo ? "Demo Workspace" : "Private Workspace"}</span>
        </div>
        <div className="topbar-actions">
          <label className="global-search">
            <Icon name="search" size={17} />
            <input aria-label="Search workspace — available in a future phase" placeholder="Search workspace…" disabled />
            <span>Soon</span>
          </label>
          <span className="avatar" aria-label="Researcher profile placeholder" title="Profile preview — accounts are not enabled">R</span>
        </div>
      </header>
      {isDemo && <DemoBanner />}
      <div className="app-body">
        <aside className="sidebar" aria-label="Workspace navigation">
          <div className="sidebar-top">
            <p className="eyebrow sidebar-label">Workspace</p>
            <nav aria-label="Main navigation">
              {navigation.map(({ label, icon, href }) => href ? (
                <Link key={label} href={href} className={`nav-item ${label === activeNav ? "active" : ""}`} aria-current={label === activeNav ? "page" : undefined}>
                  <Icon name={icon} size={18} />
                  <span>{label}</span>{label === activeNav && <span className="nav-dot" />}
                </Link>
              ) : (
                <button key={label} className="nav-item" disabled title={`${label} is planned for a future phase`}>
                  <Icon name={icon} size={18} />
                  <span>{label}</span>
                  <span className="soon-label">Soon</span>
                </button>
              ))}
            </nav>
            <div className="nav-separator" />
            <nav aria-label="Workspace administration">
              <button className="nav-item" disabled title="Activity history is planned">
                <Icon name="activity" size={18} />
                <span>Activity</span>
                <span className="soon-label">Soon</span>
              </button>
              <button className="nav-item" disabled title="Workspace settings are planned">
                <Icon name="settings" size={18} />
                <span>Settings</span>
                <span className="soon-label">Soon</span>
              </button>
            </nav>
          </div>
          <div className="sidebar-bottom">
            <div className="privacy-note">
              <Icon name="shield" size={21} />
              <strong>Private by intention.</strong>
              <p>Built around your research.<br />Designed for your boundaries.</p>
            </div>
            <div className="version">
              <span className="status-dot" /> {isDemo ? "Portfolio demo" : "Local development"} <span>v0.3</span>
            </div>
          </div>
        </aside>
        <div className="workspace-layout">{children}</div>
      </div>
    </div>
  );
}

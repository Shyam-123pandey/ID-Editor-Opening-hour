import { useState } from "react";
import OpeningHoursInput from "./components/OpeningHoursInput";
import ScheduleEditor from "./components/ScheduleEditor";
import "./App.css";

export default function App() {
  const [generatedTag, setGeneratedTag] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <div className="app-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                <path d="M12 7v5l3 3" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="app-title">Opening Hours Editor</h1>
              <p className="app-subtitle">OpenStreetMap iD Editor · GSoC Prototype</p>
            </div>
          </div>
          <div className="app-header-right">
            <span className="badge badge--gsoc">GSoC</span>
            <span className="badge badge--osm">OSM</span>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="app-main">
        <div className="app-container">

          {/* Intro banner */}
          <div className="intro-banner">
            <span className="intro-banner-icon">🗺️</span>
            <p>
              A visual editor for the <code>opening_hours</code> tag used in
              OpenStreetMap. Parse and validate existing tags, or build your
              schedule visually with the Schedule Editor.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="app-grid">
            <div className="card">
              <OpeningHoursInput />
            </div>
            <div className="card">
              <ScheduleEditor onGenerate={setGeneratedTag} />
            </div>
          </div>

          {/* Generated tag output */}
          {generatedTag && (
            <div className="generated-output">
              <div className="generated-output-top">
                <div className="generated-output-info">
                  <div className="generated-check-icon">✓</div>
                  <div>
                    <div className="generated-title">Generated Tag</div>
                    <div className="generated-desc">Ready to paste into OpenStreetMap</div>
                  </div>
                </div>
                <button
                  className={`copy-btn${copied ? " copy-btn--copied" : ""}`}
                  onClick={handleCopy}
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
              <div className="generated-tag-box">
                <span className="tag-key">opening_hours</span>
                <span className="tag-eq">=</span>
                <code className="tag-value">{generatedTag}</code>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>Google Summer of Code · OpenStreetMap Foundation · Opening Hours UI Prototype</p>
      </footer>
    </div>
  );
}
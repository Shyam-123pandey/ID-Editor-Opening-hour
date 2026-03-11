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
    } catch {}
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <div className="app-logo-icon">⏰</div>
            <div>
              <h1 className="app-title">Opening Hours Editor</h1>
              <p className="app-subtitle">
                OpenStreetMap iD Editor · GSoC Prototype
              </p>
            </div>
          </div>

          <div className="app-header-right">
            <span className="badge badge--gsoc">GSoC</span>
            <span className="badge badge--osm">OSM</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-container">

          <div className="intro-banner">
            🗺️ A visual editor for the <code>opening_hours</code> tag used in
            OpenStreetMap.
          </div>

          <div className="app-grid">
            <div className="card">
              <OpeningHoursInput />
            </div>

            <div className="card">
              <ScheduleEditor onGenerate={setGeneratedTag} />
            </div>
          </div>

          {generatedTag && (
            <div className="generated-output">
              <div className="generated-output-top">
                <div>
                  <strong>Generated Tag</strong>
                  <p>Ready to paste into OpenStreetMap</p>
                </div>

                <button
                  className={`copy-btn ${
                    copied ? "copy-btn--copied" : ""
                  }`}
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

      <footer className="app-footer">
        Google Summer of Code · OpenStreetMap Foundation
      </footer>
    </div>
  );
}
import { useState } from "react";
import { parseOpeningHours } from "../utils/parser";
import WeeklySchedule from "./WeeklySchedule";

const EXAMPLES = [
  "Mo-Fr 09:00-18:00",
  "24/7",
  "Mo-Sa 08:00-20:00",
  "Mo-Fr 09:00-17:00; Sa 10:00-14:00",
  "Su off",
];

export default function OpeningHoursInput() {
  const [value, setValue] = useState("Mo-Fr 09:00-18:00");
  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState({});

  const runParse = (val) => {
    const parsed = parseOpeningHours(val);
    setResult(parsed);

    if (parsed.valid) {
      setSchedule(parsed.schedule);
    } else {
      setSchedule({});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") runParse(value);
  };

  const handleExampleClick = (ex) => {
    setValue(ex);
    runParse(ex);
  };

  return (
    <>
      {/* Card header */}
      <div className="card-header">
        <div className="card-header-icon card-header-icon--blue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 7v5l3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="card-header-title">Parse Opening Hours</div>
          <div className="card-header-subtitle">Validate an existing tag</div>
        </div>
      </div>

      {/* Card body */}
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Opening Hours Tag</label>
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Mo-Fr 09:00-18:00"
              spellCheck={false}
              aria-label="Opening hours value"
            />
            <button
              className="btn btn--primary"
              onClick={() => runParse(value)}
            >
              Parse
            </button>
          </div>
        </div>

        {/* Quick examples */}
        <div className="examples-row">
          <span className="examples-label">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              className="example-chip"
              onClick={() => handleExampleClick(ex)}
              title={`Load example: ${ex}`}
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Parse result */}
        {result && (
          <div
            className={`parse-result parse-result--${result.valid ? "valid" : "invalid"}`}
          >
            <div className="parse-result-inner">
              {result.valid ? (
                <>
                  <div className="result-top-row">
                    <span
                      className={`status-badge status-badge--${result.isOpen ? "open" : "closed"}`}
                    >
                      {result.isOpen && <span className="status-dot" />}
                      {result.isOpen ? "Currently Open" : "Currently Closed"}
                    </span>
                    <span className="valid-badge">✓ Valid Format</span>
                  </div>
                  {result.nextChange && (
                    <div className="next-change-row">
                      <span className="next-change-label">Next change:</span>
                      <span className="next-change-value">
                        {result.nextChange.toLocaleString([], {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="error-row">
                  <span className="error-icon">⚠</span>
                  <span className="error-message">{result.error}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {result && result.valid && <WeeklySchedule schedule={schedule} />}
      </div>
    </>
  );
}

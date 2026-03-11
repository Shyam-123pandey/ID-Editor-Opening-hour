import { useState } from "react";

const DAYS = [
  { key: "Monday",    abbr: "Mo" },
  { key: "Tuesday",   abbr: "Tu" },
  { key: "Wednesday", abbr: "We" },
  { key: "Thursday",  abbr: "Th" },
  { key: "Friday",    abbr: "Fr" },
  { key: "Saturday",  abbr: "Sa" },
  { key: "Sunday",    abbr: "Su" },
];

const DEFAULT_SCHEDULE = {
  Monday:    { enabled: true,  open: "09:00", close: "18:00" },
  Tuesday:   { enabled: true,  open: "09:00", close: "18:00" },
  Wednesday: { enabled: true,  open: "09:00", close: "18:00" },
  Thursday:  { enabled: true,  open: "09:00", close: "18:00" },
  Friday:    { enabled: true,  open: "09:00", close: "18:00" },
  Saturday:  { enabled: false, open: "09:00", close: "18:00" },
  Sunday:    { enabled: false, open: "09:00", close: "18:00" },
};

const PRESETS = [
  {
    label: "Mo–Fr 9–18",
    build: () => ({ ...DEFAULT_SCHEDULE }),
  },
  {
    label: "24 / 7",
    build: () =>
      Object.fromEntries(
        DAYS.map((d) => [d.key, { enabled: true, open: "00:00", close: "24:00" }])
      ),
  },
  {
    label: "Mo–Sa 8–20",
    build: () =>
      Object.fromEntries(
        DAYS.map((d) => [
          d.key,
          { enabled: d.key !== "Sunday", open: "08:00", close: "20:00" },
        ])
      ),
  },
  {
    label: "Always Closed",
    build: () =>
      Object.fromEntries(
        DAYS.map((d) => [d.key, { enabled: false, open: "09:00", close: "18:00" }])
      ),
  },
];

export default function ScheduleEditor({ onGenerate }) {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

  const update = (day, field, value) =>
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));

  const applyPreset = (preset) => setSchedule(preset.build());

  const generateTag = () => {
    const enabledDays = DAYS.filter((d) => schedule[d.key].enabled);
    if (enabledDays.length === 0) {
      onGenerate("closed");
      return;
    }

    // Group consecutive days with identical hours
    const groups = [];
    let current = null;
    for (const d of enabledDays) {
      const { open, close } = schedule[d.key];
      if (current && current.open === open && current.close === close) {
        current.days.push(d);
      } else {
        current = { days: [d], open, close };
        groups.push(current);
      }
    }

    // Special-case: all 7 days 00:00-24:00 → "24/7"
    if (
      groups.length === 1 &&
      enabledDays.length === 7 &&
      groups[0].open === "00:00" &&
      groups[0].close === "24:00"
    ) {
      onGenerate("24/7");
      return;
    }

    const parts = groups.map((g) => {
      const dayStr =
        g.days.length === 1
          ? g.days[0].abbr
          : `${g.days[0].abbr}-${g.days[g.days.length - 1].abbr}`;
      return `${dayStr} ${g.open}-${g.close}`;
    });

    onGenerate(parts.join("; "));
  };

  return (
    <>
      {/* Card header */}
      <div className="card-header">
        <div className="card-header-icon card-header-icon--green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="card-header-title">Schedule Editor</div>
          <div className="card-header-subtitle">Build your opening hours visually</div>
        </div>
      </div>

      {/* Card body */}
      <div className="card-body">
        <div className="schedule-editor-body">

          {/* Quick presets */}
          <div className="presets-row">
            {PRESETS.map((p) => (
              <button key={p.label} className="preset-btn" onClick={() => applyPreset(p)}>
                {p.label}
              </button>
            ))}
          </div>

          {/* Day rows */}
          <div className="days-list">
            {DAYS.map(({ key, abbr }) => {
              const day = schedule[key];
              return (
                <div key={key} className={`day-row${day.enabled ? " day-row--active" : ""}`}>

                  {/* Toggle switch */}
                  <label className="toggle" title={day.enabled ? "Click to disable" : "Click to enable"}>
                    <input
                      type="checkbox"
                      checked={day.enabled}
                      onChange={(e) => update(key, "enabled", e.target.checked)}
                    />
                    <span className="toggle-track" />
                  </label>

                  {/* Day name */}
                  <span className="day-label">
                    {key}
                    <span className="day-abbr">({abbr})</span>
                  </span>

                  {/* Time inputs or closed label */}
                  {day.enabled ? (
                    <div className="time-inputs">
                      <input
                        type="time"
                        className="time-input"
                        value={day.open}
                        onChange={(e) => update(key, "open", e.target.value)}
                        aria-label={`${key} opening time`}
                      />
                      <span className="time-separator">→</span>
                      <input
                        type="time"
                        className="time-input"
                        value={day.close}
                        onChange={(e) => update(key, "close", e.target.value)}
                        aria-label={`${key} closing time`}
                      />
                    </div>
                  ) : (
                    <span className="closed-label">Closed</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Generate button */}
          <div className="schedule-actions">
            <button className="btn btn--success" onClick={generateTag}>
              Generate Tag
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
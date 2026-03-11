import { useState, useEffect } from "react";

const DAYS = [
  { key: "Monday", abbr: "Mo" },
  { key: "Tuesday", abbr: "Tu" },
  { key: "Wednesday", abbr: "We" },
  { key: "Thursday", abbr: "Th" },
  { key: "Friday", abbr: "Fr" },
  { key: "Saturday", abbr: "Sa" },
  { key: "Sunday", abbr: "Su" },
];

const DEFAULT_SCHEDULE = {
  Monday: { enabled: true, open: "09:00", close: "18:00" },
  Tuesday: { enabled: true, open: "09:00", close: "18:00" },
  Wednesday: { enabled: true, open: "09:00", close: "18:00" },
  Thursday: { enabled: true, open: "09:00", close: "18:00" },
  Friday: { enabled: true, open: "09:00", close: "18:00" },
  Saturday: { enabled: false, open: "09:00", close: "18:00" },
  Sunday: { enabled: false, open: "09:00", close: "18:00" },
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

  const buildOpeningHours = (schedule) => {
    const enabledDays = DAYS.filter((d) => schedule[d.key].enabled);

    if (enabledDays.length === 0) return "closed";

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

    if (
      groups.length === 1 &&
      enabledDays.length === 7 &&
      groups[0].open === "00:00" &&
      groups[0].close === "24:00"
    ) {
      return "24/7";
    }

    return groups
      .map((g) => {
        const dayStr =
          g.days.length === 1
            ? g.days[0].abbr
            : `${g.days[0].abbr}-${g.days[g.days.length - 1].abbr}`;
        return `${dayStr} ${g.open}-${g.close}`;
      })
      .join("; ");
  };

  useEffect(() => {
    const tag = buildOpeningHours(schedule);
    onGenerate(tag);
  }, [schedule]);

  return (
    <>
      <div className="card-header">
        <div className="card-header-icon card-header-icon--green">
          📅
        </div>
        <div>
          <div className="card-header-title">Schedule Editor</div>
          <div className="card-header-subtitle">
            Build your opening hours visually
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="schedule-editor-body">

          {/* Presets */}
          <div className="presets-row">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                className="preset-btn"
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Day rows */}
          <div className="days-list">
            {DAYS.map(({ key, abbr }) => {
              const day = schedule[key];

              return (
                <div
                  key={key}
                  className={`day-row ${
                    day.enabled ? "day-row--active" : ""
                  }`}
                >
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={day.enabled}
                      onChange={(e) =>
                        update(key, "enabled", e.target.checked)
                      }
                    />
                    <span className="toggle-track" />
                  </label>

                  <span className="day-label">
                    {key}
                    <span className="day-abbr">({abbr})</span>
                  </span>

                  {day.enabled ? (
                    <div
                      className={`time-inputs ${
                        day.open >= day.close ? "time-inputs--error" : ""
                      }`}
                    >
                      <input
                        type="time"
                        className="time-input"
                        value={day.open}
                        onChange={(e) =>
                          update(key, "open", e.target.value)
                        }
                      />

                      <span className="time-separator">→</span>

                      <input
                        type="time"
                        className="time-input"
                        value={day.close}
                        onChange={(e) =>
                          update(key, "close", e.target.value)
                        }
                      />

                      {/* mini timeline preview */}
                      <div className="editor-preview">
                        <div
                          className="editor-preview-bar"
                          style={{
                            left: `${
                              (parseInt(day.open.split(":")[0]) / 24) * 100
                            }%`,
                            width: `${
                              ((parseInt(day.close.split(":")[0]) -
                                parseInt(day.open.split(":")[0])) /
                                24) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="closed-label">Closed</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="schedule-actions">
            <button
              className="btn btn--secondary"
              onClick={() => setSchedule(DEFAULT_SCHEDULE)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
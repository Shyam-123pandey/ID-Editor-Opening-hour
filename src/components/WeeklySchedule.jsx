const DAYS = [
  { key: "Monday", abbr: "Mon" },
  { key: "Tuesday", abbr: "Tue" },
  { key: "Wednesday", abbr: "Wed" },
  { key: "Thursday", abbr: "Thu" },
  { key: "Friday", abbr: "Fri" },
  { key: "Saturday", abbr: "Sat" },
  { key: "Sunday", abbr: "Sun" },
];

export default function WeeklySchedule({ schedule }) {
  return (
    <div className="weekly-schedule">
      <div className="weekly-schedule-title">Weekly Overview</div>
      <div className="weekly-grid">
        {DAYS.map(({ key, abbr }) => {
          const hours = schedule[key];
          const isOpen = Boolean(hours);
          return (
            <div
              key={key}
              className={`day-card day-card--${isOpen ? "open" : "closed"}`}
            >
              <div className="day-name">{abbr}</div>
              <div className="day-hours">
                {isOpen ? hours : <span className="closed-label">Closed</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

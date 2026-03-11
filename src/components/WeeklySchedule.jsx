const DAYS = [
  { key: "Monday", abbr: "Mon" },
  { key: "Tuesday", abbr: "Tue" },
  { key: "Wednesday", abbr: "Wed" },
  { key: "Thursday", abbr: "Thu" },
  { key: "Friday", abbr: "Fri" },
  { key: "Saturday", abbr: "Sat" },
  { key: "Sunday", abbr: "Sun" },
];

const DAY_MINUTES = 24 * 60;

export default function WeeklySchedule({ schedule }) {
  return (
    <div className="weekly-schedule">
      <div className="weekly-schedule-title">Weekly Overview</div>

      <div className="weekly-grid">
        {DAYS.map(({ key, abbr }) => {
          const intervals = schedule[key] || [];
          const isOpen = intervals.length > 0;

          return (
            <div
              key={key}
              className={`day-card day-card--${isOpen ? "open" : "closed"}`}
            >
              {/* Day name */}
              <div className="day-name">{abbr}</div>

              {/* Timeline */}
              <div className="timeline">
                {intervals.map((interval, index) => {
                  const left = (interval.startMinutes / DAY_MINUTES) * 100;
                  const width =
                    ((interval.endMinutes - interval.startMinutes) /
                      DAY_MINUTES) *
                    100;

                  return (
                    <div
                      key={index}
                      className="time-bar"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                      }}
                      title={`${interval.start} - ${interval.end}`}
                    />
                  );
                })}
              </div>

              {/* Text display */}
              <div className="day-hours">
                {isOpen
                  ? intervals.map((i) => `${i.start} – ${i.end}`).join(", ")
                  : "Closed"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
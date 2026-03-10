import { useState } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ScheduleEditor({ onGenerate }) {
  const [schedule, setSchedule] = useState({
    Monday: { enabled: true, open: "09:00", close: "18:00" },
    Tuesday: { enabled: true, open: "09:00", close: "18:00" },
    Wednesday: { enabled: true, open: "09:00", close: "18:00" },
    Thursday: { enabled: true, open: "09:00", close: "18:00" },
    Friday: { enabled: true, open: "09:00", close: "18:00" },
    Saturday: { enabled: false, open: "09:00", close: "18:00" },
    Sunday: { enabled: false, open: "09:00", close: "18:00" },
  });

  const updateDay = (day, field, value) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value,
      },
    });
  };

  const generateTag = () => {
    const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    const allWeekdaysOpen = weekdays.every(
      d => schedule[d].enabled &&
      schedule[d].open === "09:00" &&
      schedule[d].close === "18:00"
    );

    let tag = "";

    if (allWeekdaysOpen) {
      tag = "Mo-Fr 09:00-18:00";
    }

    if (schedule.Saturday.enabled) {
      tag += "; Sa " + schedule.Saturday.open + "-" + schedule.Saturday.close;
    }

    if (schedule.Sunday.enabled) {
      tag += "; Su " + schedule.Sunday.open + "-" + schedule.Sunday.close;
    }

    onGenerate(tag);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Schedule Editor</h3>

      {days.map((day) => (
        <div key={day} style={{ marginBottom: "10px" }}>
          <label style={{ width: "100px", display: "inline-block" }}>
            {day}
          </label>

          <input
            type="checkbox"
            checked={schedule[day].enabled}
            onChange={(e) =>
              updateDay(day, "enabled", e.target.checked)
            }
          />

          {schedule[day].enabled && (
            <>
              <input
                type="time"
                value={schedule[day].open}
                onChange={(e) =>
                  updateDay(day, "open", e.target.value)
                }
              />

              <input
                type="time"
                value={schedule[day].close}
                onChange={(e) =>
                  updateDay(day, "close", e.target.value)
                }
              />
            </>
          )}
        </div>
      ))}

      <button onClick={generateTag}>
        Generate opening_hours tag
      </button>
    </div>
  );
}
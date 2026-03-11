import OpeningHours from "opening_hours";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function parseOpeningHours(value) {
  try {
    const oh = new OpeningHours(value);

    const isOpen = oh.getState();
    const nextChange = oh.getNextChange();

    const schedule = {};

    // Start from beginning of week
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(start);
      dayStart.setDate(start.getDate() + i);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const intervals = oh.getOpenIntervals(dayStart, dayEnd);

      const dayName = DAYS[dayStart.getDay()];

      if (!intervals.length) {
        schedule[dayName] = null;
        continue;
      }

      schedule[dayName] = intervals
        .map(([from, to]) => `${formatTime(from)} – ${formatTime(to)}`)
        .join(", ");
    }

    return {
      valid: true,
      isOpen,
      nextChange,
      schedule,
      error: null,
    };
  } catch (error) {
    return {
      valid: false,
      isOpen: null,
      nextChange: null,
      schedule: {},
      error: error.message,
    };
  }
}
export function generateSchedule(value) {
  if (!value) return {};

  if (value.includes("Mo-Fr")) {
    return {
      Monday: "09:00 - 18:00",
      Tuesday: "09:00 - 18:00",
      Wednesday: "09:00 - 18:00",
      Thursday: "09:00 - 18:00",
      Friday: "09:00 - 18:00",
    };
  }

  if (value.includes("24/7")) {
    return {
      Monday: "Open 24h",
      Tuesday: "Open 24h",
      Wednesday: "Open 24h",
      Thursday: "Open 24h",
      Friday: "Open 24h",
      Saturday: "Open 24h",
      Sunday: "Open 24h",
    };
  }

  return {};
}
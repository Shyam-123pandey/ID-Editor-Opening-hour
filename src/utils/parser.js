import OpeningHours from "opening_hours";

export function parseOpeningHours(value) {
  try {
    const oh = new OpeningHours(value);

    const isOpen = oh.getState();

    const nextChange = oh.getNextChange();

    return {
      valid: true,
      isOpen,
      nextChange,
      error: null,
    };
  } catch (error) {
    return {
      valid: false,
      isOpen: null,
      nextChange: null,
      error: error.message,
    };
  }
}
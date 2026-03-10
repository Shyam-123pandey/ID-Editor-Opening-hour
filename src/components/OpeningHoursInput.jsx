import { useState } from "react";
import { parseOpeningHours } from "../utils/parser";
import WeeklySchedule from "./WeeklySchedule";
import { generateSchedule } from "../utils/schedule";

export default function OpeningHoursInput() {
  const [value, setValue] = useState("Mo-Fr 09:00-18:00");
  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState({});

  const handleCheck = () => {
    const parsed = parseOpeningHours(value);
    setResult(parsed);

    if (parsed.valid) {
      const s = generateSchedule(value);
      setSchedule(s);
    }
  };

  return (
    <div
      style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "Arial" }}
    >
      <h2>Opening Hours Parser</h2>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleCheck}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Check
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.valid ? (
            <>
              <p>✅ Valid opening_hours format</p>
              <p>Status: {result.isOpen ? "Open" : "Closed"}</p>
              <p>
                Next change:{" "}
                {result.nextChange
                  ? result.nextChange.toString()
                  : "No upcoming change"}
              </p>
            </>
          ) : (
            <p style={{ color: "red" }}>❌ {result.error}</p>
          )}
        </div>
      )}
      {result && result.valid && <WeeklySchedule schedule={schedule} />}
    </div>
  );
}

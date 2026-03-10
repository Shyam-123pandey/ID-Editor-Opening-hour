const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklySchedule({ schedule }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Weekly Schedule</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{schedule[day] || "Closed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useState } from "react";
import OpeningHoursInput from "./components/OpeningHoursInput";
import ScheduleEditor from "./components/ScheduleEditor";

export default function App() {
  const [generatedTag, setGeneratedTag] = useState("");

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Opening Hours UI Prototype</h1>

      <OpeningHoursInput />

      <ScheduleEditor onGenerate={setGeneratedTag} />

      {generatedTag && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated opening_hours Tag</h3>
          <code>{generatedTag}</code>
        </div>
      )}

    </div>
  );
}
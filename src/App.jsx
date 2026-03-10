import { useState } from "react";
import OpeningHoursInput from "./components/OpeningHoursInput";
import ScheduleEditor from "./components/ScheduleEditor";

export default function App() {

  const [generatedTag, setGeneratedTag] = useState("");

  return (
    <div style={{
      maxWidth: "900px",
      margin: "auto",
      padding: "40px",
      fontFamily: "Arial"
    }}>

      <h1>Opening Hours UI Prototype</h1>

      <p>
        Prototype demonstrating a visual editor for the
        <code> opening_hours </code> tag used in OpenStreetMap.
      </p>

      <OpeningHoursInput />

      <hr style={{ margin: "40px 0" }} />

      <ScheduleEditor onGenerate={setGeneratedTag} />

      {generatedTag && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f4f4f4"
        }}>
          <h3>Generated opening_hours Tag</h3>

          <code style={{ fontSize: "16px" }}>
            {generatedTag}
          </code>
        </div>
      )}

    </div>
  );
}
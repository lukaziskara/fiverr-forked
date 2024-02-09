import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function TimeInterval() {
  const [startTime, setStatrTime] = useState("00:00");
  const [endTime, setEndTime] = useState("10:00:00");

  return (
    <div>
      <label for="appt">Select starting time:</label>
      <input value={startTime} />
      <label for="appt">Select ending time:</label>
      <input value={endTime} />
      <input type="submit" />
    </div>
  );
}

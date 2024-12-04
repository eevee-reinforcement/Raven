import React, { useState } from "react";

const TimePickerForm = ({ label }) => {
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected time:", time);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="appt">{label}</label>
      <input
        type="time"
        id="start-time"
        name="start-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TimePickerForm;

import React, { useState } from "react";

const DatePickerForm = ({ label }) => {
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected date:", date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="appt">{label}</label>
      <input
        type="date"
        id="start-date"
        name="start-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default DatePickerForm;

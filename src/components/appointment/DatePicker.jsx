import { useState } from "react";
import { DatePicker } from "keep-react";

export const DatePickerComponent = ({ date, setDate }) => {
  return (
    <DatePicker
      singleDate={(date) => setDate(date.toISOString())} 
      placeholder="Date / Month / Year"
    >
      <DatePicker.SingleDate />
    </DatePicker>
  );
}

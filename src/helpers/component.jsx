import React, { useState } from "react";

const YourComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setStartDate(date);
    fetch(`your-api-url?date=${date.toISOString().split("T")[0]}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <input
        type="date"
        value={startDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default YourComponent;

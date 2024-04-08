import moment from "moment";

const sendDateToServer = () => {
  const date = moment("2024-02-18", "YYYY-MM-DD"); // Replace this with your date variable
  const formattedDate = date.format("DD/MM/YYYY");

  // Now you can use formattedDate to send the request
  fetch(`your-api-url?date=${formattedDate}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

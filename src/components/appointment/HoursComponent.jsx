const HorasComponent = ({ selectedHour, setSelectedHour }) => {
  const horas = [];
  for (let i = 10; i <= 19; i++) {
    horas.push(`${i}:00`);
  }

  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Selecciona una hora:</h2>
      <div className="grid grid-cols-2 gap-4">
        {horas.map((hour, index) => (
          <div
            key={index}
            className={`p-4 border rounded ${
              selectedHour === hour
                ? "bg-sky-600 text-white font-bold text-center"
                : "bg-gray-200 text-blue-800 font-bold text-center"
            } cursor-pointer`}
            onClick={() => handleHourSelection(hour)}
          >
            {hour}
          </div>
        ))}
      </div>
      <p className="mt-4">
        Hora seleccionada: {selectedHour ? selectedHour : "Ninguna"}
      </p>
    </div>
  );
};

export default HorasComponent;

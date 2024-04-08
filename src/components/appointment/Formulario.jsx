import { useState, useEffect } from "react";
import Error from "./Error";
import HorasComponent from "./HoursComponent";
import { DatePickerComponent } from "./DatePicker";
import { ListaServices } from "./ListaServices";
import clienteAxios from "../../config/axios";
import Alerta from "../Alerta.jsx";

const Formulario = ({
  agregarCita,
  services,
  setSelectedServices,
  mostrarServices,
  setMostrarServices,
  setTotalPrice,
  selectedHour,
  setSelectedHour,
  alerta,
  setDate,
  date,
}) => {
  const [servicios, setServices] = useState([]);

  const getServices = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios("/services", config);
    setServices(data);
  };

  const { msg } = alerta;
  return (
    <div className="mx-5">
      <h2 className="font-black text-3xl text-center">Reservar Cita</h2>
      <form
        onSubmit={agregarCita}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Seleccionar Servicio
          </label>
          <button
            type="formulario"
            className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10
      md:hidden"
            onClick={() => {
              setMostrarServices(!mostrarServices);
            }}
          >
            {mostrarServices ? "Ocultar Formulario" : "Mostrar Formulario"}
          </button>
          <div
            className={`${
              mostrarServices ? "block" : "hidden"
            } md:block overflow-y-scroll max-h-72 `}
          >
            <ListaServices
              getServices={getServices}
              servicios={servicios}
              setServices={setServices}
              services={services}
              setSelectedServices={setSelectedServices}
              setTotalPrice={setTotalPrice}
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            className="w-full border p-2 rounded-lg shadow-sm text-gray-800"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            // onChange={}
          />
          {/* <DatePickerComponent date={date} setDate={setDate} /> */}
        </div>
        <div className="mb-5">
          <HorasComponent
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={services._id ? "Editar Cita" : "Agregar Cita"}
        />
      </form>
    </div>
  );
};

export default Formulario;

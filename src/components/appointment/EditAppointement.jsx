import { useState, useEffect } from "react";
import Error from "./Error";
import HorasComponent from "./HoursComponent";
import { DatePickerComponent } from "./DatePicker";
import { ListaServices } from "./ListaServices";
import clienteAxios from "../../config/axios";
import Alerta from "../Alerta.jsx";
import useAuth from "../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";

const FormularioEdit = () => {
  const params = useParams();
  const [selectedHour, setSelectedHour] = useState(null);
  const [date, setDate] = useState(null);
  const [servicios, setServices] = useState([]);
  const [services, setSelectedServices] = useState([]);
  const [mostrarServices, setMostrarServices] = useState(false);
  const { auth } = useAuth();
  const [totalAmount, setTotalPrice] = useState(0);
  const [alerta, setAlerta] = useState({});
  const [cita, setCitas] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios("/appointments/" + params.id, config);
    setCitas(data);
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([date, services, selectedHour].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const user = auth._id;
    const time = selectedHour;
    try {
      const { data: serviceData } = await clienteAxios.put(
        "/appointments/" + params.id,
        { services, date, time, totalAmount },
        config
      );

      if (serviceData.status === "success") {
        setAlerta({
          msg: "Cita actualizada correctamente",
        });
        setSelectedHour("");
        setDate("");
        setTotalPrice("");
        setSelectedServices([]);
        setTimeout(() => {
          navigate("/user");
        }, 2000);
      } else {
        setAlerta({
          msg: "Ocurrió un error al crear el servicio",
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Ocurrió un error en la solicitud",
      });
    }
  };

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
    <div className="bg-white shadow-md rounded-lg p-5 mt-3">
      <h2 className="font-black text-3xl text-center mb-5 mt-4">
        Seleccionar Servicio y Fecha
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-3/4 lg:w-3/5 mx-auto"
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
            type="button"
            className="bg-indigo-600 text-white font-bolduppercase mx-10 p-3 rounded-md mb-10 md:hidden"
            onClick={() => {
              setMostrarServices(!mostrarServices);
            }}
          >
            {mostrarServices ? "Ocultar Formulario" : "Mostrar Formulario"}
          </button>
          <div className={`${mostrarServices ? "block" : "hidden"} md:block`}>
            <ListaServices
              getServices={getServices}
              servicios={servicios}
              setServices={setServices}
              services={services}
              setSelectedServices={setSelectedServices}
              setTotalPrice={setTotalPrice}
              cita={cita}
            />
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
              min={new Date().toISOString().split("T")[0]}
              className="w-full border p-2 rounded-lg shadow-sm text-gray-800"
              defaultValue={cita.date?.split("T")[0]}
              onChange={(e) =>
                setDate(e.target.value) || cita.date?.split("T")[0]
              }
            />
          </div>
        </div>
        <div className="mb-5">
          <HorasComponent
            selectedHour={selectedHour || cita.time}
            setSelectedHour={setSelectedHour}
          />
        </div>
        <input
          type="submit"
          className="bg-red-600 w-full p-3 mb-2  text-white uppercase font-bold hover:bg-red-700 cursor-pointer transition-colors"
          value={"Cancelar Edición"}
          onClick={() => navigate("/user")}
        />

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 mb-2 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={params.id ? "Editar Cita" : "Agregar Cita"}
        />
      </form>
    </div>
  );
};

export default FormularioEdit;

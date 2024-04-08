import React, { useState, useEffect } from "react";
import Paciente from "./Appointement.jsx";
import clienteAxios from "../../config/axios.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import Formulario from "./Formulario"; // Importa el componente del formulario

const ListadoPacientes = () => {
  const [clientes, setClientes] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [selectedHour, setSelectedHour] = useState(null);
  const [date, setDate] = useState("");
  const [services, setSelectedServices] = useState([]);
  const [mostrarServices, setMostrarServices] = useState(false);
  const [totalAmount, setTotalPrice] = useState(0);

  const { auth } = useAuth();

  const getClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        "/users/" + auth._id + "/appointments",
        config
      );
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener los datos de citas:", error);
    }
  };

  const deleteAppointment = async (useId) => {
    const token = localStorage.getItem("token");
    console.log(useId);
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const confirmar = confirm("Estas seguro de eliminar la cita");
    if (confirmar) {
      const { data } = await clienteAxios.delete(
        "/appointments/" + useId,
        config
      );

      if (data.status === "success") {
        getClientes();
        setAlerta({
          msg: "Cita cancelada correctamente",
        });
      } else {
        setAlerta({
          msg: "Error al cancelar la cita",
        });
      }
    }
  };

  const agregarCita = async (e) => {
    e.preventDefault();
    if ([date, services, selectedHour].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const user = auth._id;
      const time = selectedHour;
      try {
        const { data: serviceData } = await clienteAxios.post(
          "/appointments/",
          { services, date, time, totalAmount, user },
          config
        );
        if (serviceData.status === "success") {
          setAlerta({
            msg: "Cita creada correctamente",
          });
          setSelectedHour("");
          setDate("");
          setTotalPrice("");
          setSelectedServices([]);
          setTimeout(() => {
            setAlerta({});
          }, 3000);
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

      getClientes();
    } catch (error) {
      console.error("Error al agregar la nueva cita:", error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className="container mx-auto mt-10 flex flex-col lg:flex-row justify-around ">
      <div className="">
        <Formulario
          agregarCita={agregarCita}
          alerta={alerta}
          setAlerta={setAlerta}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          date={date}
          setDate={setDate}
          services={services}
          setSelectedServices={setSelectedServices}
          mostrarServices={mostrarServices}
          setMostrarServices={setMostrarServices}
          totalAmount={totalAmount}
          setTotalPrice={setTotalPrice}
          auth={auth}
        />
      </div>
      <div className="lg:w-1/2 lg:max-h-96 lg:overflow-y-auto">
        {clientes && clientes.length ? (
          <>
            <h2 className="font-black text-3xl text-center">Listado Citas</h2>
            <p className="text-xl mb-10 text-center">
              Visualiza {""}
              <span className="text-indigo-600 font-bold ">
                Cita - Detalles
              </span>
            </p>
            {clientes.map((cliente) => (
              <Paciente
                key={cliente._id}
                cliente={cliente}
                deleteAppointment={deleteAppointment}
                alerta={alerta}
                setAlerta={setAlerta}
              />
            ))}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h2 className="font-black text-3xl text-center">No hay Citas</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Comienza realizando una reserva{" "}
                <span className="text-indigo-600 font-bold">
                  y aparecerán en este lugar
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* <Formulario agregarCita={agregarCita} />  */}
    </div>
  );
};

export default ListadoPacientes;

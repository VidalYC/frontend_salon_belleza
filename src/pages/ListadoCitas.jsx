import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { formatearFecha } from "../helpers";

const ListadoCitas = () => {
  const { auth } = useAuth();
  const [citas, setCitas] = useState([]);
  const obtenerReservas = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/users/${auth._id}/appointments`;
      const { data } = await clienteAxios(url, config);
      console.log(data);
      setCitas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const eliminarCita = async (id) => {
    const confirmar = confirm("¿Confirmas que deseas eliminar ?");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(
          `/appointments/${id}`,
          config
        );

        const citasActualizado = citas.filter(
          (citasState) => citasState._id !== id
        );
        setCitas(citasActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="py-4">
      <div className="text-center sm:py-10 mx-auto">
        <h1 class="text-2xl lg:text-6xl font-black">
          Salón de Belleza <span className="text-indigo-700">Supremo</span>
        </h1>
        <h2 class="text-xl lg:text-2xl font-black text-start  ">
          <span>Panel de Andministración</span>
        </h2>
      </div>
      {citas.length ? (
        citas.map((cita) => {
          return (
            <div
              className="mx-5 my-10  shadow-md border px-5 py-10 rounded-xl w-3/5"
              key={cita._id}
            >
              <p className="text-black font-black">
                Fecha:
                <span className="font-light mx-1">
                  {formatearFecha(cita.date)}
                </span>{" "}
                Hora:
                <span className="font-light"> {cita.time}</span>
              </p>
              <p className="text-black font-black">
                Nombre Cliente:
                <span className="font-normal  mx-1"> {cita.user.name}</span>
                Email:
                <span className="font-light  mx-1">{cita.user.email}</span>
              </p>
              <p className="text-xl font-black">
                Servicios solicitados en la cita
              </p>
              {cita.services.map((service) => {
                return (
                  <>
                    <div key={service._id}>
                      <p>{service.name}</p>
                      <p className="text-2xl font-black text-blue-500">
                        {service.price}
                      </p>
                    </div>
                  </>
                );
              })}
              <p className="text-2xl font-black text-right">
                Total a Pagar:
                <span className="text-blue-600">{cita.totalAmount}</span>
              </p>
              <div className=" mt-3  min-[768px]:w-auto  lg:w-2/3 ">
                <button
                  type="button"
                  className="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                  onClick={() => eliminarCita(cita._id)}
                >
                  Cancelar Cita
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center mt-10 text-xl">No hay citas disponibles</p>
      )}
    </main>
  );
};
export default ListadoCitas;

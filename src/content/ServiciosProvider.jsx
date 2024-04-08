import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const ServiciosContext = createContext();

export const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);
  const [servicio, setServicio] = useState({});
  const { auth } = useAuth();
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/services", config);
        setServicios(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerServicios();
  }, [auth]);

  const guardarServicio = async (servicio) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (servicio.id) {
      try {
        const { data } = await clienteAxios.put(
          `/services/${servicio.id}`,
          servicio,
          config
        );
        const serviciosActualizado = servicios.map((servicioState) =>
          servicioState._id === data._id ? data : servicioState
        );

        setServicios(serviciosActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post("/services", servicio, config);
        const { createdAt, updatedAt, __v, ...servicioAlmacenado } = data;
        setServicios([servicioAlmacenado, ...servicios]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (servicio) => {
    setServicio(servicio);
  };

  const eliminarServicio = async (id) => {
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

        const { data } = await clienteAxios.delete(`/services/${id}`, config);

        const serviciosActualizado = servicios.filter(
          (serviciosState) => serviciosState._id !== id
        );
        setServicios(serviciosActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        guardarServicio,
        setEdicion,
        servicio,
        eliminarServicio,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};

export default ServiciosContext;

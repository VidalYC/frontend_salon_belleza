import { useState, useEffect } from "react";
import useServicios from "../hooks/useServicios";
import Alerta from "./Alerta";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const Formulario = () => {
  const navigate = useNavigate();
  const [name, setNombre] = useState("");
  const [price, setPrecio] = useState("");
  const [id, setId] = useState(null);
  const [alerta, setAlerta] = useState({});
  const { guardarServicio, servicio } = useServicios();

  const handleEnvio = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if ([name, price].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      // Crear el servicio
      const { data: serviceData } = await clienteAxios.post(
        "/services/",
        { name, price, id },
        config
      );

      if (serviceData.status === "success") {
        setAlerta({
          msg: "Servicio creado correctamente",
        });
      } else {
        setAlerta({
          msg: "Ocurrió un error al crear el servicio",
        });
      }

      const fileInput = document.querySelector("#file");
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file0", selectedFile);
        const uploadResponse = await clienteAxios.post(
          `/services/upload/${serviceData.services._id}`,
          formData,
          {
            headers: {
              ...config.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse.data.status === "success") {
          setAlerta({
            msg: "Imagen subida correctamente",
          });
          setNombre("");
          setPrecio("");
          setId("");
          setTimeout(() => {
            navigate("/admin/listado");
            window.location.reload();
          }, 1000);
        } else {
          setAlerta({
            msg: "Ocurrió un error al subir la imagen",
          });
        }
      } else {
        setAlerta({
          msg: "Por favor, selecciona una imagen",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Ocurrió un error en la solicitud",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if ([name, price].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      // Crear el servicio
      const { data: serviceData } = await clienteAxios.put(
        "/services/" + servicio._id,
        { name, price },
        config
      );

      if (serviceData.status === "success") {
        setAlerta({
          msg: "Servicio creado correctamente",
        });
      } else {
        setAlerta({
          msg: "Ocurrió un error al crear el servicio",
        });
      }

      const fileInput = document.querySelector("#file");
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file0", selectedFile);
        const uploadResponse = await clienteAxios.post(
          `/services/upload/${serviceData.service._id}`,
          formData,
          {
            headers: {
              ...config.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse.data.status === "success") {
          setAlerta({
            msg: "Imagen subida correctamente",
          });
          setNombre("");
          setPrecio("");
          setId("");
          setTimeout(() => {
            navigate("/admin/listado");
            window.location.reload();
          }, 1000);
        } else {
          setAlerta({
            msg: "Ocurrió un error al subir la imagen",
          });
        }
      } else {
        setAlerta({
          msg: "Por favor, selecciona una imagen",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Ocurrió un error en la solicitud",
      });
    }
  };

  useEffect(() => {
    if (servicio?.name) {
      setNombre(servicio.name);
      setPrecio(servicio.price);
      setId(servicio._id);
    }
  }, [servicio]);

  //Todo: Subida de imagenes

  const { msg } = alerta;

  return (
    <>
      <p className="text-xl mb-3 text-center font-bold mt-16">
        Agrega tus Servicios y{" "}
        <span className="text-indigo-600 font-bold">adminístralos</span>
      </p>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="flex flex-wrap md:-mx-52 justify-center items-center bg-white py-10 px-5 mb-20 lg:mb-5 shadow-md rounded-md max-w-4xl"
        onSubmit={servicio._id ? handleUpdate : handleEnvio}
      >
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="name"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Nombre del servicio
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nombre del servicio"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={name}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="precio"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Precio
            </label>
            <input
              id="precio"
              type="number"
              placeholder="Precio del servicio"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-indigo-600"
              value={price}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
            <label
              htmlFor="imagen"
              className="text-gray-700 uppercase font-bold block mb-2"
            >
              Imagen
            </label>
            <input
              type="file"
              name="file0"
              id="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex justify-center w-full px-4">
          <input
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value={id ? "Guardar Cambios" : "Agregar Servicio"}
          />
        </div>
      </form>
    </>
  );
};

export default Formulario;

import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { Global } from "../helpers/Global";
import clienteAxios from "../config/axios";

const EditarPerfil = () => {
  const { auth, actualizarPerfil, setAuth } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email } = perfil;

    if ([name, email].includes("")) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });
      return;
    }
    if (name.length < 1) {
      setAlerta({
        msg: "Nombre muy corto",
        error: true,
      });
      return;
    }
    if (name.length > 20) {
      setAlerta({
        msg: "Nombre muy largo",
        error: true,
      });
      return;
    }
    if (!validateEmail(email)){
      setAlerta({
        msg: "Email Invaido",
        error: true,
      });
      return;
    }
    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
    uploadAvatar();
  };

  const uploadAvatar = async () => {
    const fileInput = document.querySelector("#file");
    const selectedFile = fileInput.files[0];
    const formData = new FormData();
    formData.append("file1", selectedFile);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clienteAxios.post(
      `/auth/upload/foto/${auth._id}`,
      formData,
      config
    );

    if (data.status === "success") {
      setAlerta({
        msg: "Foto de Perfil subida correctamente",
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } else {
      setAlerta({
        msg: "Ocurrió un error al subir la imagen",
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Información</span>{" "}
      </p>
      <div className="flex justify-center items-center">
        <div className="w-full md:w-1/2 bg-indigo-900 shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="avatar md:left-60  left-40 mb-3 ">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {auth.image != "default.png" && (
                  <img
                    src={Global.url + "auth/avatar/" + auth.image}
                    alt="Foto de perfil"
                    className="w-5/6 h-60"
                  />
                )}
                {auth.image == "default.png" && (
                  <img src={img} className="w-5/6 h-60" alt="Foto de perfil" />
                )}
              </div>
            </div>
            <div className="md:w-1/3 lg:w-1/2 px-8 my-2 ">
              <input
                type="file"
                id="file"
                name="file0"
                className="file-input file-input-bordered file-input-primary file-input-md"
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-white">Nombre</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={perfil.name || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-white">Email</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                noValidate
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-white">Usuario</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="usuario"
                value={
                  perfil.admin === true ? "Eres Administrador" : "Eres User"
                }
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 px-10 py-3 text-center cursor-pointer font-bold text-white rounded-lg uppercase w-full mt-5 "
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;

import { Global } from "../helpers/Global";
import useServicios from "../hooks/useServicios";
import { useNavigate } from "react-router-dom";
import img from "../assets/img.png";
const Paciente = ({ servicio }) => {
  const navigate = useNavigate();

  const { setEdicion, eliminarServicio } = useServicios();

  const { name, price, _id, image } = servicio;

  return (
    <div className="mx-5 bg-white shadow-md px-5 py-5 w-96 flex flex-col z-0">
      <div className="text-center">
        <p className="font-bold uppercase text-indigo-700">
          Nombre : {""}
          <span className="font-normal normal-case text-black my-2">
            {name}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-700">
          Precio : {""}
          <span className="font-normal normal-case text-black my-2 whitespace-normal break-words">
            {price}
          </span>
        </p>
        <div className="m-auto overflow-hidden">
          {image != "default.png" && (
            <img
              src={Global.url + "services/image/" + image}
              alt="Foto de perfil"
              className="w-5/6 h-60 hover:scale-125 transition-transform "
            />
          )}
          {image == "default.png" && (
            <img src={img} className="w-5/6 h-60" alt="Foto de perfil" />
          )}
        </div>
        <div className="flex justify-between my-5">
          <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
            onClick={() => {
              setEdicion(servicio);
              navigate("/admin");
            }}
          >
            Editar
          </button>
          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={() => eliminarServicio(_id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paciente;

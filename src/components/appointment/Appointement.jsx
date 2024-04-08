import { Link } from "react-router-dom";
import Alerta from "../Alerta";
import { useState } from "react";
import { formatearFecha } from "../../../helpers/formatearFecha";

const Appointment = ({ cliente, deleteAppointment }) => {
  const [alerta, setAlerta] = useState({});

  const { msg } = alerta;
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl relative">
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-2">
        <span>{formatearFecha(cliente.date)}</span>
      </div>
      <h2 className="font-bold text-xl mb-3">Servicios Solicitados</h2>
      <div className="font-bold mb-3 text-gray-700 uppercase">
        <span className="font-normal normal-case">
          {cliente.services[0].name}
          <p className="font-bold text-2xl text-indigo-700">
            {cliente.services[0].price}
          </p>
          {cliente.services.length > 1 && (
            <div>
              {cliente.services[1].name}
              <p className="font-bold text-2xl text-indigo-700">
                {cliente.services[1].price}
              </p>
            </div>
          )}
        </span>
      </div>
      <p className="font-bold text-2xl absolute right-0 px-11">
        Total a pagar:{" "}
        <span className="text-xl text-indigo-900 font-extrabold">
          {cliente.totalAmount}
        </span>{" "}
      </p>
      <div className="flex space-x-2 mt-14">
        <Link
          to={"edit-services/" + cliente._id}
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        >
          Editar
        </Link>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={() => deleteAppointment(cliente._id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Appointment;

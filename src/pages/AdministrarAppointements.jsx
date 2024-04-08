import { useState, useEffect } from "react";
import Formulario from "../components/appointment/Formulario.jsx";
import Header from "../components/appointment/Header.jsx";
import ListadoPacientes from "../components/appointment/ClientList.jsx";

function AdminAppointments() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(
      (paciente) => paciente.id !== id
    );
    setPacientes(pacientesActualizados);
  };

  return (
    <div className=" mt-20">
      <Header />

        <div>
          <ListadoPacientes />
        </div>
    </div>
  );
}

export default AdminAppointments;

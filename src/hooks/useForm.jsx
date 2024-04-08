import { useState } from "react";

export const useForm = () => {
  const [formulario, setFormulario] = useState();

  const serializarFormulario = (formulario) => {
    const formData = new FormData(formulario);
    const objetoCompleto = {};
    for (let [name, value] of formData) {
      objetoCompleto[name] = value;
    }
    return objetoCompleto;
  };

  const enviado = (e) => {
    e.preventDefualt();
    let curso = serializarFormulario(e.target);
    setFormulario(curso);

    document.querySelector(".codigo").classList("enviado");
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };
  return {
    formulario,
    enviado,
    cambiado,
  };
};

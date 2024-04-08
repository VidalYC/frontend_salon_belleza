import { useState, useEffect } from "react";
import img from "../../assets/img.png";
import { Global } from "../../helpers/Global";

export const ListaServices = ({
  servicios,
  services,
  setSelectedServices,
  getServices,
  setTotalPrice,
}) => {
  useEffect(() => {
    const totalPrice = getTotalPrice();
    setTotalPrice(totalPrice);
  }, [services]);
  const getTotalPrice = () => {
    let totalPrice = 0;
    services.forEach((serviceId) => {
      const service = servicios.find((service) => service._id === serviceId);
      if (service) {
        totalPrice += service.price;
      }
    });
    return totalPrice;
  };

  const handleCheckboxChange = (event, serviceId) => {
    if (event.target.checked) {
      // Agregar servicio seleccionado
      setSelectedServices([...services, serviceId]);
    } else {
      // Quitar servicio deseleccionado
      const updatedServices = services.filter((id) => id !== serviceId);
      setSelectedServices(updatedServices);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((service) => {
            return (
              <tr key={service._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(event) =>
                        handleCheckboxChange(event, service._id)
                      }
                      checked={services.includes(service._id)} // Marcar el checkbox si el servicio está seleccionado
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {service.image != "default.png" && (
                          <img
                            src={Global.url + "services/image/" + service.image}
                            alt="Foto de perfil"
                            className="w-5/6 h-60"
                          />
                        )}
                        {service.image == "default.png" && (
                          <img
                            src={img}
                            className="w-5/6 h-60"
                            alt="Foto de perfil"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {service.name}
                  <br />
                </td>
                <td>{service.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <button >Enviar a la API</button> */}
      {/* onClick={handleSendToApi} */}
    </div>
  );
};

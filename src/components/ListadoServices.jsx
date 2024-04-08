import useServicios from "../hooks/useServicios";
import Servicio from "./Servicio";

const ListadoServicios = () => {
  const { servicios } = useServicios();
  return (
    <>
      <h2 className="font-black text-3xl text-center mt-20 z-10">Listado de Servicios</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Administra tus {""}
        <span className="text-indigo-600 font-bold"> Servicios </span>
      </p>
      <div className="flex flex-wrap justify-center items-center sm:justify-center md:justify-start ">
        {servicios.length ? (
          <>
            {servicios.map((servicio) => (
              <Servicio key={servicio._id} servicio={servicio} />
            ))}
          </>
        ) : (
          <>
            <div>
              <h2 className="font-black text-3xl text-center">
                No hay Servicios
              </h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Comienza agregando los servicios {""}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListadoServicios;

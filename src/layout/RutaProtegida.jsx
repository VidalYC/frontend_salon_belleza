import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header.jsx";
import HeaderAppointment from "../components/appointment/HeaderAppointments";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  console.log(auth);
  console.log(cargando);
  if (cargando) return "cargando...";
  return (
    <>
      {auth.admin === true ? <Header /> : <HeaderAppointment />}
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;

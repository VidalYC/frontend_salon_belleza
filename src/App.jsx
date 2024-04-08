import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import { AuthProvider } from "./content/AuthProvider";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import EditarPerfil from "./pages/EditaPerfil";
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarServicios from "./pages/AdministrarServicios";
import { ServiciosProvider } from "./content/ServiciosProvider";
import ListadoServicios from "./components/ListadoServices";
import CambiarPassword from "./pages/CambiarPassword";
import AdminAppointments from "./pages/AdministrarAppointements";
import { ListaServices } from "./components/appointment/ListaServices";
import FormularioEdit from "./components/appointment/EditAppointement";
import ListadoCitas from "./pages/ListadoCitas";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServiciosProvider>
          {/* Area Publica: No require authenticación */}
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="forgot-password" element={<OlvidePassword />} />
              <Route path="verify/:id" element={<ConfirmarCuenta />} />
              <Route
                path="forgot-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* {/* Area Privada:  Require authenticación */} */
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarServicios />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="listado" element={<ListadoServicios />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
              <Route path="listado-citas" element={<ListadoCitas />} />
            </Route>
            <Route path="/user" element={<RutaProtegida />}>
              <Route index element={<AdminAppointments />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
              <Route path="lista-services" element={<ListaServices />} />
              <Route path="edit-services/:id" element={<FormularioEdit />} />
              {/* <Route path='listado' element={<ListadoServicios />} /> */}
            </Route>
          </Routes>
        </ServiciosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

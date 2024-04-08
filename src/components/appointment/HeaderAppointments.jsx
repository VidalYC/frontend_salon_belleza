import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import {
  FiMenu,
  FiUsers,
  FiUser,
  FiLogOut,
  FiList,
  FiSliders,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const SidebarD = ({ avatar }) => {
  const { auth, cerrarSesion } = useAuth();

  const closeSesion = () => {
    cerrarSesion();
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle fixed" />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div className="avatar left-24 mb-3 ">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {auth.image != "default.png" && (
                <img src={avatar} alt="Foto de perfil" className="w-5/6 h-60" />
              )}
              {auth.image == "default.png" && (
                <img src={img} className="w-5/6 h-60" alt="Foto de perfil" />
              )}
            </div>
          </div>
          <div className="text-center mb-3">
            <h2>{auth.name}</h2>
            <h2>{auth.email}</h2>
          </div>
          <li>
            <Link to="/user" className="sidebar-link">
              <FiSliders className="sidebar-icon" /> Citas
            </Link>
          </li>
          <li>
            <Link to="/user/perfil" className="sidebar-link">
              <FiUser className="sidebar-icon" /> Perfil
            </Link>
          </li>
          {/* <li>
            <Link to="/user/lista-services" className="sidebar-link">
              <FiList className="sidebar-icon" /> Listado Servicios
            </Link>
          </li> */}
          <li>
            <button
              type="button"
              className="sidebar-link"
              onClick={() => {
                closeSesion();
              }}
            >
              <FiLogOut className="sidebar-icon" /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const HeaderAppointment = () => {
  const { auth } = useAuth();

  const [avatar, setAvatar] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const loadingAvatar = () => {
      const data = Global.url + "auth/avatar/" + auth.image;
      setAvatar(data);
      console.log(data);
    };
    loadingAvatar();
  }, []);

  return (
    <div className="bg-violet-900 fixed top-0 left-0 right-0 z-20">
      <header className="container mx-auto py-4 px-8 flex justify-between items-center">
        <div>
          <label htmlFor="my-drawer">
            <FiMenu className="w-6 h-6 text-white" />
          </label>
        </div>
        <h1 className="font-bold text-2xl text-indigo-200">
          Administrar Servicios del{" "}
          <span className="text-white font-black">Salón de Belleza</span>
        </h1>
        {/* Agrega cualquier otro contenido que desees en la parte derecha */}
      </header>
      <SidebarD avatar={avatar} />
    </div>
  );
};

export default HeaderAppointment;

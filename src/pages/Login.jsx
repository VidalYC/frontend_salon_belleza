import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { useState } from "react";
import clienteAxios from "../config/axios";
import img from "../img/01.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      {data.admin == true ? 
        navigate("/admin"): navigate("/user")
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div className="relative bottom-12">
        <h1 className="text-violet-500 font-black text-6xl pb-5 ">
          Salón de Belleza {""}
          <span className="text-black text-center">...</span>
        </h1>
        <img src={img} />
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-violet-900">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-white block text-xl font-bold">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-white block text-xl font-bold">
              Password:
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesion"
            className="bg-violet-600 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5  hover:cursor-pointer hover:bg-violet-700 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-white" to="/registrar">
            No tienes una cuenta?{" "}
            <span className="text-orange-500 underline text-bold">
              Registrarse
            </span>
          </Link>
          <Link
            className="block text-center my-5 text-white"
            to="/forgot-password"
          >
            Olvide Mi password{" "}
            <span className="text-orange-500 underline text-bold">
              Restablecer
            </span>{" "}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;

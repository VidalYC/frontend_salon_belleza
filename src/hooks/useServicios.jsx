import { useContext } from "react";
import ServiciosContext from "../content/ServiciosProvider";

const useServicio = () => {
    return useContext(ServiciosContext)
}


export default useServicio


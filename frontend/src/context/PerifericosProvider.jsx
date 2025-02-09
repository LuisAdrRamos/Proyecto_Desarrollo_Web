import axios from "axios";
import { createContext, useEffect, useState } from "react";

const PerifericosContext = createContext();

const PerifericosProvider = ({ children }) => {
    const [perifericos, setPerifericos] = useState([]);

    // Función para listar todos los periféricos
    const listarPerifericos = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/listar`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            console.log("Datos del backend", respuesta.data);
            
            setPerifericos(respuesta.data); // Actualizar el estado con los periféricos obtenidos
            return respuesta.data; // Retornar los datos de los periféricos
        } catch (error) {
            console.error("Error al listar los periféricos:", error);
            throw error; // Lanzar el error para manejarlo en el componente
        }
    };

    // Función para filtrar periféricos por categoría
    const filtrarPerifericosPorCategoria = (categoria) => {
        return perifericos.filter((periferico) => periferico.categoria === categoria);
    };

    // Función para ver el detalle de un periférico
    const detallePeriferico = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/detalle/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            return respuesta.data; // Retornar los datos del periférico
        } catch (error) {
            console.error("Error al obtener el detalle del periférico:", error);
            throw error; // Lanzar el error para manejarlo en el componente
        }
    };

    // Función para actualizar un periférico
    const actualizarPeriferico = async (id, datos) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/actualizar/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, datos, options);
            return respuesta.data; // Retornar los datos del periférico actualizado
        } catch (error) {
            console.error("Error al actualizar el periférico:", error);
            throw error; // Lanzar el error para manejarlo en el componente
        }
    };

    // Función para eliminar un periférico
    const eliminarPeriferico = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/eliminar/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.delete(url, options);
            return respuesta.data; // Retornar la respuesta del servidor
        } catch (error) {
            console.error("Error al eliminar el periférico:", error);
            throw error; // Lanzar el error para manejarlo en el componente
        }
    };

    // Cargar los periféricos al iniciar
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            listarPerifericos();
        }
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <PerifericosContext.Provider
            value={{
                perifericos,
                setPerifericos,
                listarPerifericos,
                filtrarPerifericosPorCategoria,
                detallePeriferico,
                actualizarPeriferico,
                eliminarPeriferico,
            }}
        >
            {children}
        </PerifericosContext.Provider>
    );
};

export { PerifericosProvider };
export default PerifericosContext;
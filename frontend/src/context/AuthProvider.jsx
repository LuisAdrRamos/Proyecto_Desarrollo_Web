import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  // Función para obtener el perfil del administrador
  const obtenerPerfilAdmin = async (token) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/perfil`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setAuth((prevAuth) => {
        if (JSON.stringify(prevAuth) !== JSON.stringify(respuesta.data)) {
          return respuesta.data; // Solo actualiza si los datos son diferentes
        }
        return prevAuth;
      });
      return respuesta.data; // Retornar los datos del perfil
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      throw error; // Lanzar el error para manejarlo en el componente
    }
  };

  // Función para actualizar el perfil del administrador
  const actualizarPerfilAdmin = async (id, datos) => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizar/${id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datos, options);
      setAuth(respuesta.data); // Actualizar el estado del perfil
      return respuesta.data; // Retornar los datos actualizados
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      throw error; // Lanzar el error para manejarlo en el componente
    }
  };

  // Función para actualizar la contraseña del administrador
  const actualizarPassword = async (datos) => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizar-password`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datos, options);
      return respuesta.data; // Retornar la respuesta del servidor
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      throw error; // Lanzar el error para manejarlo en el componente
    }
  };

  // Cargar el perfil al iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      obtenerPerfilAdmin(token);
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        obtenerPerfilAdmin,
        actualizarPerfilAdmin,
        actualizarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
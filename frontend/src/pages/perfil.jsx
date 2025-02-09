import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import "../styles/Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const { auth, obtenerPerfilAdmin, actualizarPerfilAdmin, actualizarPassword } =
    useContext(AuthContext);
  const [form, setForm] = useState({ passwordactual: "", password: "", confirmpassword: "" });
  const [mensaje, setMensaje] = useState("");
  const [updatedNombre, setUpdatedNombre] = useState("");
  const [updatedApellido, setUpdatedApellido] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      obtenerPerfilAdmin(token)
        .then((data) => {
          setUpdatedNombre(data.nombre);
          setUpdatedApellido(data.apellido);
        })
        .catch(() => {
          setMensaje("Error al cargar el perfil del administrador.");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!updatedNombre.trim() || !updatedApellido.trim()) {
      setMensaje("El nombre y apellido no pueden estar vacíos.");
      return;
    }
    try {
      await actualizarPerfilAdmin(auth._id, {
        nombre: updatedNombre,
        apellido: updatedApellido,
      });
      setMensaje("Perfil actualizado con éxito.");
      setTimeout(() => {
        navigate("/perfil"); // Redirigir a la página de inicio después de 3 segundos
        navigate(0)
      }, 1000);
    } catch (error) {
      setMensaje("Error al actualizar el perfil.");
      console.error(error);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!form.passwordactual || !form.password || !form.confirmpassword) {
      setMensaje("Todos los campos de contraseña son obligatorios.");
      return;
    }
    if (form.password !== form.confirmpassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const resultado = await actualizarPassword({
        passwordactual: form.passwordactual,
        passwordnuevo: form.password,
      });
      setMensaje(resultado.msg);
      setForm({ passwordactual: "", password: "", confirmpassword: "" });
    } catch (error) {
      setMensaje(error.response?.data?.msg || "Error al actualizar la contraseña.");
    }
  };

  return (
    <div className='profile-container'>
      <div className='profile-wrapper'>
        <h4 className='mb-4 text-center'>Perfil de Administrador</h4>
        {mensaje && (
          <div className={`alert ${mensaje.includes("Error") ? "alert-danger" : "alert-success"}`}>
            {mensaje}
          </div>
        )}
        {auth ? (
          <table className='profile-table'>
            <thead>
              <tr>
                <th>ID de Usuario</th>
                <th>Correo Electrónico</th>
                <th>Nombre</th>
                <th>Apellido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{auth._id}</td>
                <td>{auth.email}</td>
                <td>{auth.nombre}</td>
                <td>{auth.apellido}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Cargando...</p>
        )}

        <form onSubmit={handleProfileUpdate}>
          <div className='mb-3'>
            <label className='form-label'>Nuevo Nombre</label>
            <input
              type='text'
              className='profile-input'
              value={updatedNombre}
              onChange={(e) => setUpdatedNombre(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Nuevo Apellido</label>
            <input
              type='text'
              className='profile-input'
              value={updatedApellido}
              onChange={(e) => setUpdatedApellido(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success profile-button'>
            Actualizar Perfil
          </button>
        </form>

        <form onSubmit={handleSubmitPassword}>
          <div className='mb-3'>
            <label className='form-label'>Contraseña Actual</label>
            <input
              type='password'
              placeholder='Ingrese su contraseña actual'
              className='profile-input'
              name='passwordactual'
              value={form.passwordactual}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Nueva Contraseña</label>
            <input
              type='password'
              placeholder='Ingrese su nueva contraseña'
              className='profile-input'
              name='password'
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Confirmar Contraseña</label>
            <input
              type='password'
              placeholder='Repita su nueva contraseña'
              className='profile-input'
              name='confirmpassword'
              value={form.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn btn-primary profile-button'>
            Actualizar Contraseña
          </button>
        </form>

        <div className='d-flex justify-content-between mt-3'>
          <button type='button' className='btn btn-danger profile-button' onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
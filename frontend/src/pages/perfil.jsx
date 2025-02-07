import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Obtener los datos del usuario desde el localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Si no está autenticado, redirigir a la página principal
    } else {
      const user = JSON.parse(localStorage.getItem('userData')) || {}; // Obtener los datos del usuario desde el localStorage
      setUserData(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token y los datos del usuario del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // Redirigir a la página principal después de cerrar sesión
    navigate('/');
  };  

  return (
    <div className='container-fluid vw-100 vh-100'>
      <div className='col-md-8 col-lg-6 mx-auto'>
        <div className='card-profile'>
          <div className='card-header bg-custom text-black'>
            <h4 className='mb-0'>Perfil de Usuario</h4>
          </div>
          <div className='card-body'>
            {/* Mostrar los datos del usuario en una tabla */}
            {userData ? (
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID de Usuario</th>
                    <th>Correo Electrónico</th>
                    <th>Nombre de Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userData.userId}</td>
                    <td>{userData.email}</td>
                    <td>{userData.username}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Cargando...</p>
            )}

            {/* Formulario de actualización de datos */}
            <form>
              <div className='mb-3'>
                <label htmlFor='userId' className='form-label'>ID de Usuario</label>
                <input
                  type='text'
                  name='userId'
                  id='userId'
                  className='form-control'
                  value={userData?.userId || ''}
                  disabled
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='correo' className='form-label'>Correo Electrónico</label>
                <input
                  type='email'
                  name='correo'
                  id='correo'
                  className='form-control'
                  value={userData?.email || ''}
                  disabled
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='user' className='form-label'>Nombre de Usuario</label>
                <input
                  type='text'
                  name='user'
                  id='user'
                  className='form-control'
                  value={userData?.username || ''}
                  disabled
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='contraseña' className='form-label'>Contraseña</label>
                <input
                  type='password'
                  name='contraseña'
                  id='contraseña'
                  className='form-control'
                />
              </div>
              <div className='d-flex justify-content-between'>
                <button type='submit' className='btn btn-success'>Actualizar Datos</button>
                {/* Cambio de botón a Cerrar sesión */}
                <button type='button' className='btn btn-danger' onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

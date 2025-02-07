import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../components/Mensaje';
import '../styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registro`;
      const respuesta = await axios.post(url, form);

      if (respuesta && respuesta.data) {
        setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        setForm({
          nombre: "",
          apellido: "",
          email: "",
          password: ""
        });
        navigate('/login'); // Redirige al login después del registro exitoso
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (error) {
      const errorMsg = error.response && error.response.data ? error.response.data.msg : 'Error al registrar';
      setMensaje({ respuesta: errorMsg, tipo: false });
      console.error('Error:', error.message, 'Tipo:', false);
      if (error.response) {
        console.error('Datos del error:', error.response.data);
      }
    }
  };

  return (
    <div className='login-body'>
      <Link className="brand" to="/">
        <div className="brand-content">
          <FontAwesomeIcon icon={faKeyboard} className="brand-icon" />
          <span className="brand-text">BestKeyboard</span>
        </div>
      </Link>
      <div className="login-wrapper">
        <h2 className="text-center mb-4">Registro</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
          <p className="text-center mt-3">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="login-link">Inicia Sesión</Link>
          </p>
        </form>
        {mensaje.respuesta && (
          <Mensaje tipo={mensaje.tipo ? 'success' : 'error'}>
            {mensaje.respuesta}
          </Mensaje>
        )}
      </div>
    </div>
  );
};

export default Register;

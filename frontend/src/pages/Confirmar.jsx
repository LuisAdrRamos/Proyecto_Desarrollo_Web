import { Link, useParams } from 'react-router-dom';
import Mensaje from '../components/MensajeLogin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/login.css';

export const Confirmar = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState({ respuesta: '', tipo: null });

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/confirmar/${token}`;
        const respuesta = await axios.get(url);
        setMensaje({ respuesta: respuesta.data.msg, tipo: 'success' });
      } catch (error) {
        setMensaje({ respuesta: error.response?.data?.msg || "Error al confirmar cuenta", tipo: 'error' });
      }
    };
    verificarToken();
  }, [token]);

  return (
    <div className='login-body'>
      <Link className="brand" to="/">
        <div className="brand-content">
          <FontAwesomeIcon icon={faCheck} className="brand-icon" />
          <span className="brand-text">BestKeyboard</span>
        </div>
      </Link>
      <div className="login-wrapper">
        <h2 className="text-center mb-4">Confirmación de Cuenta</h2>
        {mensaje.respuesta && (
          <Mensaje tipo={mensaje.tipo}>
            {mensaje.respuesta}
          </Mensaje>
        )}
        <div className="confirmar-circle">
          <FontAwesomeIcon icon={faCheck} className="confirmar-icon" />
        </div>
        <p className="text-center confirmar-texto-gracias">¡Gracias por confirmar tu cuenta!</p>
        <p className="text-center confirmar-texto-iniciar">Ahora puedes iniciar sesión.</p>
        <Link to="/login" className="confirmar-link">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

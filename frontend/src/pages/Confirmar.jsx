import { Link, useParams } from 'react-router-dom';
import Mensaje from '../components/Mensaje';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/Confirmar.css';

export const Confirmar = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState("");

    const verificarToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`;
            const respuesta = await axios.get(url);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: true });
        }
    }

    useEffect(() => {
        verificarToken();
    }, []);

    return (
        <div className="confirmar-container">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div className="confirmar-circle">
                <FontAwesomeIcon icon={faCheck} className="confirmar-icon" />
            </div>

            <div className="confirmar-container">
                <p className="confirmar-texto-gracias">Muchas Gracias</p>
                <p className="confirmar-texto-iniciar">Ya puedes iniciar sesión</p>
                <Link to="/login" className="confirmar-link">Login</Link>
            </div>
        </div>
    );
}

import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Mensaje from '../components/Mensaje';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import "../styles/login.css" // Archivo de estilos combinado

export const Forgot = () => {
    const [mensaje, setMensaje] = useState({})
    const [mail, setMail] = useState({})

    const handleChange = (e) => {
        setMail({
            ...mail,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/recuperar-password`
            const respuesta = await axios.post(url, mail)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
            setMail("")
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }

    return (
        <>
            <div className="login-body">
                <Link className="brand" to="/">
                    <div className="brand-content">
                        <FontAwesomeIcon icon={faKeyboard} className="brand-icon" />
                        <span className="brand-text">BestKeyboard</span>
                    </div>
                </Link>
                <div className="login-wrapper">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h1 className="text-center mb-4">¡Olvidaste tu contraseña!</h1>
                    <h3 className="text-center mb-4">No te preocupes, ingresa tu correo</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form-group">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="form-control"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Send email</button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p>Si la recuerdas</p>
                        <Link to="/login" className="register-link">Login</Link>
                    </div>
                </div>
            </div>
            <div className="forgot-background"></div>
        </>
    )
}

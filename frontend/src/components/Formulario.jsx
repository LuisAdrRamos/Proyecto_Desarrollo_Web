import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mensaje from "./MensajeLogin";
import '../styles/Formulario.css';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

export const Formulario = () => {

    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        switchs: "",
        calidad: "",
        categoria: "",
        precio: 0,
        especificaciones: "",
        marca: "",
        imagen: "", // Campo para la URL de la imagen
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleUploadComplete = (fileInfo) => {
        if (fileInfo?.cdnUrl) {
            console.log("URL de la imagen subida:", fileInfo.cdnUrl);
            setForm((prevForm) => ({ ...prevForm, imagen: fileInfo.cdnUrl }));
        } else {
            console.error("No se pudo obtener la URL de la imagen");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario antes de envio: ", form);

        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/registro`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            console.log("Datos enviados al servidor:", form);
            await axios.post(url, form, options);
            setMensaje({ respuesta: "Periférico registrado con éxito", tipo: 'success' });


        } catch (error) {
            console.log("Error del servidor:", error.response.data);
            setMensaje({ respuesta: error.response.data.msg, tipo: 'error' });
        }
    }

    return (
        <form className='profile-wrapper' onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label htmlFor='nombre' className='form-label'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='profile-input'
                    placeholder='Nombre del periférico'
                    name='nombre'
                    onChange={handleChange}
                    value={form.nombre}
                />
            </div>
            <div>
                <label htmlFor='descripcion' className='form-label'>Descripción: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='profile-input'
                    placeholder='Descripción del periférico'
                    name='descripcion'
                    onChange={handleChange}
                    value={form.descripcion}
                />
            </div>
            <div>
                <label htmlFor='switchs' className='form-label'>Switches: </label>
                <input
                    id='switchs'
                    type="text"
                    className='profile-input'
                    placeholder='Tipo de switches'
                    name='switchs'
                    onChange={handleChange}
                    value={form.switchs}
                />
            </div>
            <div>
                <label htmlFor='calidad' className='form-label'>Calidad: </label>
                <select
                    id='calidad'
                    className='profile-input'
                    name='calidad'
                    onChange={handleChange}
                    value={form.calidad}
                >
                    <option value="">Seleccione la calidad</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>
            <div>
                <label htmlFor='categoria' className='form-label'>Categoría: </label>
                <select
                    id='categoria'
                    className='profile-input'
                    name='categoria'
                    onChange={handleChange}
                    value={form.categoria}
                >
                    <option value="">Seleccione la categoría</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Mecanico">Mecánico</option>
                    <option value="Custom">Custom</option>
                </select>
            </div>
            <div>
                <label htmlFor='precio' className='form-label'>Precio: </label>
                <input
                    id='precio'
                    type="number"
                    className='profile-input'
                    placeholder='Precio del periférico'
                    name='precio'
                    onChange={handleChange}
                    value={form.precio}
                />
            </div>
            <div>
                <label htmlFor='especificaciones' className='form-label'>Especificaciones: </label>
                <textarea
                    id='especificaciones'
                    className='profile-input'
                    placeholder='Especificaciones del periférico'
                    name='especificaciones'
                    onChange={handleChange}
                    value={form.especificaciones}
                />
            </div>
            <div>
                <label htmlFor='marca' className='form-label'>Marca: </label>
                <input
                    id='marca'
                    type="text"
                    className='profile-input'
                    placeholder='Marca del periférico'
                    name='marca'
                    onChange={handleChange}
                    value={form.marca}
                />
            </div>
            <div>
                <label htmlFor='imagen' className='form-label'>Subir una imagen: </label>
                <FileUploaderRegular
                    sourceList="local, camera, facebook, gdrive"
                    cameraModes="video, photo"
                    pubkey="974895bc0a16e513c3b3"
                    onFileSelect={(file) => {
                        console.log("Archivo seleccionado:", file);
                        file.done && file.done(handleUploadComplete);
                    }}
                />

            </div>
            <input
                type="submit"
                className='profile-button btn-success'
                value='Registrar'
            />
        </form>
    );
}
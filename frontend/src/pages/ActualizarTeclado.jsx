import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PerifericosContext from '../context/PerifericosProvider';
import Mensaje from "../components/MensajeLogin";
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

const ActualizarTeclado = () => {
    const { id } = useParams();
    const { actualizarPeriferico, detallePeriferico } = useContext(PerifericosContext);
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        switchs: '',
        calidad: '',
        categoria: '',
        precio: '',
        especificaciones: '',
        marca: '',
        imagen: '' // Añadir un campo para la URL de la imagen
    });
    const [mensaje, setMensaje] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await detallePeriferico(id);
                setForm(datos);
            } catch (error) {
                console.error('Error al cargar los datos del periférico:', error);
            }
        };
        cargarDatos();
    }, [id, detallePeriferico]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        var newValue = value;

        if (name === 'precio') {
            newValue = value.replace(".", ",");
        }

        setForm({
            ...form,
            [name]: newValue
        });
    };

    const handleUploadComplete = (fileInfo) => {
        setForm({
            ...form,
            imagen: fileInfo.cdnUrl // Guardar la URL de la imagen
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await actualizarPeriferico(id, form);
            setMensaje({ tipo: 'success', respuesta: 'Periférico actualizado correctamente' });
            setTimeout(() => {
                navigate("/"); // Redirigir a la página de inicio después de 3 segundos
                navigate(0);
            }, 3000);
        } catch (error) {
            setMensaje({ tipo: 'error', respuesta: 'Error al actualizar el periférico' });
        }
    };

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
                    classNameUploader="uc-light uc-green"
                    pubkey="974895bc0a16e513c3b3"
                    onFileSelect={(file) => file.done && file.done(handleUploadComplete)} // Asegurar que file.done sea llamado solo si existe
                />
            </div>
            <input
                type="submit"
                className='profile-button btn-success'
                value='Actualizar'
            />
        </form>
    );
};

export default ActualizarTeclado;
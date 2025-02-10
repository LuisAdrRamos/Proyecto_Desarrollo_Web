import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Asegurar que axios está importado
import PerifericosContext from "../context/PerifericosProvider";
import Mensaje from "../components/MensajeLogin";

const ActualizarPeriferico = () => {
    const { id } = useParams();
    const { actualizarPeriferico, detallePeriferico } = useContext(PerifericosContext);
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        switchs: "",
        calidad: "",
        categoria: "",
        precio: "",
        especificaciones: "",
        marca: "",
        imagen: "", // URL de la imagen
    });

    const [mensaje, setMensaje] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await detallePeriferico(id);
                setForm(datos);
            } catch (error) {
                console.error("Error al cargar los datos del periférico:", error);
            }
        };
        cargarDatos();
    }, [id, detallePeriferico]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === "precio" ? value.replace(".", ",") : value,
        }));
    };

    // 🔹 Manejar la subida de imagen a Cloudinary
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error("No se seleccionó un archivo.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "perifericos"); // Asegúrate de que este upload_preset existe en Cloudinary
    
        try {
            console.log("Subiendo imagen a Cloudinary...");
            const response = await fetch("https://api.cloudinary.com/v1_1/dcwjfepjo/image/upload", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
    
            if (data.secure_url) {
                setForm((prevForm) => ({
                    ...prevForm,
                    imagen: data.secure_url, // 🔹 Guardamos la nueva URL de la imagen
                }));
                console.log("Imagen subida con éxito:", data.secure_url);
            } else {
                console.error("No se obtuvo una URL válida de Cloudinary:", data);
            }
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/actualizar/${id}`;

            const payload = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                switchs: form.switchs,
                calidad: form.calidad,
                categoria: form.categoria,
                precio: form.precio,
                especificaciones: form.especificaciones,
                marca: form.marca,
                imagen: form.imagen, // 🔹 Enviar la URL actualizada de la imagen
            };

            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put(url, payload, options);

            setMensaje({ tipo: "success", respuesta: "Periférico actualizado correctamente" });

            setTimeout(() => {
                navigate("/");
                navigate(0);
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar el periférico:", error);
            setMensaje({ tipo: "error", respuesta: "Error al actualizar el periférico" });
        }
    };

    return (
        <form className="profile-wrapper" onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            <h1>Actualizar teclado</h1>

            <div>
                <label htmlFor="nombre" className="form-label">Nombre: </label>
                <input id="nombre" type="text" className="profile-input" placeholder="Nombre" name="nombre" onChange={handleChange} value={form.nombre} />
            </div>

            <div>
                <label htmlFor="descripcion" className="form-label">Descripción: </label>
                <input id="descripcion" type="text" className="profile-input" placeholder="Descripción" name="descripcion" onChange={handleChange} value={form.descripcion} />
            </div>

            <div>
                <label htmlFor="switchs" className="form-label">Switches: </label>
                <input id="switchs" type="text" className="profile-input" placeholder="Tipo de switches" name="switchs" onChange={handleChange} value={form.switchs} />
            </div>

            <div>
                <label htmlFor="calidad" className="form-label">Calidad: </label>
                <select id="calidad" className="profile-input" name="calidad" onChange={handleChange} value={form.calidad}>
                    <option value="">Seleccione la calidad</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>

            <div>
                <label htmlFor="categoria" className="form-label">Categoría: </label>
                <select id="categoria" className="profile-input" name="categoria" onChange={handleChange} value={form.categoria}>
                    <option value="">Seleccione la categoría</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Mecanico">Mecánico</option>
                    <option value="Custom">Custom</option>
                </select>
            </div>

            <div>
                <label htmlFor="precio" className="form-label">Precio: </label>
                <input id="precio" type="number" className="profile-input" placeholder="Precio" name="precio" onChange={handleChange} value={form.precio} />
            </div>

            <div>
                <label htmlFor="especificaciones" className="form-label">Especificaciones: </label>
                <textarea id="especificaciones" className="profile-input" placeholder="Especificaciones" name="especificaciones" onChange={handleChange} value={form.especificaciones} />
            </div>

            <div>
                <label htmlFor="marca" className="form-label">Marca: </label>
                <input id="marca" type="text" className="profile-input" placeholder="Marca" name="marca" onChange={handleChange} value={form.marca} />
            </div>

            <div>
                <label htmlFor="imagen" className="form-label">Subir una imagen nueva:</label>
                <input type="file" className="profile-input" onChange={handleFileUpload} />
                {form.imagen && <img src={form.imagen} alt="Vista previa" className="image-preview mt-2" width="200" />}
            </div>

            <input type="submit" className="profile-button btn-success" value="Actualizar" />
        </form>
    );
};

export default ActualizarPeriferico;
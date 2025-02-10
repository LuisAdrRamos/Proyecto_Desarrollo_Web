import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./MensajeLogin";
import "../styles/Formulario.css";

export const Formulario = () => {
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});
    const [imagen, setImagen] = useState(null); // 🔹 Guardar la imagen seleccionada
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        switchs: "",
        calidad: "",
        categoria: "",
        precio: 0,
        especificaciones: "",
        marca: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 Capturar la imagen seleccionada
    const handleFileChange = (e) => {
        setImagen(e.target.files[0]); // Guardar el archivo en el estado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("📤 Estado actual del formulario antes de enviar:", form);

        if (!imagen) {
            console.error("⚠️ No se ha seleccionado una imagen.");
            setMensaje({ respuesta: "Debes subir una imagen antes de registrar", tipo: "error" });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/periferico/registro`;
            
            // Crear FormData para enviar archivos
            const formData = new FormData();
            formData.append("nombre", form.nombre);
            formData.append("descripcion", form.descripcion);
            formData.append("switchs", form.switchs);
            formData.append("calidad", form.calidad);
            formData.append("categoria", form.categoria);
            formData.append("precio", form.precio);
            formData.append("especificaciones", form.especificaciones);
            formData.append("marca", form.marca);
            formData.append("imagen", imagen); // Agregar la imagen

            const options = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };

            console.log("📤 Enviando datos al servidor:", formData);
            await axios.post(url, formData, options);

            setMensaje({ respuesta: "Periférico registrado con éxito", tipo: "success" });

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("❌ Error del servidor:", error.response?.data || error);
            setMensaje({ respuesta: error.response?.data?.msg || "Error al registrar", tipo: "error" });
        }
    };

    return (
        <form className="profile-wrapper" onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            
            <div>
                <label htmlFor="nombre" className="form-label">Nombre: </label>
                <input
                    id="nombre"
                    type="text"
                    className="profile-input"
                    placeholder="Nombre del periférico"
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre}
                />
            </div>

            <div>
                <label htmlFor="descripcion" className="form-label">Descripción: </label>
                <input
                    id="descripcion"
                    type="text"
                    className="profile-input"
                    placeholder="Descripción del periférico"
                    name="descripcion"
                    onChange={handleChange}
                    value={form.descripcion}
                />
            </div>

            <div>
                <label htmlFor="switchs" className="form-label">Switches: </label>
                <input
                    id="switchs"
                    type="text"
                    className="profile-input"
                    placeholder="Tipo de switches"
                    name="switchs"
                    onChange={handleChange}
                    value={form.switchs}
                />
            </div>

            <div>
                <label htmlFor="calidad" className="form-label">Calidad: </label>
                <select
                    id="calidad"
                    className="profile-input"
                    name="calidad"
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
                <label htmlFor="categoria" className="form-label">Categoría: </label>
                <select
                    id="categoria"
                    className="profile-input"
                    name="categoria"
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
                <label htmlFor="precio" className="form-label">Precio: </label>
                <input
                    id="precio"
                    type="number"
                    className="profile-input"
                    placeholder="Precio del periférico"
                    name="precio"
                    onChange={handleChange}
                    value={form.precio}
                />
            </div>

            <div>
                <label htmlFor="especificaciones" className="form-label">Especificaciones: </label>
                <textarea
                    id="especificaciones"
                    className="profile-input"
                    placeholder="Especificaciones del periférico"
                    name="especificaciones"
                    onChange={handleChange}
                    value={form.especificaciones}
                />
            </div>

            <div>
                <label htmlFor="marca" className="form-label">Marca: </label>
                <input
                    id="marca"
                    type="text"
                    className="profile-input"
                    placeholder="Marca del periférico"
                    name="marca"
                    onChange={handleChange}
                    value={form.marca}
                />
            </div>

            <div>
                <label htmlFor="imagen" className="form-label">Subir una imagen: </label>
                <input type="file" name="imagen" accept="image/*" onChange={handleFileChange} className="profile-input" />
            </div>

            <input
                type="submit"
                className="profile-button btn-success"
                value="Registrar"
            />
        </form>
    );
};

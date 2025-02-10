import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PerifericosContext from "../context/PerifericosProvider";
import Mensaje from "../components/MensajeLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Detalle.css";

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detallePeriferico, eliminarPeriferico } = useContext(PerifericosContext);

  const [periferico, setPeriferico] = useState({});
  const [mensaje, setMensaje] = useState({});

  const autenticado = localStorage.getItem("token");
  const rol = localStorage.getItem("tipoUsuario");

  useEffect(() => {
    const cargarPeriferico = async () => {
      try {
        const data = await detallePeriferico(id);
        setPeriferico(data);
      } catch (error) {
        setMensaje({
          respuesta: error.response?.data?.msg || "Error al cargar los datos",
          tipo: false,
        });
      }
    };
    cargarPeriferico();
  }, [id, detallePeriferico]);

  // 🔹 Asegurar que la imagen se muestra correctamente
  const imagenUrl = periferico.imagen?.startsWith("http")
    ? periferico.imagen
    : "https://via.placeholder.com/400x300?text=Imagen+No+Disponible";

  // ✅ Función corregida para formatear el precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD", }).format(precio);
  };

  return (
    <div className="detalle-container">
      <h1 className="detalle-title">Detalle del Periférico</h1>
      <hr className="detalle-separator" />
      {Object.keys(periferico).length !== 0 ? (
        <div className="detalle-content">
          <div className="detalle-imagen">
            <img src={imagenUrl} alt="Periférico" />
          </div>
          <div className="detalle-info">
            <p><span>Nombre:</span> {periferico.nombre}</p>
            <p><span>Descripción:</span> {periferico.descripcion}</p>
            <p><span>Switches:</span> {periferico.switchs}</p>
            <p><span>Calidad:</span> {periferico.calidad}</p>
            <p><span>Categoría:</span> {periferico.categoria}</p>
            <p><span>Precio:</span> <span className="detalle-precio">{formatearPrecio(periferico.precio)}</span></p>
            <p><span>Especificaciones:</span> {periferico.especificaciones}</p>
            <p><span>Marca:</span> {periferico.marca}</p>
          </div>

          <div className="detalle-buttons mt-3 d-flex justify-content-between">
            <button className="btn btn-primary me-2 effect-button">
              Añadir al VS
            </button>

            {autenticado && rol === "admin" && (
              <div className="admin-buttons d-flex justify-content-between">
                <button
                  className="btn btn-warning me-2 effect-button"
                  onClick={() => navigate(`/actualizar/${id}`)}
                  title="Actualizar producto"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="btn btn-danger effect-button"
                  onClick={async () => {
                    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                      await eliminarPeriferico(id);
                      alert("Producto eliminado con éxito");
                      navigate('/');
                    }
                  }}
                  title="Eliminar producto"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
    </div>
  );
};

export default Detalle;

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
  const autenticado = localStorage.getItem('token'); // Verificamos si el usuario está autenticado

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
    }).format(precio);
  };

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

  const handleAddToCart = () => {
    // Lógica para añadir al carrito
    console.log("Añadido al carrito");
  };

  const handleUpdate = () => {
    navigate(`/actualizar/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await eliminarPeriferico(id);
        alert("Producto eliminado con éxito");
        navigate('/'); // Redirigir a la página principal después de eliminar
      } catch (error) {
        alert("Error al eliminar el producto");
        console.error(error);
      }
    }
  };

  return (
    <div className="detalle-container">
      <h1 className="detalle-title">Detalle del Periférico</h1>
      <hr className="detalle-separator" />

      {Object.keys(periferico).length !== 0 ? (
        <div className="detalle-content">
          <div className="detalle-imagen">
            <img
              src={periferico.imgSrc}
              alt="Periférico"
            />
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
            <button className="btn btn-primary me-2 effect-button" onClick={handleAddToCart}>
              Añadir al VS
            </button>
            {autenticado && (
              <div className="admin-buttons d-flex justify-content-between">
                <button
                  className="btn btn-warning me-2 effect-button"
                  onClick={handleUpdate}
                  title="Actualizar producto"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="btn btn-danger effect-button"
                  onClick={handleDelete}
                  title="Eliminar producto"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )
      )}
    </div>
  );
};

export default Detalle;

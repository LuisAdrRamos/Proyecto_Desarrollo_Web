import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PerifericosContext from "../context/PerifericosProvider";
import { useNavigate } from "react-router-dom";

const CardP = ({ id, imgSrc, title, text, price, handleAddToCart }) => {
  const { eliminarPeriferico } = useContext(PerifericosContext);
  const autenticado = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await eliminarPeriferico(id);
        alert("Producto eliminado con éxito");
        window.location.reload();
      } catch (error) {
        alert("Error al eliminar el producto");
        console.error(error);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/actualizar/${id}`);
  };

  const handleViewDetails = () => {
    navigate(`/detalle/${id}`);
  };

  const handleCardClick = (e) => {
    // Prevenir que el click en los botones internos también dispare la navegación
    if (!e.target.closest('.btn')) {
      navigate(`/detalle/${id}`);
    }
  };

  return (
    <div className="col-md-4 d-flex align-items-stretch">
      <div className="card d-flex flex-column" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img
          src={imgSrc}
          className="custom-card-img-top"
          alt={title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <h5>Precio: ${price}</h5>
          <div className="card-footer d-flex flex-column">
            <button className="btn btn-primary me-2 effect-button" onClick={handleAddToCart}>
              Añadir al VS
            </button>
            {autenticado && (
              <div className="admin-buttons mt-3 d-flex justify-content-between">
                <button
                  className="btn btn-info me-2 effect-button"
                  onClick={handleViewDetails}
                  title="Ver detalles"
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
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
      </div>
    </div>
  );
};

export default CardP;
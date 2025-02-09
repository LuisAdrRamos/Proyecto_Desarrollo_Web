import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ imgSrc, title, text, link }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevenir que el click en los botones internos también dispare la navegación
    if (!e.target.closest('.btn')) {
      navigate(link);
    }
  };

  return (
    <div className="col-md-4 d-flex align-items-stretch">
      <div className="card d-flex flex-column" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img src={imgSrc} className="card-img-top" alt="..." />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          {/* <button className="btn btn-primary" onClick={() => navigate(link)}>Ver Catalogo</button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;

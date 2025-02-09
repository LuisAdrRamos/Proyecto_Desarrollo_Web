import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();

  const handleImageClick = (link) => {
    navigate(link);
  };

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" onClick={() => handleImageClick('/tecladosOficina')}>
          <img 
            src="https://www.info-computer.com/img/cms/Blog%20Camila%20Sa/Teclado%20para%20Escribir%20o%20Trabajar%20en%20Oficina.jpg" 
            className="d-block w-100" 
            alt="Teclado de Oficina" 
            style={{ cursor: 'pointer' }} 
          />
        </div>
        <div className="carousel-item" onClick={() => handleImageClick('/tecladosMecanicos')}>
          <img 
            src="https://www.muycomputerpro.com/wp-content/uploads/2021/02/logitech_g_pro_x_mechanical_gaming_keyboard.jpg" 
            className="d-block w-100" 
            alt="Teclado Mecanico" 
            style={{ cursor: 'pointer' }} 
          />
        </div>
        <div className="carousel-item" onClick={() => handleImageClick('/tecladosCustom')}>
          <img 
            src="https://www.profesionalreview.com/wp-content/uploads/2022/03/keychron-q1.jpg" 
            className="d-block w-100" 
            alt="Teclado Custom" 
            style={{ cursor: 'pointer' }} 
          />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};

export default Carousel;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faUser, faRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const autenticado = localStorage.getItem('token');
  const rol = localStorage.getItem("tipoUsuario"); // 🔹 Obtener rol

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#f8f9fa", boxShadow: "1 -2px 5px rgba(0, 0, 0, 0)" }}>
      <Link className="navbar-brand" to="/">
        <div className="navbar-brand-content">
          <FontAwesomeIcon icon={faKeyboard} className="navbar-icon" />
          <span className="navbar-text">BestKeyboard</span>
        </div>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className='nav-link' to='/tecladosOficina'>Teclados de Membrana</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to='/tecladosMecanicos'>Teclados Mecánicos</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to='/tecladosCustom'>Teclados Custom</Link>
          </li>

          {/* 🔹 Mostrar "Crear Periférico" solo si es admin */}
          {autenticado && rol === "admin" && (
            <li className="nav-item">
              <Link className='nav-link' to='/crear'>
                <FontAwesomeIcon icon={faPlus} className="navbar-icon" /> Crear Periférico
              </Link>
            </li>
          )}
        </ul>
        <div className="icons">
          {autenticado ? (
            <Link to="/perfil" className="profile">
              <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            </Link>
          ) : (
            <Link to="/login" className="login">
              <FontAwesomeIcon icon={faRightToBracket} className="navbar-icon" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
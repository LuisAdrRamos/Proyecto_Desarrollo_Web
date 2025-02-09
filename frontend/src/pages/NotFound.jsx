import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/NotFound.css'; // Importa los estilos CSS

export const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-icon-wrapper">
                <FontAwesomeIcon icon={faLinkSlash} className="not-found-icon" />
            </div>
            <div className="not-found-content-wrapper">
                <div className="not-found-content">
                    <p className="not-found-title">Page Not Found</p>
                    <p className="not-found-text">Sorry, the page you are looking for could not be found.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const Mensaje = ({ tipo, children }) => {
  const icono = tipo ? faCheck : faXmark;
  const color = tipo ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`mensaje-container flex items-center justify-center my-4`}>
      <FontAwesomeIcon icon={icono} className={`mr-2 ${color}`} size="lg" />
      <span>{children}</span>
    </div>
  );
};

export default Mensaje;

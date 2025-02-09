import React from 'react';
import { Formulario } from '../components/Formulario'; // Asegúrate de que la ruta del archivo Formulario sea correcta
import '../styles/Formulario.css'; // Importar estilos del formulario

const Crear = () => {
  return (
    <div className=''>
      <h1 className='font-black text-4xl text-gray-500 text-center'>Periféricos</h1>
      <hr className='my-4' />
      <p className='mb-8 text-center'>Este módulo te permite registrar un nuevo periférico</p>
      <Formulario />
    </div>
  );
}

export default Crear;

import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Auth = () => {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAutenticado(!!token); // Si el token existe, el usuario está autenticado
  }, []); // Solo ejecutar al montar el componente

  // Si está autenticado, redirige a la home
  if (autenticado) {
    return <Navigate to='/' />;
  }

  // Si no está autenticado, muestra las páginas de login o registro
  return (
    <main className="flex justify-center content-center w-full h-screen">
      <Outlet />
    </main>
  );
};

export default Auth;

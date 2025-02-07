import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const autenticado = localStorage.getItem('token');
  
  // Si no está autenticado, redirige a la página de login
  if (!autenticado) {
    return <Navigate to='/login' />;
  }
  
  return children;
};

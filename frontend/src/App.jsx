import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import NavBar from './components/navbar.jsx';
import Carousel from './components/carousel.jsx';
import Card from './components/cards.jsx';
import Footer from './components/footer.jsx';
import Perfil from './pages/perfil.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import TecladosOficina from './pages/tecladosOficina.jsx';
import TecladosMecanicos from './pages/tecladosMecanicos.jsx';
import TecladosCustom from './pages/tecladosCustom.jsx';
import { Confirmar } from "./pages/Confirmar.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Forgot } from "./pages/Forgot.jsx";
import Restablecer from './pages/Restablecer.jsx';
import { PrivateRoute } from './routes/PrivateRoutes.jsx';
import Auth from './layout/Auth.jsx'; 

// Importar las páginas para las nuevas rutas

const AppContent = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ['/login', '/register', '/forgot', '/recuperar-password', '/confirmar'];

  const shouldHideHeaderFooter = noHeaderFooterRoutes.some(route => {
    const regex = new RegExp(`^${route}($|\\/|\\?)`);
    return regex.test(location.pathname);
  });

  return (
    <div>
      {/* Mostrar NavBar solo si no estamos en rutas de login, register, etc. */}
      {!shouldHideHeaderFooter && <NavBar />}
      
      <Routes>
        {/* Rutas públicas (login, registro, etc.) */}
        <Route path='/login' element={<Auth />} >
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/register' element={<Auth />} >
          <Route path='/register' element={<Register />} />
        </Route>

        {/* Rutas privadas que requieren autenticación */}
        <Route path='/perfil' element={ 
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        } />

        {/* Ruta principal (página pública) */}
        <Route path="/" element={
          <div>
            <Carousel />
            <div className="container mt-1">
              <div className="row">
                <Card
                  imgSrc="https://www.info-computer.com/img/cms/Blog%20Camila%20Sa/Teclado%20para%20Escribir%20o%20Trabajar%20en%20Oficina.jpg"
                  title="Teclados de Membrana"
                  text="Mejora tu productividad con nuestros teclados de oficina ergonómicos y duraderos."
                  link='/tecladosOficina'
                />
                <Card
                  imgSrc="https://www.muycomputerpro.com/wp-content/uploads/2021/02/logitech_g_pro_x_mechanical_gaming_keyboard.jpg"
                  title="Teclados Mecanicos"
                  text="Descubre nuestros teclados mecánicos de alta calidad. Perfectos para gamers y profesionales."
                  link='/tecladosMecanicos'
                />
                <Card
                  imgSrc="https://www.profesionalreview.com/wp-content/uploads/2022/03/keychron-q1.jpg"
                  title="Teclados Custom"
                  text="Lleva tu experiencia de escritura y gaming al siguiente nivel con nuestros teclados Custom."
                  link='/tecladosCustom'
                />
              </div>
            </div>
          </div>
        } />

        {/* Otras rutas */}
        <Route path="/forgot/:id" element={<Forgot />} />
        <Route path="/confirmar/:token" element={<Confirmar />} />
        <Route path="/tecladosOficina" element={<TecladosOficina />} />
        <Route path="/tecladosMecanicos" element={<TecladosMecanicos />} />
        <Route path="/tecladosCustom" element={<TecladosCustom />} />
        <Route path="/recuperar-password/:token" element={<Restablecer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Mostrar Footer solo si no estamos en rutas de login, register, etc. */}
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default AppWrapper;

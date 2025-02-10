import React, { useContext, useEffect, useState } from "react";
import PerifericosContext from "../context/PerifericosProvider";
import CardP from "../components/product_card";

const TecladosOficina = () => {
  const { perifericos, filtrarPerifericosPorCategoria } = useContext(PerifericosContext);
  const [tecladosOficina, setTecladosOficina] = useState([]);

  // Filtrar periféricos por categoría "Custom" al cargar el componente
  useEffect(() => {
    const tecladosFiltrados = filtrarPerifericosPorCategoria("Custom");
    setTecladosOficina(tecladosFiltrados);
  }, [perifericos]);

  return (
    <div>
      <div className="container">
        <div className="TecladosOficina">
          <h1>Teclados Custom</h1>
          <div className="container mt-4">
            <div className="row">
              {tecladosOficina.map((teclado) => (
                <CardP
                  key={teclado._id?.$oid || teclado._id} // Compatibilidad para varios formatos de ID
                  id={teclado._id?.$oid || teclado._id}
                  imgSrc={teclado.imagen} // 🔹 Pasamos la URL de Cloudinary
                  title={teclado.nombre}
                  text={teclado.descripcion}
                  price={teclado.precio}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TecladosOficina;
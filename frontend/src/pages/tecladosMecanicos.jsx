import React, { useContext, useEffect, useState } from "react";
import PerifericosContext from "../context/PerifericosProvider";
import CardP from "../components/product_card";

const TecladosMecanicos = () => {
  const { perifericos, filtrarPerifericosPorCategoria } = useContext(PerifericosContext);
  const [tecladosMecanicos, setTecladosMecanicos] = useState([]);

  useEffect(() => {
    const tecladosFiltrados = filtrarPerifericosPorCategoria("Mecanico");
    setTecladosMecanicos(tecladosFiltrados);
  }, [perifericos]);

  return (
    <div>
      <div className="container">
        <div className="TecladosMecanicos">
          <h1>Teclados Mecánicos</h1>
          <div className="container mt-4">
            <div className="row">
              {tecladosMecanicos.map((teclado) => (
                <CardP
                  key={teclado._id?.$oid || teclado._id}
                  id={teclado._id?.$oid || teclado._id}
                  imgSrc={teclado.imagen} // ✅ Corrección aquí
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

export default TecladosMecanicos;